/**
 * Root layout — Wraps the entire application with providers,
 * fonts, and metadata.
 */

import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dakshesh | Full Stack Developer Portfolio",
  description:
    "Portfolio of Dakshesh — a passionate full-stack developer specializing in React, Next.js, Django, and modern web technologies. Building exceptional digital experiences.",
  keywords: [
    "Dakshesh",
    "Full Stack Developer",
    "Portfolio",
    "React",
    "Next.js",
    "Django",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Dakshesh" }],
  openGraph: {
    title: "Dakshesh | Full Stack Developer",
    description:
      "Explore my portfolio — projects, skills, and experience in full-stack web development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts: Inter + JetBrains Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('portfolio-theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch {}
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
