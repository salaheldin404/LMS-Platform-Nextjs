"use client";
// import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./setting/_components/AppSidebar";

import SettingHeader from "./setting/_components/SettingHeader";
// import SidebarProviderClient from "./_components/SidebarProviderClient";

import dynamic from "next/dynamic";

const SidebarProviderClient = dynamic(
  () => import("@/components/ui/sidebar").then((mod) => mod.SidebarProvider),
  { ssr: false }
);

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProviderClient className="bg-[#eee] dark:bg-background">
      <AppSidebar />
      <section className="flex-1">
        <SettingHeader />
        <main className="container">{children}</main>
      </section>
    </SidebarProviderClient>
  );
};
export default SettingLayout;
