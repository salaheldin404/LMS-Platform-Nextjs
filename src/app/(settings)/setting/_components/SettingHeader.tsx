"use client";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { DEFAULT_AVATAR } from "@/constants";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect } from "react";

import { useAppDispatch } from "@/lib/store/hooks";
import { login } from "@/lib/store/auth-slice";

import { sidebarItems } from "./AppSidebar";

const SettingHeader = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  // Get matching sidebar item for current route
  const getPageTitle = () => {
    // Sort items by longest URL first to handle nested routes
    const sortedItems = [...sidebarItems].sort(
      (a, b) => b.url.length - a.url.length
    );
    const matchedItem = sortedItems.find(
      (item) => item.url !== "#" && pathname.startsWith(item.url)
    );

    return matchedItem?.title || "Dashboard";
  };

  useEffect(() => {
    if (user) {
      dispatch(login(user));
    }
  }, [dispatch, user]);

  return (
    <div className=" sticky top-0 z-30 bg-card drop-shadow-md ">
      <SidebarTrigger className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2" />
      <div className="container flex justify-between items-center py-3">
        <div className="flex items-center gap-4">
          <div className="">
            <span className="text-gray-500">Good Morning</span>
            <p className="font-bold capitalize text-2xl">{getPageTitle()}</p>
          </div>
          <SidebarTrigger className="flex lg:hidden" />
        </div>

        <div className="relative flex-1 flex justify-end items-center gap-4">
          <ModeToggle />
          <Image
            src={user?.profilePicture?.url || DEFAULT_AVATAR}
            className="rounded-full w-[70px] h-[70px] object-cover"
            width={70}
            height={70}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingHeader;
