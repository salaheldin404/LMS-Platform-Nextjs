"use client";

import { useFieldArray, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { FaRegTrashAlt } from "react-icons/fa";

import type { FormData } from "../page";
const AdvancedTab = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormData>();
  const {
    fields: requirementsFields,
    append: appendRequirement,
    remove: removeRequirementField,
  } = useFieldArray({
    control,
    name: "advanced.requirements",
    rules: { minLength: 1 },
  });
  const {
    fields: learnFields,
    append: appendLearnField,
    remove: removeLearnField,
  } = useFieldArray({
    control,
    name: "advanced.willLearn",
    rules: { minLength: 3 },
  });

  const MAX_REQUIREMENTS = 8;
  const MAX_LEARNS = 8;

  const addNewRequirement = () => {
    if (requirementsFields.length < MAX_REQUIREMENTS) {
      appendRequirement({ value: "" });
    }
  };

  const removeRequirement = (index: number) => {
    if (requirementsFields.length > 1) {
      removeRequirementField(index);
    }
  };

  const addNewLearnField = () => {
    if (learnFields.length < MAX_LEARNS) {
      appendLearnField({ value: "" });
    }
  };
  const removeLearn = (index: number) => {
    if (learnFields.length > 3) {
      removeLearnField(index);
    }
  };
  console.log(requirementsFields, "requirementsFields");
  return (
    <div className="p-3">
      <h1 className="font-semibold pb-2 mb-2 border-b">Advanced Information</h1>

      <form className="space-y-5">
        <div>
          <Label htmlFor="advanced.description">Description</Label>
          <Textarea
            id="advanced.description"
            placeholder="Enter your course description"
            className="resize-none min-h-40 overflow-hidden h-auto"
            {...register("advanced.description")}
            onInput={(e) => {
              const textarea = e.target as HTMLTextAreaElement;
              textarea.style.height = "auto";
              textarea.style.height = `${textarea.scrollHeight}px`;
            }}
          />
          {errors.advanced?.description && (
            <p className="text-red-500">
              {errors.advanced.description.message}
            </p>
          )}
        </div>
        <div className="space-y-4">
          <div className="border-b py-4">
            <div className="flex justify-between items-center">
              <h3>
                Course Requirements
                <span>
                  ({requirementsFields.length}/{MAX_REQUIREMENTS})
                </span>
              </h3>
              <Button
                type="button"
                disabled={requirementsFields.length >= MAX_REQUIREMENTS}
                onClick={addNewRequirement}
              >
                Add new +
              </Button>
            </div>

            <div className=" space-y-4 ">
              {requirementsFields.map((field, index) => (
                <div className="group" key={field.id}>
                  <span>#{index + 1}</span>
                  <div className="flex items-center gap-4 ">
                    <Input
                      placeholder="What you will teach in this course"
                      {...register(`advanced.requirements.${index}.value`)}
                      className=""
                    />
                    <div
                      onClick={() => removeRequirement(index)}
                      className={`bg-primary p-2 rounded cursor-pointer  group-hover:opacity-100 group-hover:visible transition-opacity invisible opacity-0`}
                    >
                      <FaRegTrashAlt />
                    </div>
                  </div>
                  {errors.advanced?.requirements?.[index]?.value && (
                    <p className="text-red-500">
                      {errors.advanced.requirements?.[index].value.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="border-b py-4">
            <div className="flex justify-between items-center">
              <h3>
                What student will learn in course
                <span>
                  ({learnFields.length}/{MAX_LEARNS})
                </span>
              </h3>
              <Button
                type="button"
                disabled={learnFields.length >= MAX_REQUIREMENTS}
                onClick={addNewLearnField}
              >
                Add new +
              </Button>
            </div>
            <div className="space-y-4">
              {learnFields.map((field, index) => (
                <div className="group" key={field.id}>
                  <span>#{index + 1}</span>
                  <div className="flex items-center gap-4 ">
                    <Input
                      placeholder="What you will teach in this course"
                      {...register(`advanced.willLearn.${index}.value`)}
                      className=""
                    />
                    <div
                      onClick={() => removeLearn(index)}
                      className={`bg-primary p-2 rounded cursor-pointer  group-hover:opacity-100 group-hover:visible transition-opacity invisible opacity-0`}
                    >
                      <FaRegTrashAlt />
                    </div>
                  </div>
                  {errors.advanced?.willLearn?.[index]?.value && (
                    <p className="text-red-500">
                      {errors.advanced.willLearn?.[index].value.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdvancedTab;
