"use server";

import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { action } from "@/lib/safe-action";
import { loginValidationSchema, registerValidationSchema } from "@/types";

import { db } from "..";
import { users } from "../schemas";
import { generateVerificationEmailToken } from "./tokens";
import { sendVerificationEmail } from "./email";

export const emailSignIn = action(
  loginValidationSchema,
  async ({ code, email, password }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return { error: "User not found" };
    }

    // if (!user.emailVerified) {
    //   return { error: "Email is not verified" };
    // }

    return { succes: user };
  }
);

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
