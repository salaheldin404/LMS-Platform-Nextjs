import Image from "next/image";
import { Button } from "@/components/ui/button";
const HeroSection = () => {
  return (
    <section className="bg-gray-100 dark:bg-muted relative  lg:pt-10 pb-5  ">
      <div className="container flex">
        <div className="pt-4 md:basis-1/2 flex flex-col gap-4">
          <h1 className="font-semibold text-[25px] md:text-[35px] lg:text-[45px] leading-tight">
            Learn with expert anytime anywhere
          </h1>
          <p className="mb-4  lg:text-lg text-foreground ">
            Our mision is to help people to find the best course online and
            learn with expert anytime, anywhere.
          </p>
          <Button className="w-fit bg-primary text-white px-7 py-2">
            Get Started
          </Button>
        </div>
        <div className="hidden h-full md:block absolute top-0 right-0 md:w-[350px] lg:w-[600px]">
          <Image
            src="/img-1.png"
            alt="hero"
            className="object-cover h-full"
            width={600}
            height={300}
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
