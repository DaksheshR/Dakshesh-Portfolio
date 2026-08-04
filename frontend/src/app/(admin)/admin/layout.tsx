/**
 * Admin layout — wraps all admin pages with sidebar and auth guard.
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/layout/AdminSidebar";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  // Auth guard: redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Also check if user is staff
  useEffect(() => {
    if (!isLoading && user && !user.is_staff) {
      router.push("/");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-light dark:bg-surface-dark">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-border-light dark:border-border-dark border-t-primary-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-surface-light dark:bg-surface-dark">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-14 border-b border-border-light dark:border-border-dark bg-white dark:bg-surface-card-dark flex items-center justify-between px-6">
          <h2 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
            Admin Panel
          </h2>
          <ThemeToggle />
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
