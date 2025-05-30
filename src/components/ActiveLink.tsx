"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  mediumScreen?: boolean;
  onClick?: () => void;
}
const ActiveLink = ({
  href,
  children,
  className,
  mediumScreen,
  onClick,
}: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname == href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        className,
        "p-4",
        isActive ? "dark:text-white border-t border-primary" : " text-gray-500",
        isActive && mediumScreen && "bg-primary text-white rounded",
        mediumScreen && "w-full transition-colors"
      )}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
