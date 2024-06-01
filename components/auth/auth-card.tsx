"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { PropsWithChildren } from "react";

import { Button } from "../ui/button";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardFooter,
} from "../ui/card";

interface AuthCardProps extends PropsWithChildren {
  /**
   * Auth card title.
   */
  title: string;
  /**
   * Back path for return to needed path.
   */
  backPath: string;
  /**
   * Is display socials?
   */
  showSocials?: boolean;
  /**
   * Back button label.
   */
  backButtonLabel: string;
}

/**
 * Auth card to show login variables and make some actions
 */
export const AuthCard = ({
  title,
  backPath,
  children,
  showSocials,
  backButtonLabel,
}: AuthCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
    {showSocials && (
      <CardFooter className="flex flex-col items-center gap-4">
        <Button
          variant="outline"
          className="w-full flex gap-4"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <LogIn />
          Sign in with Github
        </Button>
      </CardFooter>
    )}
    <CardFooter>
      <Button asChild variant="link" className="w-full font-medium">
        <Link href={backPath} aria-label={backButtonLabel}>
          {backButtonLabel}
        </Link>
      </Button>
    </CardFooter>
  </Card>
);
