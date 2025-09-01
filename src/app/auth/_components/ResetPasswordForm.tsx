"use client";
import { useTransition, useActionState } from "react";
import { resetPassword } from "@/server/actions/auth";
import { Form } from "@/components/ui/form";
import SubmitButton from "./SubmitButton";
import Link from "next/link";
import DynamicFormField from "./DynamicFormFIeld";

import { ResetPasswordFormValues } from "@/types/form";
import { resetPasswordSchema } from "@/lib/validation/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import useFormFields from "@/hooks/useFormFields";
import { ActionState } from "@/types/authType";

const initial: ActionState = {
  error: null,
  status: "",
  message: "",
};
const ResetPasswordForm = () => {
  const params = useParams();
  const token = Array.isArray(params.token) ? params.token[0] : params.token;

  const resetPasswordWithToken = resetPassword.bind(null, token || "");

  const [state, action] = useActionState(resetPasswordWithToken, initial);
  const [isPending, startTransition] = useTransition();

  const { getFormFields } = useFormFields({
    slug: "resetPassword",
  });
  const formFields = getFormFields();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    // Create FormData object for server action
    const formData = new FormData();
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    // Call server action
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

        <SubmitButton
          pendingText="Updating..."
          defaultText="Update Password"
          isPending={isPending}
        />
        <Link href="/auth/login" className="text-muted-foreground block w-fit">
          Back to Login
        </Link>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
