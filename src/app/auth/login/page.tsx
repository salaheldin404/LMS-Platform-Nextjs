import Image from "next/image";

// import "./envConfig.ts";
import LoginForm from "../_components/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative bg-background">
      <div className=" container px-4 mx-auto h-[calc(100vh-70px)] justify-center pt-5 gap-6  md:flex  md:items-center md:justify-end ">
        <div className="overflow-hidden bg-muted dark:bg-card h-[calc(100vh-70px)] hidden md:block relative md:absolute top-0 left-0  md:w-[40%] lg:w-1/2 ">
          <Image
            src="/img-2.png"
            alt="hero"
            className="object-contain absolute lg:!top-auto lg:!h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
            fill
            // priority
          />
        </div>
        <div className=" md:w-1/2 lg:w-[calc(50%-100px)]">
          <h1 className="text-center mb-6 font-semibold text-2xl md:text-3xl">
            Sign in to your account
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
