/**
 * Admin Dashboard — Overview page showing content summary.
 */

"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { portfolioService } from "@/services/portfolio.service";
import { adminService } from "@/services/portfolio.service";
import Link from "next/link";

interface DashboardStats {
  skills: number;
  projects: number;
  education: number;
  messages: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    skills: 0,
    projects: 0,
    education: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [skills, projects, education, messages] = await Promise.all([
          portfolioService.getSkills(),
          portfolioService.getProjects(),
          portfolioService.getEducation(),
          adminService.getMessages(),
        ]);

        setStats({
          skills: skills.length,
          projects: projects.count,
          education: education.length,
          messages: messages.length,
          unreadMessages: messages.filter((m) => !m.is_read).length,
        });
      } catch {
        // Stats will remain at defaults
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  const cards = [
    {
      label: "Skills",
      value: stats.skills,
      href: "/admin/skills",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      label: "Projects",
      value: stats.projects,
      href: "/admin/projects",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: "Education",
      value: stats.education,
      href: "/admin/education",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
    {
      label: "Messages",
      value: stats.messages,
      href: "/admin/messages",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} unread` : undefined,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-0.5">
          Overview of your portfolio content
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card hover>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-text-muted-light dark:text-text-muted-dark font-medium uppercase tracking-wider">
                  {card.label}
                </p>
                <div className="w-8 h-8 rounded-lg bg-surface-muted-light dark:bg-surface-elevated-dark flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark">
                  {card.icon}
                </div>
              </div>
              <p className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark tabular-nums">
                {isLoading ? "—" : card.value}
              </p>
              {card.badge && (
                <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  {card.badge}
                </span>
              )}
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <Card>
        <h2 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {[
            { label: "Edit Hero Section", href: "/admin/hero" },
            { label: "Edit About Section", href: "/admin/about" },
            { label: "Manage Skills", href: "/admin/skills" },
            { label: "Manage Projects", href: "/admin/projects" },
            { label: "Manage Education", href: "/admin/education" },
            { label: "View Messages", href: "/admin/messages" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-muted-light dark:hover:bg-surface-elevated-dark text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-all duration-150 text-[13px] font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              {action.label}
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
