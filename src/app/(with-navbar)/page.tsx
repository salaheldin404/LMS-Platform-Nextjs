import Image from "next/image";
export default function Home() {
  return (
    <div className="bg-background relative mt-[100px] lg:mt-[140px] h-[calc(100vh-140px)]">
      <div className="container flex-between">
        <div className="pt-4 w-[320px] lg:w-[500px] flex flex-col gap-4">
          <h1 className="font-semibold md:text-[35px] lg:text-[45px] leading-tight">
            Learn with expert anytime anywhere
          </h1>
          <p className="mb-4  lg:text-lg text-foreground ">
            Our mision is to help people to find the best course online and
            learn with expert anytime, anywhere.
          </p>
          <button className="w-fit bg-primary text-white px-7 py-2">
            Get Started
          </button>
        </div>
        <div className="hidden md:block absolute top-0 right-0 md:w-[350px] lg:w-[600px]">
          <Image
            src="/img-1.png"
            alt="hero"
            className="object-contain"
            width={600}
            height={300}
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}
