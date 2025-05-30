"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicTab from "./_components/BasicTab";
import AdvancedTab from "./_components/AdvancedTab";

import CurriculumTab from "./_components/CurriculumTab";
import PublishTab from "./_components/PublishTab";
import SubmitButton from "./_components/SubmitButton";

import {
  basicCourseSchema,
  advancedCourseSchema,
  curriculumCourseSchema,
} from "@/lib/validation/courseValidation";
import { useRouter } from "next/navigation";

import { useParams } from "next/navigation";
import {
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
} from "@/lib/store/features/courseApiSlice";

import { toast } from "sonner";
import NotFound from "@/components/common/NotFound";
import Loading from "./_components/Loading";

import { useAppSelector } from "@/lib/store/hooks";

export type FormData = {
  basic: z.infer<typeof basicCourseSchema>;
  advanced: z.infer<typeof advancedCourseSchema>;
  curriculum: z.infer<typeof curriculumCourseSchema>;
};

const tabsConfig = [
  {
    value: "basic",
    label: "Basic Information",
    // schema: basicCourseSchema,
  },
  {
    value: "advanced",
    label: "Advanced Information",
    // schema: advancedCourseSchema,
  },
  {
    value: "curriculum",
    label: "Curriculum",
    // schema: curriculumCourseSchema,
  },
  {
    value: "publish",
    label: "Publish Course",
  },
];

// const defaultValues: FormData = {
//   basic: {
//     title: "",
//     subtitle: "",
//     level: "",
//     category: "",
//     thumbnail: null,
//   },
//   advanced: {
//     description: "",
//     requirements: [{ value: "" }],
//     willLearn: [{ value: "" }, { value: "" }],
//   },
//   curriculum: {
//     sections: [],
//   },
// };

const mapCourseToForm = (courseData): FormData => {
  const requirements = courseData?.requirements.map((text) => ({
    value: text,
  }));
  const willLearn = courseData?.willLearn.map((text) => ({
    value: text,
  }));

  return {
    basic: {
      title: courseData.title || "",
      subtitle: courseData.subtitle || "",
      category: courseData.category || "",
      level: courseData.level || "",
      thumbnail: courseData.image || { public_id: "", url: "" },
      price: courseData.price,
      free: courseData.free || false,
    },
    advanced: {
      description: courseData.description || "",
      requirements: requirements.length > 0 ? requirements : [{ value: "" }],
      willLearn:
        willLearn.length >= 3
          ? willLearn
          : [{ value: "" }, { value: "" }, { value: "" }],
    },
    curriculum: {
      sections: courseData.chapters || [],
    },
  };
};

const ManageCoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("basic");

  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(
    new Set(["basic"])
  );

  const {
    data: courseData,
    isLoading: courseLoading,
    error,
  } = useGetCourseByIdQuery(courseId, {
    skip: !courseId,
    refetchOnMountOrArgChange: true,
  });
  const [updateCourse, { error: upadtingError, isLoading: isUpdating }] =
    useUpdateCourseMutation();

  const router = useRouter();

  const isLoading = courseLoading; //|| userLoading;

  // check if user is instructor or admin
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const isCreator = courseData?.course?.instructor._id === user?._id;
      const hasAccess = user?.role === "admin" || isCreator;
      if (!hasAccess && !error) {
        router.push(`/`);
        return;
      }
    }
  }, [user, router, courseData, isLoading, error, isAuthenticated]);

  const currentTabIndex = useMemo(
    () => tabsConfig.findIndex((tab) => tab.value === activeTab),
    [activeTab]
  );

  const formMethods = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        basic: basicCourseSchema,
        advanced: advancedCourseSchema,
        curriculum: curriculumCourseSchema,
      })
    ),
    // defaultValues,

    mode: "onChange",
  });

  useEffect(() => {
    if (courseData?.course) {
      const mappedData = mapCourseToForm(courseData.course) as FormData;
      formMethods.reset(mappedData);
    }
  }, [courseData, formMethods]);

  const handleTabChange = async (tabValue: string) => {
    const newTabIndex = tabsConfig.findIndex((tab) => tab.value == tabValue);
    const isMovingForward = newTabIndex > currentTabIndex;
    const tabPart = activeTab as keyof FormData;
    //  validate only when moving forward
    if (isMovingForward) {
      const validate = await formMethods.trigger(tabPart);
      if (!validate) return;
      // saveFormData(tabPart);
    }

    setActiveTab(tabValue);
    setVisitedTabs((prev) => new Set([...prev, tabValue]));
  };
  type DirtyFields<T> = Partial<Record<keyof T, boolean>>;
  // handle navigation
  const handleNavigation = async (direction: "next" | "prev") => {
    if (direction == "next") {
      const tabPart = activeTab as keyof FormData;
      const validate = await formMethods.trigger(tabPart);
      if (!validate) return;
      // Get dirty fields and current values for the current tab
      const dirtyFields: DirtyFields<FormData[typeof tabPart]> =
        formMethods.formState.dirtyFields[tabPart] || {};
      const isTabDirty = Object.keys(dirtyFields).length > 0;
      const currentValues: FormData[typeof tabPart] =
        formMethods.getValues(tabPart);
      const formData = new FormData();
      if (isTabDirty) {
        // Append only dirty fields to FormData
        Object.entries(dirtyFields).forEach(([field, isDirty]) => {
          const typedField = field as keyof FormData[typeof tabPart];
          if (isDirty && currentValues[typedField] !== undefined) {
            const value = currentValues[typedField];
            if (typedField == "thumbnail") {
              formData.append("image", value);
            } else {
              // handle add requiremnts and willLearn
              if (Array.isArray(value)) {
                value.forEach(
                  (v) => v.value && formData.append(field, v.value)
                );
                console.log(value, "value type object");
              } else {
                formData.append(typedField, value);
              }
            }
          }
        });

        try {
          const updatedData = await updateCourse({
            courseId,
            data: formData,
          }).unwrap();
          console.log(updatedData, "updated course data");
          toast.success("Course updated successfully");
          // Reset dirty state for the current tab's fields
          console.log({ dirtyFields });
          // formMethods.reset({ [tabPart]: currentValues });
        } catch (error) {
          console.log(error, "error");
          return;
        }
      }

      // saveFormData(tabPart);
    }

    const newIndex = currentTabIndex + (direction == "next" ? 1 : -1);
    const newTabValue = tabsConfig[newIndex].value;
    handleTabChange(newTabValue);
  };

  // render tab content

  const renderTabContent = (tabValue: string) => {
    switch (tabValue) {
      case "basic":
        return <BasicTab isUpdating={isUpdating} />;
      case "advanced":
        return <AdvancedTab />;
      case "curriculum":
        return <CurriculumTab courseId={courseId} />;
      case "publish":
        return <PublishTab courseStatus={courseData?.course?.status} />;

      default:
        return null;
    }
  };

  const renderNavigationButton = (index: number) => {
    return (
      <div className="flex justify-between mt-6 p-3">
        <Button
          variant="outline"
          disabled={index === 0 || isUpdating}
          onClick={() => handleNavigation("prev")}
        >
          Previous
        </Button>
        {index < tabsConfig.length - 1 ? (
          <Button onClick={() => handleNavigation("next")}>
            {isUpdating ? "Saving..." : "Save & Continue"}
          </Button>
        ) : (
          <SubmitButton
            courseId={courseId}
            courseStatus={courseData?.course?.status}
          />
        )}
      </div>
    );
  };

  if (error) {
    console.log(error, "error from course data");
    if (error.status === 404) {
      return <NotFound />;
    }
    toast.error(error.message);
  }

  // if (courseLoading) {
  //   return <div className="text-center pt-5 font-bold">Loading...</div>;
  // }
  return (
    <FormProvider {...formMethods}>
      <Tabs
        onValueChange={handleTabChange}
        value={activeTab}
        className={`relative my-5 bg-card`}
      >
        {courseLoading && <Loading />}
        <TabsList className="grid w-full grid-cols-4  gap-3 h-auto rounded-0">
          {tabsConfig.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              disabled={!visitedTabs.has(tab.value)}
              className="data-[state=active]:bg-primary data-[state=active]:text-white py-3"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsConfig.map((tab, index) => (
          <TabsContent key={tab.value} value={tab.value} className="space-y-5">
            {renderTabContent(tab.value)}
            {renderNavigationButton(index)}
          </TabsContent>
        ))}
      </Tabs>
    </FormProvider>
  );
};

export default ManageCoursePage;
