"use client";
import useFormFields from "@/hooks/useFormFields";

import FormInputField from "./FormInputField";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useUpdateUserPasswordMutation } from "@/lib/store/features/userApiSlice";

import { changePasswordSchema } from "@/lib/validation/userValidation";

import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { TApiError } from "@/types/apiError";

type PasswordSchema = z.infer<typeof changePasswordSchema>;

const PasswordForm = () => {
  const { getFormFields } = useFormFields({ slug: "password" });
  const [updatePassword, { isLoading: isUpdating, error }] =
    useUpdateUserPasswordMutation();
  const formFields = getFormFields();
  const form = useForm<PasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordSchema) => {
    const result = await updatePassword(data).unwrap();
    toast.success(result.data.message);
    console.log(result);
  };
  return (
    <div className="profile-setting-card">
      <h1 className="setting-heading">Change Password</h1>

      <Form {...form}>
        <form className="space-y-5 " onSubmit={form.handleSubmit(onSubmit)}>
          {formFields.map((field) => (
            <FormInputField
              field={field}
              form={form}
              key={field.name}
              isUpdating={isUpdating}
            />
          ))}
          {error && "message" in error && (
            <p className="text-red-700">{(error as TApiError).message}</p>
          )}
          <Button
            className="bg-primary w-fit"
            type="submit"
            disabled={isUpdating || !form.formState.isDirty}
          >
            {isUpdating ? (
              <div className=" flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PasswordForm;
