import { eq } from "drizzle-orm";

import { db } from "..";
import { users, verificationTokens } from "../schemas";

/**
 * Retrieves a verification token by email.
 * @param email - The email to search for the verification token.
 * @returns A promise that resolves to the verification token object if found, or null otherwise.
 */
export const getVerificationTokenByEmail = (email: string) =>
  db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.email, email),
  });

/**
 * Generates a new verification email token, deletes any existing token for the same email, and stores the new token.
 * @param email - The email for which to generate the token.
 * @returns A promise that resolves to the newly created verification token object.
 */
export const generateVerificationEmailToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.identifier, existingToken.identifier));
  }

  const verificationToken = await db
    .insert(verificationTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();

  return verificationToken;
};

/**
 * Verifies an email token, checks its validity and expiration, and marks the email as verified if valid.
 * @param token - The verification token to verify.
 * @returns A promise that resolves to an object indicating the success or error of the operation.
 */
export const verifyEmailToken = async (token: string) => {
  const existingToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });

  if (!existingToken) return { error: "Token not found" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired" };

  const user = await db.query.users.findFirst({
    where: eq(users.email, existingToken.email),
  });
  if (!user) return { error: "Email does not exist" };

  await db
    .update(users)
    .set({
      email: user.email,
      emailVerified: new Date(),
    })
    .returning();

  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.identifier, existingToken.identifier));

  return { success: "Email verified" };
};
