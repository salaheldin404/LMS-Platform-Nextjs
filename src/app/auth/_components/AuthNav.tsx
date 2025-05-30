"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const AuthNav = () => {
  const pathname = usePathname();

  let linkHref = "/auth/signup";
  let linkText = "Create Account";

  if (pathname === "/auth/signup") {
    linkHref = "/auth/login";
    linkText = "Sign In";
  }
  return (
    <nav className="relative shadow-md h-[70px] z-20 bg-card">
      <div className="container mx-auto px-4 flex-between">
        <Link href="/" className="flex items-center h-[70px]">
          <Image
            src={"/new-logo.png"}
            className="rounded-full"
            width={60}
            height={60}
            alt="logo"
          />
        </Link>

        <Link href={linkHref}>
          <p className="px-4 py-2 text-primary dark:text-white font-medium bg-muted">
            {linkText}
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default AuthNav;
