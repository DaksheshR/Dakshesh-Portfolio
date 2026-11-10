/**
 * About section — Modern dark-mode layout matching custom portfolio design
 * with neon geometric portrait, tech pills, and animated stats.
 */

"use client";

import { motion } from "framer-motion";
import type { AboutSection as AboutData } from "@/types";

interface AboutProps {
  data: AboutData | null;
}

export default function About({ data }: AboutProps) {
  const description =
    data?.description ||
    "An MSc Computer Science student and full-stack developer passionate about building modern, scalable web applications, solving real-world problems, and exploring emerging technologies like AI.";

  const projectsCount = data?.projects_completed ? `${data.projects_completed}+` : "15+";
  const techCount = data?.happy_clients ? `${data.happy_clients}+` : "10+";

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 overflow-hidden bg-[#070816] text-white border-t border-[#27272a]/60 select-none"
    >
      {/* ─── Ambient Glow Effects ─── */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── Top Bar: 01 / ABOUT ME + Available Badge ─── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 sm:mb-16"
        >
          {/* Left: 01 / ABOUT ME and horizontal accent line */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-purple-400 uppercase">
              01 / ABOUT ME
            </span>
            <div className="h-[1px] w-20 sm:w-28 bg-gradient-to-r from-purple-500/60 to-transparent" />
          </div>

          {/* Right: Available for Opportunities pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-700/60 bg-black/40 backdrop-blur-md self-start sm:self-auto shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            </span>
            <span className="text-[11px] sm:text-xs text-gray-300 font-medium">
              Available for Opportunities
            </span>
          </div>
        </motion.div>

        {/* ─── Main Two-Column Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ─── Left Column: Portrait in Geometric Neon Frame ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] group">
              {/* Backlight orb */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-pink-600/10 blur-3xl opacity-70 group-hover:opacity-100 transition duration-700 -z-10" />

              {/* Graphic container with visual */}
              <div className="relative transition-all duration-500 group-hover:scale-[1.02]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data?.image || "/images/about_hero_visual.png"}
                  alt="Dakshesh"
                  className="w-full h-auto object-contain select-none drop-shadow-[0_15px_30px_rgba(147,51,234,0.35)]"
                />
              </div>
            </div>
          </motion.div>

          {/* ─── Right Column: Content & Stats ─── */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Greeting */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-purple-400 uppercase">
                HELLO, I&apos;M DAKSHESH
              </span>
              <span className="text-sm">👋</span>
            </div>

            {/* Main Headline with Accent Line */}
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                I turn ideas into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-400">
                  digital experiences.
                </span>
              </h2>
              <div className="h-[2px] w-28 bg-gradient-to-r from-purple-500/70 via-indigo-500/50 to-transparent" />
            </div>

            {/* Bio Paragraph */}
            <p className="text-sm sm:text-[15px] text-gray-300 leading-relaxed max-w-xl font-normal">
              {description}
            </p>

            {/* Tech Interest Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {/* Full Stack */}
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-gray-200 text-xs sm:text-[13px] font-medium shadow-sm hover:border-purple-400/60 hover:bg-purple-500/15 transition-colors">
                <svg
                  className="w-3.5 h-3.5 text-purple-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m12 2 10 5-10 5-10-5Z" />
                  <path d="m2 12 10 5 10-5" />
                  <path d="m2 17 10 5 10-5" />
                </svg>
                Full Stack
              </span>

              {/* AI / ML */}
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-gray-200 text-xs sm:text-[13px] font-medium shadow-sm hover:border-purple-400/60 hover:bg-purple-500/15 transition-colors">
                <svg
                  className="w-3.5 h-3.5 text-purple-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect width="16" height="16" x="4" y="4" rx="2" />
                  <rect width="6" height="6" x="9" y="9" rx="1" />
                  <path d="M15 2v2M9 2v2M20 15h2M20 9h2M9 20v2M15 20v2M2 9h2M2 15h2" />
                </svg>
                AI / ML
              </span>

              {/* System Design */}
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-gray-200 text-xs sm:text-[13px] font-medium shadow-sm hover:border-purple-400/60 hover:bg-purple-500/15 transition-colors">
                <svg
                  className="w-3.5 h-3.5 text-purple-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="16" y="16" width="6" height="6" rx="1" />
                  <rect x="2" y="16" width="6" height="6" rx="1" />
                  <rect x="9" y="2" width="6" height="6" rx="1" />
                  <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
                  <path d="M12 12V8" />
                </svg>
                System Design
              </span>

              {/* DSA */}
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-gray-200 text-xs sm:text-[13px] font-medium shadow-sm hover:border-purple-400/60 hover:bg-purple-500/15 transition-colors">
                <svg
                  className="w-3.5 h-3.5 text-purple-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                DSA
              </span>
            </div>

            {/* Stats Row */}
            <div className="pt-4 border-t border-gray-800/80">
              <div className="grid grid-cols-3 gap-3 sm:gap-6 items-center">
                {/* Stat 1: Degree */}
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-purple-400 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                  </svg>
                  <div>
                    <div className="text-base sm:text-lg font-bold text-white tracking-tight">
                      MSc
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400">
                      Computer Science
                    </div>
                  </div>
                </div>

                {/* Stat 2: Projects */}
                <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-gray-800/80">
                  <svg
                    className="w-5 h-5 text-purple-400 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path d="m7 8-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" />
                  </svg>
                  <div>
                    <div className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {projectsCount}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400">
                      Projects Built
                    </div>
                  </div>
                </div>

                {/* Stat 3: Technologies */}
                <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-gray-800/80">
                  <svg
                    className="w-5 h-5 text-purple-400 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path d="m12 2 10 5-10 5-10-5Z" />
                    <path d="m2 12 10 5 10-5" />
                    <path d="m2 17 10 5 10-5" />
                  </svg>
                  <div>
                    <div className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {techCount}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400">
                      Technologies
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom Purple Particle Wave Glow ─── */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none select-none -z-10 opacity-70">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about_bottom_wave.png"
          alt=""
          className="w-full h-auto min-h-[60px] object-cover mix-blend-screen"
        />
      </div>
    </section>
  );
}
