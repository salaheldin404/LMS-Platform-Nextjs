import ImageCollage from "@/components/about/ImageCollage";
import TeamSplitImages from "@/components/about/TeamSplitImages";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="bg-background mt-[88px] lg:mt-[140px]">
      <main>
        <section className="bg-background relative  py-20  ">
          <div className="container flex items-center gap-4">
            <div className="xl:pr-[60px] space-y-4">
              <h1 className="font-bold text-3xl lg:text-5xl xl:text-7xl text-gray-200">
                2010 - 2025
              </h1>
              <h2 className="font-semibold text-[30px] lg:text-[35px] xl:text-[45px] leading-tight">
                We Share knowledge with the world
              </h2>
              <p className="mb-4 font-[500px] lg:text-lg text-gray-300 leading-snug">
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Praesent fermentum quam mauris. Fusce tempor et augue a aliquet.
                Donec non ipsum non risus egestas tincidunt at vitae nulla.
              </p>
            </div>
            <TeamSplitImages />
          </div>
        </section>
        <section className="bg-gray-100 dark:bg-background relative  py-20  ">
          <div className="container flex-col lg:flex-row flex items-center gap-4">
            <div className="p-3 md:basis-[40%] space-y-4">
              <span className="uppercase text-primary">our gallery</span>
              <h2 className="font-semibold text-[25px] md:text-[30px] lg:text-[45px] leading-tight">
                We have been here for 15 years
              </h2>
              <p className="mb-4 font-[500px] lg:text-lg  ">
                Fusce lobortis leo augue, sit amet tristique nisi commodo in.
                Aliquam ac libero quis tellus venenatis imperdiet. Sed sed nunc
                libero. Curabitur in urna ligula. torquent per conubia nostra.
              </p>
              <Button className="w-fit bg-primary capitalize text-white px-7 py-2">
                Join our team
              </Button>
            </div>
            <ImageCollage />
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
