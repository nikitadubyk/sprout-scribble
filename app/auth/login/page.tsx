"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import { Routes } from "@/config";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { emailSignIn } from "@/server/actions/auth";
import { InputField } from "@/components/fields/input";
import { AuthCard } from "@/components/auth/auth-card";

import { FormValues, defaultValues, loginValidationSchema } from "./config";

const { Register, ResetPassword } = Routes.Auth;

/*
 * Login page with form.
 **/
export default function Login() {
  const route = useRouter();

  const form = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(loginValidationSchema),
  });

  const { status, execute } = useAction(emailSignIn, {
    onSuccess: () => {
      form.reset();
      route.push("/");
      route.refresh();
    },
  });

  const { isDirty, isSubmitting } = form.formState;

  const onSubmit = (values: FormValues) => execute(values);

  return (
    <AuthCard
      showSocials
      backPath={Register}
      title="Welcome back"
      backButtonLabel="Create new account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <InputField
              form={form}
              name="email"
              label="Email"
              placeholder="Email"
            />
            <InputField
              form={form}
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
            />
            <Button size="sm" asChild variant="link">
              <Link href={ResetPassword}>Forgot your password</Link>
            </Button>
          </div>

          <Button
            type="submit"
            className="my-2 w-full"
            disabled={!isDirty || isSubmitting || status === "executing"}
          >
            Login
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
