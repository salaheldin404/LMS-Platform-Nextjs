"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { CameraIcon, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FormInputField from "./FormInputField";

import Loading from "./Loading";
import Image from "next/image";

import useFormFields from "@/hooks/useFormFields";

import { useUpdateProfileMutation } from "@/lib/store/features/userApiSlice";

import * as z from "zod";
import { basicInformationSchema } from "@/lib/validation/userValidation";

import { TApiError } from "@/types/apiError";
import { useAppSelector } from "@/lib/store/hooks";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/dypa1tbbf/image/upload/v1725929616/default-profile_taxhcr.png";

type BasicInformationValues = z.infer<typeof basicInformationSchema>;

const BasicInformationForm = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [updateProfile, { isLoading: isUpdating, error }] =
    useUpdateProfileMutation();

  const { getFormFields } = useFormFields({ slug: "profile" });
  const form = useForm<BasicInformationValues>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      username: "",
      email: "",
      biography: "",
      headline: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        email: user.email,
        headline: user.headline,
        biography: user.biography,
      });
      setImgPreview(user.profilePicture?.url || null);
    }
  }, [user, form]);

  const onSubmit = async (data: BasicInformationValues) => {
    if (!user) {
      console.log("no there user");
      return;
    }
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("biography", data?.biography || "");
    formData.append("headline", data?.headline || "");

    if (profileImage) {
      formData.append("profilePicture", profileImage);
    }

    await updateProfile({ formData, userId: user._id }).unwrap();
    toast.success("user information updated");
  };

  useEffect(() => {
    return () => {
      if (imgPreview) URL.revokeObjectURL(imgPreview);
    };
  }, [imgPreview]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImage(file);
    setImgPreview(URL.createObjectURL(file));
    console.log(file, "file");
  };

  if (!isAuthenticated) {
    return <Loading componentType="basic-form" />;
  }

  return (
    <div className="flex gap-4 justify-between profile-setting-card">
      <div className=" basis-3/4">
        <h1 className="setting-heading">Account Settings</h1>

        <Form {...form}>
          <form
            className="space-y-4 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {getFormFields().map((field) => (
              <FormInputField<BasicInformationValues>
                key={field.name}
                field={field}
                form={form}
                isUpdating={isUpdating}
              />
            ))}
            {error && (
              <p className="text-red-700">{(error as TApiError).message}</p>
            )}
            <Button
              className="bg-primary w-fit"
              type="submit"
              disabled={
                isUpdating || (!form.formState.isDirty && !profileImage)
              }
              aria-disabled={
                isUpdating || (!form.formState.isDirty && !profileImage)
              }
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
      <div className="lg:basis-[20%] w-20 h-20 md:w-40 md:h-40 rounded-md relative overflow-hidden group">
        <label
          htmlFor="img-picker"
          className="cursor-pointer block w-full h-full"
          aria-label="Update profile picture"
        >
          <Image
            src={imgPreview || DEFAULT_AVATAR}
            alt="Profile preview"
            width={160}
            height={160}
            className="w-full h-full rounded-md object-cove transition-opacity group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <CameraIcon className="w-6 h-6 text-white" />
          </div>
        </label>
        <input
          type="file"
          id="img-picker"
          className="sr-only"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleImageChange}
          disabled={isUpdating}
          aria-disabled={isUpdating}
        />
      </div>
    </div>
  );
};

export default BasicInformationForm;
