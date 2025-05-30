"use client";

import { FaCertificate, FaHeart } from "react-icons/fa";
import {
  LuChartColumnDecreasing,
  LuLayers3,
  LuMessageCircleMore,
  LuCirclePlus,
  LuSettings,
} from "react-icons/lu";
import { MdLogout, MdOutlineAttachMoney } from "react-icons/md";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/server/actions/auth";
import { usePathname, useRouter } from "next/navigation";

import { useAppSelector } from "@/lib/store/hooks";

// Menu items.
export const sidebarItems = [
  {
    title: "Create New Course",

    url: "/course/create",
    icon: LuCirclePlus,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LuChartColumnDecreasing,
  },
  {
    title: "My Courses",
    url: "/instructor/courses",
    icon: LuLayers3,
  },
  {
    title: "Message",
    url: "#",
    icon: LuMessageCircleMore,
  },
  {
    title: "Settings",
    url: "/setting",
    icon: LuSettings,
  },
];
// Define items outside the component for performance
const commonItems = [
  { title: "Message", url: "#", icon: LuMessageCircleMore },
  { title: "Settings", url: "/setting", icon: LuSettings },
];

const instructorItems = [
  {
    title: "Dashboard",
    url: "/instructor/dashboard",
    icon: LuChartColumnDecreasing,
  },

  {
    title: "Create New Course",
    url: "/instructor/course/create",
    icon: LuCirclePlus,
  },
  { title: "My Courses", url: "/instructor/courses", icon: LuLayers3 },
];

const studentItems = [
  {
    title: "Dashboard",
    url: "/student/dashboard",
    icon: LuChartColumnDecreasing,
  },
  { title: "Enrolled Courses", url: "/student/courses", icon: LuLayers3 },
  { title: "Certificates", url: "/student/certificates", icon: FaCertificate },
  { title: "Wishlist", url: "/student/wishlist", icon: FaHeart },
  {
    title: "Purchase History",
    url: "/student/purchase-history",
    icon: MdOutlineAttachMoney,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const items = [
    ...commonItems,
    ...(user?.role === "teacher" ? instructorItems : []),
    ...(user?.role === "student" ? studentItems : []),
  ];
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-3">
        <Link href="/">
          <Image
            width={70}
            height={70}
            src="/new-logo.png"
            alt="logo"
            className=" rounded-full"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {user?.role === "teacher" ? "Instructor" : "Student"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = item.url === pathname;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={` ${
                        isActive
                          ? "bg-primary hover:!bg-primary hover:text-white text-white rounded"
                          : ""
                      }`}
                      asChild
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        {user?.role === "teacher" && (
          <SidebarGroup>
            <SidebarGroupLabel>Student</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {studentItems.map((item) => {
                  const isActive = item.url === pathname;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className={` ${
                          isActive
                            ? "bg-primary hover:!bg-primary hover:text-white text-white rounded"
                            : ""
                        }`}
                        asChild
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <button
          onClick={handleLogout}
          className="flex items-center rounded gap-3 px-4 w-full h-12 font-semibold transition-colors dark:hover:text-white dark:hover:bg-white/10 hover:bg-black/10 hover:text-black text-sm text-gray-500"
        >
          <MdLogout />
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
