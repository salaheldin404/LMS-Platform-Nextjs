"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ActiveLink from "../ActiveLink";

import { Search, Bell, Heart, ShoppingCart, AlignJustify } from "lucide-react";
import MobileNav from "../MobileNav";
import { usePathname } from "next/navigation";

import AuthButton from "./AuthButton";
import { ModeToggle } from "../mode-toggle";
import { IUser } from "@/types/user";
import { useAppSelector } from "@/lib/store/hooks";

interface IProps {
  session: IUser | null;
}

const Navbar = ({ session }: IProps) => {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();
  const { items: cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  const handleNavOpenChange = (isOpen: boolean) => {
    setNavOpen(isOpen);
  };

  // const shouldHide = [
  //   ...["/auth", "/instructor",'/course/create'].map((prefix) => pathname.startsWith(prefix)),
  //   ["/setting"].includes(pathname),
  // ].some(Boolean);
  // if (shouldHide) return null;
  return (
    <>
      <nav className="hidden lg:block bg-card px-4 border-b">
        <div className="flex items-center gap-5 ">
          <ActiveLink className="text-card-foreground " href={"/"}>
            Home
          </ActiveLink>
          <ActiveLink className="text-card-foreground" href={"/about"}>
            About
          </ActiveLink>
          <ActiveLink className="text-card-foreground" href={"/courses"}>
            Courses
          </ActiveLink>
          <ActiveLink className="text-card-foreground" href={"/contact"}>
            Contact
          </ActiveLink>
        </div>
      </nav>

      <nav className="border-b bg-card py-2 px-4 flex-between">
        <div className="flex items-center gap-4 md:gap-8 ">
          <Link href="/">
            <Image
              src={"/new-logo.png"}
              className="rounded-full"
              width={70}
              height={70}
              alt="logo"
              priority
            />
          </Link>
          <form action="" className="relative px-2 py-1 w-64 md:w-[500px]">
            <input
              type="text"
              placeholder="what do you want learn..."
              className="p-2 px-12 border w-full"
            />
            <Search className="left-5 top-[50%] translate-y-[-50%] absolute" />
          </form>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <ModeToggle />
          <div className="icons flex items-center gap-4">
            <Heart />
            <Bell />
            <div className="relative">
              <Link href="/cart" className="absolute inset-0 z-10" />
              <ShoppingCart />
              {cart.length > 0 && (
                <span className="absolute w-6 h-6 top-[-10px] right-[-10px] grid place-content-center bg-primary text-white font-semibold text-xs px-[5px] rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
          <AuthButton session={session} />
        </div>

        <div
          className="p-2 cursor-pointer lg:hidden"
          onClick={() => handleNavOpenChange(true)}
        >
          <AlignJustify />
        </div>
        <MobileNav
          navOpen={navOpen}
          onClose={() => handleNavOpenChange(false)}
        />
      </nav>
    </>
  );
};

export default Navbar;
