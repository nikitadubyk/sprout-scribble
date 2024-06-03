"use server";

import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { action } from "@/lib/safe-action";
import { loginValidationSchema, registerValidationSchema } from "@/types";

import { db } from "..";
import { users } from "../schemas";
import { generateVerificationEmailToken } from "./tokens";
import { sendVerificationEmail } from "./email";

/**
 * Handles email sign-in by validating the user's email and checking if the email is verified.
 * @param params - The login parameters.
 * @param params.email - The email address of the user trying to sign in.
 * @returns A promise that resolves to the user data if successful, or an error message if unsuccessful.
 */
export const emailSignIn = action(loginValidationSchema, async ({ email }) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return { error: "User not found" };
  }

  if (!user.emailVerified) {
    return { error: "Email is not verified" };
  }

  return { succes: user };
});

/**
 * Handles email registration by creating a new user, hashing the password, and sending a verification email.
 * If the email is already registered but not verified, it resends the verification email.
 * @param params - The registration parameters.
 * @param params.name - The name of the user registering.
 * @param params.email - The email address of the user registering.
 * @param params.password - The password for the new account.
 * @returns A promise that resolves to a success message if the registration is successful, or an error message if unsuccessful.
 */
export const emailRegister = action(
  registerValidationSchema,
  async ({ name, email, password }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (user) {
      if (!user.emailVerified) {
        const [verificationToken] = await generateVerificationEmailToken(email);
        await sendVerificationEmail(email, verificationToken.token);
        return { success: "Email confirmation sent" };
      }
      return { error: "User with this email address is already registered" };
    }

    const hashPassword = bcrypt.hashSync(password, 15);

    await db.insert(users).values({
      name,
      email,
      password: hashPassword,
    });

    const [verificationToken] = await generateVerificationEmailToken(email);
    await sendVerificationEmail(email, verificationToken.token);
    return { success: "Email confirmation sent" };
  }
);
