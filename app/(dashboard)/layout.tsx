import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";

async function layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar />
      <SidebarInset className="min-h-0 min-w-0">
        <main className="flex flex-1 flex-col min-h-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default layout;
