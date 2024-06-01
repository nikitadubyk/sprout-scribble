"use server";

import { eq } from "drizzle-orm";

import { action } from "@/lib/safe-action";
import { loginValidationSchema } from "@/types";

import { db } from "..";
import { users } from "../schemas";

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
