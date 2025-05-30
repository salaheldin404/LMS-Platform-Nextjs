"use client";

import { SidebarProvider } from "@/components/ui/sidebar";

const SidebarProviderClient = ({ children }: { children: React.ReactNode }) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default SidebarProviderClient;
