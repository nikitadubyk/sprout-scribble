"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import { Routes } from "@/config";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { emailRegister } from "@/server/actions/auth";
import { InputField } from "@/components/fields/input";
import { AuthCard } from "@/components/auth/auth-card";

import { FormValues, defaultValues, registerValidationSchema } from "./config";

const { Login, ResetPassword } = Routes.Auth;

/*
 * Register page with form.
 **/
export default function Register() {
  const { execute } = useAction(emailRegister);

  const form = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(registerValidationSchema),
  });

  const { isDirty, isSubmitting } = form.formState;

  const onSubmit = (values: FormValues) => {
    console.log(values);
    execute(values);
    form.reset();
  };

  return (
    <AuthCard
      showSocials
      backPath={Login}
      title="Create an account!"
      backButtonLabel="Go back to login"
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
            <InputField
              form={form}
              name="name"
              label="Name"
              placeholder="Name"
            />
          </div>

          <Button
            type="submit"
            className="my-2 w-full"
            disabled={!isDirty || isSubmitting}
          >
            Create account
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
