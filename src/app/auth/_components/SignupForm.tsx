"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { signupSchema } from "@/lib/validation/auth";

import useFormFields from "@/hooks/useFormFields";

import { SignupFormValues } from "@/types/form";
import DynamicFormField from "./DynamicFormFIeld";
import { useTransition, useActionState } from "react";
import { ActionState } from "@/types/authType";
import { signup } from "@/server/actions/auth";
import SubmitButton from "./SubmitButton";

const initial: ActionState = {
  error: null,
  status: "",
  message: "",
};

const SignupForm = () => {
  const [state, action] = useActionState(signup, initial);
  const [isPending, startTransition] = useTransition();

  const { getFormFields } = useFormFields({ slug: "signupPage" });
  const formFields = getFormFields();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
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
          defaultText="Sign Up"
          pendingText="Signing Up"
          isPending={isPending}
        />
      </form>
    </Form>
  );
};

export default SignupForm;
