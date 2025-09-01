"use client";
import ActiveLink from "./ActiveLink";

import { Bell, Heart, ShoppingCart, X } from "lucide-react";
import AuthButton from "./header/AuthButton";
import { ModeToggle } from "./mode-toggle";
import { IUser } from "@/types/user";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import { useWishlist } from "@/hooks/useWishlist";

interface MobileNavProps {
  navOpen: boolean;
  onClose: () => void;
  session: IUser | null;
}

const NavLinks = [
  {
    content: "Home",
    link: "/",
  },
  {
    content: "About",
    link: "/about",
  },
  {
    content: "Coruses",
    link: "/courses",
  },
  {
    content: "Contact",
    link: "/contact",
  },
];

const MobileNav = ({ navOpen, onClose, session }: MobileNavProps) => {
  const { items: cart } = useAppSelector((state) => state.cart);
  const { wishlistData } = useWishlist();
  return (
    <div
      className={`fixed inset-0 z-10 overflow-hidden ${
        navOpen ? "visible" : "invisible"
      } duration-300 transition-[visibility]`}
    >
      {/* Backdrop */}
      <div
        className={`fixed  inset-0 bg-black/35 transition-opacity duration-500 ${
          navOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        role="button"
        aria-label="Close menu"
        tabIndex={-1}
      />

      {/* Navigation Panel */}
      <nav
        className={`fixed z-20 top-0 right-0 h-screen w-full max-w-md bg-card shadow-lg transition-transform duration-300 ease-in-out ${
          navOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Main navigation"
      >
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <AuthButton session={session} />

            <button
              aria-label="Close menu"
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Navigation Links */}
            <ul className="my-6 space-y-4">
              {NavLinks.map((n) => (
                <li key={n.link}>
                  <ActiveLink
                    href={n.link}
                    className="block rounded-lg hover:bg-accent transition-colors"
                    onClick={onClose}
                    mediumScreen={true}
                  >
                    {n.content}
                  </ActiveLink>
                </li>
              ))}
            </ul>

            {/* Action Icons */}
            <div className="flex justify-center gap-4 mt-8">
              {session && (
                <>
                  <div className="relative p-2">
                    <Link
                      href="/student/wishlist"
                      className="absolute inset-0 z-10"
                    />
                    {wishlistData && wishlistData.length > 0 && (
                      <span className="absolute w-6 h-6 top-[-10px] right-[-10px] grid place-content-center bg-primary text-white font-semibold text-xs px-[5px] rounded-full">
                        {wishlistData.length}
                      </span>
                    )}
                    <Heart className="h-6 w-6" />
                  </div>

                  <button
                    className="p-2 rounded-full hover:bg-accent transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell className="h-6 w-6" />
                  </button>
                </>
              )}
              <div className="relative p-2">
                <Link href="/cart" className="absolute inset-0 z-10" />
                <ShoppingCart />
                {cart.length > 0 && (
                  <span className="absolute w-6 h-6 top-[-10px] right-[-10px] grid place-content-center bg-primary text-white font-semibold text-xs px-[5px] rounded-full">
                    {cart.length}
                  </span>
                )}
              </div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default MobileNav;
