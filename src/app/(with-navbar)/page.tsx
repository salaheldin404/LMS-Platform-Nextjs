import BecomeInstructor from "@/components/landing/BecomeInstructor";
import BestSellingCourses from "@/components/landing/BestSellingCourses";
import Categories from "@/components/landing/Categories";
import HeroSection from "@/components/landing/Hero";

export default function Home() {
  return (
    <div className="bg-background  mt-[88px] lg:mt-[140px]">
      <main>
        <HeroSection />
        <Categories />
        <BestSellingCourses />
        <BecomeInstructor />
      </main>
    </div>
  );
}
