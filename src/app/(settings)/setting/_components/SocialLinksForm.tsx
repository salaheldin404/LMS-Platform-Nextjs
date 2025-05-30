"use client";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import FormInputField from "./FormInputField";
import Loading from "./Loading";
import { toast } from "sonner";

import useFormFields from "@/hooks/useFormFields";

import { useUpdateUserSocialMediaMutation } from "@/lib/store/features/userApiSlice";

import { TApiError } from "@/types/apiError";
import { socialMediaSchema } from "@/lib/validation/userValidation";
import * as z from "zod";
import { useAppSelector } from "@/lib/store/hooks";

type SocialMediaValues = z.infer<typeof socialMediaSchema>;

const SocialLinksForm = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const { getFormFields } = useFormFields({ slug: "social" });
  const formFields = getFormFields();
  const [updateSocial, { isLoading: isUpdating, error }] =
    useUpdateUserSocialMediaMutation();

  const form = useForm<SocialMediaValues>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      github: "",
      facebook: "",
      linkedin: "",
      instagram: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated && user.socialMedia) {
      form.reset({
        github: user.socialMedia.github || "",
        facebook: user.socialMedia.facebook || "",
        linkedin: user.socialMedia.linkedin || "",
        instagram: user.socialMedia.instagram || "",
      });
    }
  }, [user, form, isAuthenticated]);

  const onSubmit = async (data: SocialMediaValues) => {
    if (user) {
      await updateSocial({ data, userId: user._id }).unwrap();
      toast.success("social links updated successfully");
    }
  };

  if (!isAuthenticated) {
    return <Loading componentType="social-form" />;
  }

  return (
    <div className="profile-setting-card">
      <h1 className="setting-heading">Social Profile</h1>

      <Form {...form}>
        <form
          className=" w-full space-y-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {formFields.map((field) => (
            <FormInputField
              field={field}
              form={form}
              componentType="social"
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
            aria-disabled={isUpdating || !form.formState.isDirty}
          >
            {isUpdating ? (
              <div className=" flex items-center gap-2" aria-live="polite">
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

export default SocialLinksForm;
