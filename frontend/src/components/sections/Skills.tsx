/**
 * Skills section — Grid of tech cards matching custom dark portfolio design,
 * categorized dynamically by backend category with interactive filter tabs.
 */

"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Skill, SkillCategory } from "@/types";

interface SkillsProps {
  data: Skill[];
}

// Category metadata: labels, icons, and display ordering
const categoryConfig: Record<
  SkillCategory,
  { label: string; icon: string; order: number }
> = {
  frontend: { label: "Frontend", icon: "🎨", order: 1 },
  backend: { label: "Backend", icon: "⚙️", order: 2 },
  database: { label: "Database", icon: "🗄️", order: 3 },
  devops: { label: "DevOps", icon: "🚀", order: 4 },
  tools: { label: "Tools and Technologies", icon: "🛠️", order: 5 },
  other: { label: "Other", icon: "💡", order: 6 },
  languages: { label: "Programming Languages", icon: "💻", order: 7 },
  programming_languages: { label: "Programming Languages", icon: "💻", order: 7 },
};

/**
 * Returns a high-fidelity SVG icon matching technology logos
 * from the portfolio design system.
 */
function TechIcon({ name, fallbackIcon }: { name: string; fallbackIcon?: string }) {
  const n = name.toLowerCase().trim();

  // If user provided an emoji in backend, prioritize it if not standard text
  if (fallbackIcon && fallbackIcon.length <= 4 && !fallbackIcon.startsWith("http")) {
    return <span className="text-xl select-none leading-none">{fallbackIcon}</span>;
  }

  // Next.js
  if (n.includes("next")) {
    return (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.518-5.367-6.93V18H10.5V6.75h1.631l5.367 6.935V6.75h1.63v10.768h-1.63z" />
      </svg>
    );
  }

  // React
  if (n.includes("react")) {
    return (
      <svg className="w-5 h-5 text-[#61dafb]" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.2">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // TypeScript
  if (n.includes("type") || n === "ts") {
    return (
      <svg className="w-5 h-5 text-[#3178c6]" viewBox="0 0 24 24" fill="currentColor">
        <rect width="24" height="24" rx="4" fill="currentColor" />
        <path
          d="M12 10h-4v2h1.2v6h1.6v-6H12v-2zm3.2 2.5c0-.8.6-1.5 1.5-1.5 1.2 0 1.8.8 1.8 1.8v.2h-1.5c0-.4-.2-.6-.5-.6-.3 0-.5.2-.5.5 0 .8 2.5.5 2.5 2.5 0 1.2-.9 1.8-1.9 1.8-1.2 0-1.9-.8-1.9-1.9v-.3h1.5c0 .5.2.7.5.7.4 0 .6-.2.6-.5 0-.9-2.5-.6-2.5-2.7z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  // JavaScript
  if ((n.includes("java") && n.includes("script")) || n === "js") {
    return (
      <svg className="w-5 h-5 text-[#f7df1e]" viewBox="0 0 24 24" fill="currentColor">
        <rect width="24" height="24" rx="4" fill="currentColor" />
        <path
          d="M8 12v5c0 1.5-.8 2-2 2H5v-2h1c.4 0 .6-.2.6-.6V12h1.4zm7.5 0c1.5 0 2.5 1 2.5 2.5v1c0 1.5-1 2.5-2.5 2.5-1.5 0-2.5-1-2.5-2.5h1.5c0 .6.4 1 1 1s1-.4 1-1v-.3c0-.8-.5-1.2-1.2-1.4l-.8-.3c-1.2-.4-1.8-1.2-1.8-2.2 0-1.4 1-2.3 2.5-2.3 1.3 0 2.2.8 2.3 2h-1.5c-.1-.5-.4-.7-.8-.7-.4 0-.8.3-.8.7 0 .5.3.8.9 1l.9.4z"
          fill="#000000"
        />
      </svg>
    );
  }

  // MongoDB
  if (n.includes("mongo")) {
    return (
      <svg className="w-5 h-5 text-[#47a248]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.5C11.5 3.5 7 9.5 7 14.5c0 3.5 2.5 6.5 5 8 2.5-1.5 5-4.5 5-8C17 9.5 12.5 3.5 12 1.5zm-.5 3c.2 1.5 2 5.5 2 9.5 0 2-1 4-1.5 5.5-.5-1.5-1.5-3.5-1.5-5.5 0-4 1.8-8 2-9.5z" />
      </svg>
    );
  }

  // Node.js
  if (n.includes("node")) {
    return (
      <svg className="w-5 h-5 text-[#5fa04e]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3L12 4.3z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  // Express.js
  if (n.includes("express")) {
    return (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#1e2338" />
        <text
          x="4"
          y="16"
          fontSize="11"
          fontWeight="bold"
          fill="#ffffff"
          fontFamily="system-ui, sans-serif"
        >
          ex
        </text>
      </svg>
    );
  }

  // Python
  if (n.includes("python")) {
    return (
      <svg className="w-5 h-5 text-[#3776ab]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.9 2C8.3 2 8 3.6 8 3.6v2.7h4.1v.6H5.8S2 6.5 2 10.7c0 4.2 3.3 4.1 3.3 4.1h2v-2.8s-.1-3.3 3.3-3.3h5.7V5.9S16.6 2 11.9 2zm-1.8 1.9c.5 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm2 18.1c3.6 0 3.9-1.6 3.9-1.6v-2.7h-4.1v-.6h6.3s3.8.4 3.8-3.8c0-4.2-3.3-4.1-3.3-4.1h-2v2.8s.1 3.3-3.3 3.3h-5.7v3.5s-.3 3.9 4.4 3.9zm1.8-1.9c-.5 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
      </svg>
    );
  }

  // Django
  if (n.includes("django")) {
    return (
      <svg className="w-5 h-5 text-[#092e20]" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M11 2h3v14c-.8.1-1.6.2-2.3.2-3.2 0-4.7-1.4-4.7-4.2 0-2.7 1.8-4.4 4.3-4.4.9 0 1.5.2 2 .5V2zm0 8.3c-.3-.2-.7-.3-1.1-.3-1.4 0-2.3 1-2.3 2.6 0 1.5.8 2.4 2.2 2.4.4 0 .8-.1 1.2-.2v-4.5zM17 6h3v14h-3V6zm0-4h3v3h-3V2z"
          fill="#2ba977"
        />
      </svg>
    );
  }

  // Git / GitHub
  if (n.includes("git") || n.includes("github")) {
    return (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
      </svg>
    );
  }

  // Docker
  if (n.includes("docker")) {
    return (
      <svg className="w-5 h-5 text-[#2496ed]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 8h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2H7V8zm6-3h2v2h-2V5zm-3 0h2v2h-2V5zm6 3h2v2h-2V8zm3 3h2v2h-2v-2zm-18 2h17.8c-.3 3.5-3.3 6-7.8 6-4.5 0-7.8-2.5-8.8-5.5-.3-.2-.7-.3-1.2-.5z" />
      </svg>
    );
  }

  // Tailwind CSS
  if (n.includes("tailwind")) {
    return (
      <svg className="w-5 h-5 text-[#06b6d4]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6c-2.6 0-4.3 1.3-5.2 3.9 1-.9 2.2-1.3 3.6-1.3 1.8 0 3.1 1.2 3.9 3.5 1.2 3.5 3 5 5.7 5 2.6 0 4.3-1.3 5.2-3.9-1 .9-2.2 1.3-3.6 1.3-1.8 0-3.1-1.2-3.9-3.5C16.5 7.5 14.7 6 12 6zM6 13c-2.6 0-4.3 1.3-5.2 3.9 1-.9 2.2-1.3 3.6-1.3 1.8 0 3.1 1.2 3.9 3.5 1.2 3.5 3 5 5.7 5 2.6 0 4.3-1.3 5.2-3.9-1 .9-2.2 1.3-3.6 1.3-1.8 0-3.1-1.2-3.9-3.5C10.5 14.5 8.7 13 6 13z" />
      </svg>
    );
  }

  // PostgreSQL
  if (n.includes("postgres") || n.includes("sql")) {
    return (
      <svg className="w-5 h-5 text-[#336791]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 3.8 2.1 7.1 5.2 8.8.4-.5.8-1.1 1.2-1.8-1.8-1.2-3-3.2-3-5.5 0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5c0 2.3-1.2 4.3-3 5.5.4.7.8 1.3 1.2 1.8 3.1-1.7 5.2-5 5.2-8.8 0-5.5-4.5-10-10-10z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  }

  // Figma
  if (n.includes("figma")) {
    return (
      <svg className="w-5 h-5 text-[#f24e1e]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 2h8a4 4 0 010 8H8a4 4 0 010-8zm0 8h8a4 4 0 010 8H8a4 4 0 010-8zm0 8h4a4 4 0 01-4 4v-4z" />
      </svg>
    );
  }

  // Firebase
  if (n.includes("firebase")) {
    return (
      <svg className="w-5 h-5 text-[#ffca28]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.5 18.5L2 6l5 5.5 3.5-8L14 18.5H4.5zm11-1L12 8l3-3 6.5 12.5H15.5z" />
      </svg>
    );
  }

  // Three.js
  if (n.includes("three")) {
    return (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 3 21 19 3 19" />
        <line x1="12" y1="3" x2="12" y2="19" />
        <line x1="3" y1="19" x2="16.5" y2="11" />
        <line x1="21" y1="19" x2="7.5" y2="11" />
      </svg>
    );
  }

  // Chakra UI
  if (n.includes("chakra")) {
    return (
      <svg className="w-5 h-5 text-[#319795]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M13 6l-4 7h6l-4 5" fill="currentColor" />
      </svg>
    );
  }

  // Framer Motion
  if (n.includes("framer")) {
    return (
      <svg className="w-5 h-5 text-[#0055ff]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 2h16v7h-8l8 7H4v-7h8L4 2z" />
      </svg>
    );
  }

  // Bootstrap
  if (n.includes("bootstrap")) {
    return (
      <svg className="w-5 h-5 text-[#7952b3]" viewBox="0 0 24 24" fill="currentColor">
        <rect width="24" height="24" rx="5" fill="currentColor" />
        <path
          d="M7 6h5c1.8 0 3 1 3 2.3 0 1-.7 1.8-1.6 2.1 1.2.3 2 1.2 2 2.4 0 1.6-1.4 2.7-3.4 2.7H7V6zm2.2 1.9v2.5h2.6c.8 0 1.4-.4 1.4-1.2s-.6-1.3-1.4-1.3H9.2zm0 4.4v2.9h2.9c.9 0 1.6-.5 1.6-1.4s-.7-1.5-1.6-1.5H9.2z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  // WordPress
  if (n.includes("word") || n.includes("wp")) {
    return (
      <svg className="w-5 h-5 text-[#21759b]" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path
          d="M12 4.5c4.1 0 7.5 3.4 7.5 7.5 0 1.8-.7 3.5-1.8 4.8l-4.1-11.4c-.1-.3-.4-.4-.7-.4h-.3c-.3 0-.5.2-.6.4L8.3 16.5c-.8-1.2-1.3-2.6-1.3-4 0-4.1 3.4-7.5 7.5-7.5zm-5 11.2l3-8.8 2.2 6.6-2.5 7.4c-1.1-.9-2-2.1-2.7-3.4v-1.8zm6.5 3.7l2-5.9 1.9 5.2c-1.2.6-2.5.9-3.9.7z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  // AI / ML
  if (n.includes("ai") || n.includes("ml") || n.includes("machine")) {
    return (
      <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="4" y="6" width="16" height="14" rx="3" />
        <circle cx="9" cy="12" r="1.5" fill="currentColor" />
        <circle cx="15" cy="12" r="1.5" fill="currentColor" />
        <path d="M12 2v4M9 16h6M2 13h2M20 13h2" />
      </svg>
    );
  }

  // CI/CD
  if (n.includes("ci") || n.includes("cd")) {
    return (
      <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="5" cy="12" r="3" />
        <circle cx="12" cy="6" r="3" />
        <circle cx="19" cy="12" r="3" />
        <path d="M8 12h3M14 8l3 3M8 13l3 3" />
      </svg>
    );
  }

  // Java
  if (n === "java" || n.startsWith("java ")) {
    return (
      <svg className="w-5 h-5 text-[#f89820]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.1 18.2c2.7.2 5.5-.3 7.8-1.5.3-.2.2-.5-.1-.6-.8-.2-1.7-.3-2.5-.3 2.1-.8 4.2-.6 6.3.2.3.1.5-.1.4-.4-1.1-2.2-4.5-2.8-7.2-2.7-2.6.1-5.1.9-7.3 2.3-.2.1-.1.4.1.5 1.5 1.1 1.7 2 2.5 2.5zm8.9 2.1c-4.4 2.1-10.7 2.1-14.8.2-.3-.1-.4.2-.2.4 3.4 2.8 11.2 2.7 15.3-.2.3-.2.1-.5-.3-.4zM12 2C8.5 7 14 8 11.5 12c-1.3 2.1-.3 3.6.4 5.3-2.2-1.9-3.2-4.1-2.4-6.6C10.5 7.6 13.5 5 12 2z" />
      </svg>
    );
  }

  // C / C++ / C#
  if (n === "c" || n.includes("c++") || n.includes("c#") || n.includes("cpp")) {
    return (
      <svg className="w-5 h-5 text-[#00599c]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm1-11h-2v2H9v2h2v2h2v-2h2v-2h-2V9z" />
      </svg>
    );
  }

  // HTML / HTML5
  if (n.includes("html")) {
    return (
      <svg className="w-5 h-5 text-[#e34f26]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 2l1.8 20.2L12 24l7.2-1.8L21 2H3zm14.8 5.7h-8.2l.2 2.3h7.8l-.6 6.7-5 1.4-5-1.4-.3-3.6h2.3l.2 1.8 2.8.8 2.8-.8.3-3.3H7.5L6.9 5.4h11.2l-.3 2.3z" />
      </svg>
    );
  }

  // CSS / CSS3 / SCSS / SASS
  if (n.includes("css") || n.includes("sass") || n.includes("scss")) {
    return (
      <svg className="w-5 h-5 text-[#1572b6]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 2l1.8 20.2L12 24l7.2-1.8L21 2H3zm14.7 5.7h-8.1l.2 2.3h7.7l-.8 8.6-4.7 1.3-4.7-1.3-.3-3.6h2.3l.2 1.8 2.5.7 2.5-.7.3-3.3H7.5L7 3.7h11l-.3 4z" />
      </svg>
    );
  }

  // AWS / Cloud / GCP / Azure
  if (n.includes("aws") || n.includes("cloud") || n.includes("gcp") || n.includes("azure")) {
    return (
      <svg className="w-5 h-5 text-[#ff9900]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
    );
  }

  // Redis
  if (n.includes("redis")) {
    return (
      <svg className="w-5 h-5 text-[#dc382d]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9L2 16l10 5 10-5-10-5zm0 4L4 19l8 4 8-4-8-4z" />
      </svg>
    );
  }

  // Redux
  if (n.includes("redux")) {
    return (
      <svg className="w-5 h-5 text-[#764abc]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 3a4.5 4.5 0 00-4 2.5A4.5 4.5 0 005.5 12a4.5 4.5 0 004 2.5 4.5 4.5 0 006 6.5 4.5 4.5 0 004-2.5 4.5 4.5 0 006-6.5 4.5 4.5 0 00-6-6.5z" />
      </svg>
    );
  }

  // Linux / Bash / Shell
  if (n.includes("linux") || n.includes("bash") || n.includes("shell") || n.includes("terminal")) {
    return (
      <svg className="w-5 h-5 text-[#fcc624]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    );
  }

  // FastAPI
  if (n.includes("fastapi") || n.includes("fast api")) {
    return (
      <svg className="w-5 h-5 text-[#009688]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S5.373 0 12 0zm-.75 4.5h1.5v6.75H18l-6.75 8.25v-6.75H6.75l4.5-8.25z" />
      </svg>
    );
  }

  // VS Code / Visual Studio Code
  if (n.includes("vscode") || n.includes("vs code") || n.includes("visual studio")) {
    return (
      <svg className="w-5 h-5 text-[#007acc]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .32 8.68l3.666 3.32-3.666 3.32a1 1 0 0 0 .007 1.42l1.322 1.202a1 1 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
      </svg>
    );
  }

  // REST API / GraphQL / General APIs
  if (n.includes("api") || n.includes("rest") || n.includes("graph") || n.includes("postman")) {
    return (
      <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M20 16V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2zM8 12h.01M12 12h.01M16 12h.01" />
      </svg>
    );
  }

  // Default Code Icon
  return (
    <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

// Fallback skills matching the full stack in case backend has no records yet
const fallbackSkills: Skill[] = [
  { id: 1, name: "React.js", category: "frontend", proficiency: 95, icon: "", ordering: 1, category_display: "Frontend", created_at: "", updated_at: "" },
  { id: 2, name: "TypeScript", category: "frontend", proficiency: 92, icon: "", ordering: 2, category_display: "Frontend", created_at: "", updated_at: "" },
  { id: 3, name: "Next.js", category: "frontend", proficiency: 90, icon: "", ordering: 3, category_display: "Frontend", created_at: "", updated_at: "" },
  { id: 4, name: "JavaScript", category: "frontend", proficiency: 95, icon: "", ordering: 4, category_display: "Frontend", created_at: "", updated_at: "" },
  { id: 5, name: "Tailwind", category: "frontend", proficiency: 92, icon: "", ordering: 5, category_display: "Frontend", created_at: "", updated_at: "" },
  { id: 6, name: "Framer Motion", category: "frontend", proficiency: 88, icon: "", ordering: 6, category_display: "Frontend", created_at: "", updated_at: "" },
  { id: 7, name: "Chakra UI", category: "frontend", proficiency: 82, icon: "", ordering: 7, category_display: "Frontend", created_at: "", updated_at: "" },
  { id: 8, name: "Bootstrap", category: "frontend", proficiency: 85, icon: "", ordering: 8, category_display: "Frontend", created_at: "", updated_at: "" },
  { id: 9, name: "Three.js", category: "frontend", proficiency: 75, icon: "", ordering: 9, category_display: "Frontend", created_at: "", updated_at: "" },
  { id: 10, name: "Python", category: "backend", proficiency: 90, icon: "", ordering: 10, category_display: "Backend", created_at: "", updated_at: "" },
  { id: 11, name: "Django", category: "backend", proficiency: 88, icon: "", ordering: 11, category_display: "Backend", created_at: "", updated_at: "" },
  { id: 12, name: "Node.js", category: "backend", proficiency: 85, icon: "", ordering: 12, category_display: "Backend", created_at: "", updated_at: "" },
  { id: 13, name: "Express.js", category: "backend", proficiency: 85, icon: "", ordering: 13, category_display: "Backend", created_at: "", updated_at: "" },
  { id: 14, name: "REST APIs", category: "backend", proficiency: 90, icon: "", ordering: 14, category_display: "Backend", created_at: "", updated_at: "" },
  { id: 15, name: "WordPress", category: "backend", proficiency: 78, icon: "", ordering: 15, category_display: "Backend", created_at: "", updated_at: "" },
  { id: 16, name: "MongoDB", category: "database", proficiency: 85, icon: "", ordering: 16, category_display: "Database", created_at: "", updated_at: "" },
  { id: 17, name: "PostgreSQL", category: "database", proficiency: 86, icon: "", ordering: 17, category_display: "Database", created_at: "", updated_at: "" },
  { id: 18, name: "Firebase", category: "database", proficiency: 80, icon: "", ordering: 18, category_display: "Database", created_at: "", updated_at: "" },
  { id: 19, name: "Git/GitHub", category: "tools", proficiency: 92, icon: "", ordering: 19, category_display: "Tools and Technologies", created_at: "", updated_at: "" },
  { id: 20, name: "Docker", category: "devops", proficiency: 75, icon: "", ordering: 20, category_display: "DevOps", created_at: "", updated_at: "" },
  { id: 21, name: "CI/CD", category: "devops", proficiency: 78, icon: "", ordering: 21, category_display: "DevOps", created_at: "", updated_at: "" },
  { id: 22, name: "FIGMA", category: "tools", proficiency: 84, icon: "", ordering: 22, category_display: "Tools and Technologies", created_at: "", updated_at: "" },
  { id: 23, name: "AI/ML Integration", category: "other", proficiency: 80, icon: "", ordering: 23, category_display: "Other", created_at: "", updated_at: "" },
];

export default function Skills({ data }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | SkillCategory>("all");

  // Determine active skills list (dynamic from backend API or fallback)
  const skillsList = useMemo(() => {
    return data && data.length > 0 ? data : fallbackSkills;
  }, [data]);

  // Group skills by backend category
  const groupedSkills = useMemo(() => {
    const groups: Partial<Record<SkillCategory, Skill[]>> = {};
    skillsList.forEach((skill) => {
      const cat = skill.category || "other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat]!.push(skill);
    });
    return groups;
  }, [skillsList]);

  // Available categories that have at least one skill
  const availableCategories = useMemo(() => {
    const categories = Object.keys(groupedSkills) as SkillCategory[];
    return categories.sort((a, b) => {
      const orderA = categoryConfig[a]?.order ?? 99;
      const orderB = categoryConfig[b]?.order ?? 99;
      return orderA - orderB;
    });
  }, [groupedSkills]);

  return (
    <section id="skills" className="relative border-t border-border-light dark:border-border-dark overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center w-full mb-10 sm:mb-12"
        >
          <h2 className="section-title text-center">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle text-center mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-14"
        >
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_16px_rgba(99,102,241,0.4)] border border-purple-400/30"
                : "bg-[#0c1024]/70 hover:bg-[#151c40] text-gray-400 hover:text-white border border-[#232a52]/60 hover:border-gray-600"
            }`}
          >
            All Skills ({skillsList.length})
          </button>

          {availableCategories.map((cat) => {
            const config = categoryConfig[cat] || categoryConfig.other;
            const count = groupedSkills[cat]?.length || 0;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_16px_rgba(99,102,241,0.4)] border border-purple-400/30"
                    : "bg-[#0c1024]/70 hover:bg-[#151c40] text-gray-400 hover:text-white border border-[#232a52]/60 hover:border-gray-600"
                }`}
              >
                <span>{config.icon}</span>
                <span>{config.label}</span>
                <span className="text-[11px] opacity-70">({count})</span>
              </button>
            );
          })}
        </motion.div>

        {/* Dedicated spacing between filter tabs row and category subtitles */}
        <div className="h-4 sm:h-6" aria-hidden="true" />

        {/* Categorized Cards Content */}
        <AnimatePresence mode="wait">
          {selectedCategory === "all" ? (
            // All categories grouped with category badges
            <motion.div
              key="all"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-5 sm:gap-7"
            >
              {availableCategories.map((cat, groupIdx) => {
                const config = categoryConfig[cat] || categoryConfig.other;
                const skills = groupedSkills[cat] || [];
                const isLast = groupIdx === availableCategories.length - 1;

                return (
                  <div key={cat} className="flex flex-col">
                    {/* Category Label Header */}
                    <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                      <span className="text-base sm:text-lg">{config.icon}</span>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-200 tracking-wide">
                        {config.label}
                      </h3>
                      <div className="h-px flex-1 bg-gradient-to-r from-gray-800 via-gray-800/40 to-transparent ml-2" />
                    </div>

                    {/* Skill Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {skills.map((skill, i) => (
                        <SkillCard key={skill.id || `${cat}-${i}`} skill={skill} index={i + groupIdx * 4} />
                      ))}
                    </div>

                    {/* Explicit line feed spacer between categories (reduced ~30%) */}
                    {!isLast && (
                      <div className="h-4 sm:h-5" aria-hidden="true" />
                    )}
                  </div>
                );
              })}
            </motion.div>
          ) : (
            // Single selected category grid
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-2 sm:mt-4"
            >
              {(groupedSkills[selectedCategory] || []).map((skill, i) => (
                <SkillCard key={skill.id || i} skill={skill} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/**
 * Single Skill Card matching the custom reference design.
 * Features rounded dark card, tech icon, name, and glowing hover accent.
 */
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  // Give top/favorite skills a standout golden star (like TypeScript in the design mockup)
  const isStandout =
    skill.name.toLowerCase().includes("typescript") ||
    skill.name.toLowerCase().includes("react") ||
    skill.proficiency >= 95;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: (index % 12) * 0.04 }}
      className={`group relative flex items-center gap-3.5 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 select-none ${
        isStandout
          ? "bg-[#0b0f26]/90 hover:bg-[#12183c] border border-indigo-500/40 hover:border-indigo-400 shadow-[0_0_14px_rgba(99,102,241,0.18)] hover:shadow-[0_0_24px_rgba(99,102,241,0.35)]"
          : "bg-[#090d21]/80 hover:bg-[#111738] border border-[#1b2144]/70 hover:border-indigo-500/80 hover:shadow-[0_0_22px_rgba(99,102,241,0.25)]"
      }`}
    >
      {/* Tech Icon */}
      <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center text-white/90 group-hover:text-white transition-colors duration-200">
        <TechIcon name={skill.name} fallbackIcon={skill.icon} />
      </div>

      {/* Tech Name */}
      <span className="text-sm sm:text-[15px] font-medium text-white/90 group-hover:text-white transition-colors duration-200 tracking-normal truncate">
        {skill.name}
      </span>

      {/* Optional Gold Star Accent on standout skill (matching reference design) */}
      {isStandout && (
        <span
          className="absolute bottom-2 right-2.5 text-amber-400 text-xs sm:text-sm drop-shadow-[0_0_6px_rgba(251,191,36,0.8)] select-none pointer-events-none"
          title="Featured Skill"
        >
          ★
        </span>
      )}
    </motion.div>
  );
}
