"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import type { FormData } from "../page";
import Image from "next/image";
import { useEffect, useState } from "react";

const categories = ["programming", "design", "marketing", "business"];
const levels = ["beginner", "intermediate", "advanced"];

const BasicTab = ({ isUpdating }: { isUpdating: boolean }) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormData>();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const thumbnailFile = watch("basic.thumbnail");
  const thumbnailUrl = watch("basic.thumbnail.url");
  const isFree = watch("basic.free");

  // Handle file upload with validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Create preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Update form value and validate
      setValue("basic.thumbnail", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
      // trigger("basic.thumbnail");
    } else {
      setPreviewUrl(null);
      setValue("basic.thumbnail", null as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  useEffect(() => {
    if (thumbnailFile instanceof File) {
      setPreviewUrl(URL.createObjectURL(thumbnailFile));
    }
  }, [thumbnailFile]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (isFree) {
      setValue("basic.price", 0, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [isFree, setValue]);

  console.log({ isFree });
  console.log(errors, "errors");
  return (
    <div className="p-3">
      <h1 className="font-semibold pb-2 mb-2 border-b">Basic Information</h1>
      <form className="space-y-5">
        <div>
          <h3 className="mb-4">Course Thumbnail</h3>
          <div className="flex gap-4">
            <Image
              width={400}
              height={250}
              alt="course thumbnail"
              src={thumbnailUrl || previewUrl || "/default-course.jpg"}
              placeholder="empty"
            />
            <div className="relative ">
              <p className="mb-3">Upload your course thumbnail her</p>
              <Label
                className="cursor-pointer px-4 py-3 bg-purple-600/30 dark:text-white text-primary"
                htmlFor="thumbnail"
              >
                Upload image
              </Label>
              <Input
                id="thumbnail"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                className="sr-only"
                onChange={handleFileChange}
                disabled={isUpdating}
              />
              {errors.basic?.thumbnail && (
                <p className="text-red-500 my-4">
                  {errors.basic.thumbnail.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <Label className="" htmlFor="basic.title">
            Title
          </Label>
          <Input
            {...register("basic.title")}
            id="basic.title"
            className=""
            placeholder="You course title"
            disabled={isUpdating}
          />
          {errors.basic?.title && (
            <span className="text-red-500">
              {errors.basic.title.message as string}
            </span>
          )}
        </div>
        <div>
          <Label className="" htmlFor="basic.subtitle">
            Subtitle
          </Label>
          <Input
            {...register("basic.subtitle")}
            id="basic.subtitle"
            className=""
            placeholder="You course subtitle"
            disabled={isUpdating}
          />
          {errors.basic?.subtitle && (
            <span className="text-red-500">
              {errors.basic.subtitle.message as string}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="basis-1/3">
            <Label htmlFor="basic.category">Course Category</Label>
            <Controller
              name="basic.category"
              control={control}
              render={({ field }) => {
                // console.log("basic category", field.value);
                return (
                  <Select
                    disabled={isUpdating}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger
                      id="basic.category"
                      className={errors.basic?.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select a category</SelectLabel>
                        {categories.map((item) => (
                          <SelectItem value={item} key={item}>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              }}
            />
            {errors.basic?.category && (
              <span className="text-red-500">
                {errors.basic.category.message}
              </span>
            )}
          </div>
          <div className="basis-1/3">
            <Label htmlFor="basic.level">Course Level</Label>
            <Controller
              name="basic.level"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    disabled={isUpdating}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger
                      id="basic.level"
                      className={errors.basic?.level ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select a level</SelectLabel>
                        {levels.map((item) => (
                          <SelectItem value={item} key={item}>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              }}
            />
            {errors.basic?.level && (
              <span className="text-red-500">{errors.basic.level.message}</span>
            )}
          </div>
          <div className="basis-1/3">
            <Label className="" htmlFor="basic.price">
              Price
            </Label>
            <div className="flex items-center gap-2">
              <Input
                {...register("basic.price", {
                  valueAsNumber: true,
                  required: {
                    value: !isFree,
                    message: "Price is required",
                  },
                  validate: {
                    positive: (value) =>
                      (value && value > 0) || "Price must be a positive number",
                  },
                })}
                id="basic.price"
                className=""
                placeholder="You course price"
                disabled={isUpdating || isFree}
                type="number"
                min={0}
              />
              <div className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  {...register("basic.free")}
                  id="basic.free"
                  className=" w-5 h-5"
                  disabled={isUpdating}
                />
                <Label htmlFor="basic.free" className="text-sm">
                  Free
                </Label>
              </div>
            </div>
            {errors.basic?.price && (
              <span className="text-red-500">{errors.basic.price.message}</span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicTab;
