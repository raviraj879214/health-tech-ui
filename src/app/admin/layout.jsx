"use client";
import { Outfit } from 'next/font/google';
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthAdmin } from "../../components/middleware/AuthAdmin";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function AdminLayout({ children }) {
  return (
    // <AuthAdmin>
      <ThemeProvider>
        <SidebarProvider>
          <InnerLayout>{children}</InnerLayout>
        </SidebarProvider>
      </ThemeProvider>
    // </AuthAdmin>
  );
}

// Separate inner component that can safely use useSidebar
function InnerLayout({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className={`${outfit.className} dark:bg-gray-900 min-h-screen xl:flex`}>
      <AppSidebar />
      <Backdrop />

      <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        <AppHeader />

        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
