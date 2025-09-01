import { Button } from "../ui/button";
import Image from "next/image";

const TeachinSteps = [
  {
    id: 1,
    title: "Apply to become an Instructor",
    bgColor: "#e9d5ff",
    textColor: "#581c87",
  },
  {
    id: 2,
    title: "Build & edit your profile",
    bgColor: "#bfdbfe",
    textColor: "#1e3a8a",
  },
  {
    id: 3,
    title: "Create you new course",
    bgColor: "#fed7aa",
    textColor: "#854d0e",
  },
  {
    id: 4,
    title: "Start teaching & earning",
    bgColor: "#bbf7d0",
    textColor: "#14532d",
  },
];

const BecomeInstructor = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container gap-4 grid lg:grid-cols-2">
        <div className="relative flex flex-1 bg-primary p-6 min-h-[270px]">
          <div className="md:basis-[70%] lg:basis-full xl:basis-[70%]">
            <h2 className="text-3xl font-semibold text-white mb-5">
              Become an Instructor
            </h2>
            <p className="text-white leading-relaxed mb-4">
              Instructors from around the world teach millions of students on
              Udemy. We provide the tools and skills to teach what you love.
            </p>
            <Button className="px-8 py-2 bg-white text-primary hover:!bg-gray-100">
              Start Teaching
            </Button>
          </div>
          <div className="hidden md:block absolute bottom-0 right-0 w-[250px] h-[250px] lg:w-[280px] lg:h-[280px] ">
            <Image
              src="/instructor-2.png"
              alt="instructor"
              fill
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="bg-card p-6 flex-1  min-h-[270px]">
          <h1 className="mb-5 text-center text-[20px] md:text-start font-semibold md:text-3xl">
            Your teaching & earning steps
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
            {TeachinSteps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 p-2 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: step.bgColor,
                    color: step.textColor,
                  }}
                >
                  {step.id}
                </div>
                <p>{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructor;
