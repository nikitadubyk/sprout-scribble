import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import { eq } from "drizzle-orm";
import { encode, decode } from "next-auth/jwt";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { loginValidationSchema } from "@/types";

import { db } from ".";
import { users } from "./schemas";

export const { auth, signIn, signOut, handlers } = NextAuth({
  jwt: { encode, decode },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      authorize: async (credentials) => {
        const { success, data } = loginValidationSchema.safeParse(credentials);

        if (success) {
          const user = await db.query.users.findFirst({
            where: eq(users.email, data.email),
          });

          if (!user || !user?.password) return null;

          const isCorrectPassword = bcrypt.compareSync(
            data.password,
            user.password
          );

          // fix for https://github.com/nextauthjs/next-auth/issues/2701
          return isCorrectPassword ? (user as any) : null;
        }
      },
    }),
  ],
});
