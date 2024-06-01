"use server";

import { Resend } from "resend";

import { Routes } from "@/config";
import { getBaseURL, joinStrings } from "@/utils/helpers";

const { Home, NewVerification } = Routes.Auth;

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseURL() || "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = joinStrings(
    [domain, Home, `${NewVerification}?token=${token}`],
    "/"
  );

  const { data, error } = await resend.emails.send({
    to: email,
    from: "onboarding@resend.dev",
    subject: "Sprout and Scribble - Confirmation email",
    html: `<p> Click to <a href='${confirmLink}'>confirm email</a></p>`,
  });

  if (error) return console.log(error);
  return data;
};
