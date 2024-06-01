import { eq } from "drizzle-orm";

import { db } from "..";
import { verificationTokens } from "../schemas";

export const getVerificationTokenByEmail = (email: string) =>
  db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.email, email),
  });

export const generateVerificationEmailToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.identifier, existingToken.identifier));
  }

  const verificationToken = await db.insert(verificationTokens).values({
    email,
    token,
    expires,
  });

  return verificationToken;
};
