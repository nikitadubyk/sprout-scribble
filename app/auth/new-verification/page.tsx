"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Routes } from "@/config";
import { ToastProps } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { AuthCard } from "@/components/auth/auth-card";
import { verifyEmailToken } from "@/server/actions/tokens";

/**
 * Email verifiation page.
 */
export default function NewVerification() {
  const router = useRouter();
  const { toast } = useToast();
  const token = useSearchParams().get("token");
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const handleVerificationEmail = async () => {
      const commonToastProps: ToastProps = {
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      };

      if (!token) {
        return toast({
          ...commonToastProps,
          description: "Token not found.",
        });
      }
      const { error, success } = await verifyEmailToken(token);

      toast(
        error
          ? {
              ...commonToastProps,
              description: error,
            }
          : {
              description: success,
              title: "Email verified!",
            }
      );
      if (success) {
        router.push("/");
      }
      setMessage(error || success);
    };

    handleVerificationEmail();
  }, [token]);

  return (
    <AuthCard
      title="Verification email"
      backPath={Routes.Auth.Login}
      backButtonLabel="Back to login"
    >
      {message || "Verification email..."}
    </AuthCard>
  );
}
