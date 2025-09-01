"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { loginSchema } from "@/lib/validation/auth";

import useFormFields from "@/hooks/useFormFields";

import { login as loginAction } from "@/server/actions/auth";

import { useActionState, useTransition } from "react";

import Link from "next/link";
import type { ActionState } from "@/types/authType";
import SubmitButton from "./SubmitButton";
import DynamicFormField from "./DynamicFormFIeld";

import type { LoginFormValues } from "@/types/form";

const initial: ActionState = {
  error: null,
  status: "",
  message: "",
};

const LoginForm = () => {
  const [state, action] = useActionState(loginAction, initial);
  const [isPending, startTransition] = useTransition();
  const { getFormFields } = useFormFields({
    slug: "loginPage",
  });
  const formFields = getFormFields();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        {formFields.map((field) => (
          <DynamicFormField
            key={field.name}
            control={form.control}
            fieldConfig={field}
          />
        ))}
        {state.error && <div className="text-red-500">{state.error}</div>}
        <Link href="/auth/forget-password" className="text-primary w-fit block">
          Forgot Password
        </Link>
        <SubmitButton
          pendingText="Signing in..."
          defaultText="Sign in"
          isPending={isPending}
        />
      </form>
    </Form>
  );
};

export default LoginForm;
