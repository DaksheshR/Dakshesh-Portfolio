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
  const defaultDescription = `💻 Computer Science Graduate | MSc Student

I am a Computer Science graduate currently pursuing my MSc CS, with a strong interest in software development and problem-solving. I am passionate about continuous learning and improving my skills through hands-on projects and coding practice.

⚙️ I apply Object-Oriented Programming (OOP), Data Structures, and Algorithms to solve real-world problems, and follow best practices including version control (Git/GitHub) and debugging.

📈 I believe in consistency over perfection and focus on growing every day.

🚀 Currently seeking entry-level / graduate software engineer opportunities where I can contribute and grow.`;

  const rawDescription = data?.description || defaultDescription;
  const description = rawDescription
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n");

  const projectsCount = data?.projects_completed != null ? `${data.projects_completed}+` : "1+";
  const yearsExperience = data?.years_experience ?? 0;
  const happyClients = data?.happy_clients ?? 0;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#070816] text-white border-t border-[#27272a]/60 select-none"
    >
      {/* ─── Ambient Glow Effects ─── */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="section-container relative z-10">
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center w-full mb-12 sm:mb-16"
        >
          <h2 className="section-title text-center">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle text-center mx-auto">
            Get to know the person behind the code
          </p>
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
            className="lg:col-span-7"
          >
            {/* Greeting */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-purple-400 uppercase">
                HELLO, I&apos;M DAKSHESH
              </span>
              <span className="text-sm">👋</span>
            </div>

            {/* Main Headline with Accent Line */}
            <div className="space-y-3 mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                I turn ideas into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-400">
                  digital experiences.
                </span>
              </h2>
              <div className="h-[2px] w-28 bg-gradient-to-r from-purple-500/70 via-indigo-500/50 to-transparent" />
            </div>

            {/* Explicit line feed spacer between headline and description */}
            <div className="h-4 sm:h-6" aria-hidden="true" />

            {/* Bio Description with full whitespace & line-feed preservation like <pre> */}
            <div className="text-sm sm:text-[15px] text-gray-300 leading-relaxed max-w-xl font-normal whitespace-pre-wrap font-sans">
              {description}
            </div>

            {/* Explicit line feed spacer between description and stats */}
            <div className="h-4 sm:h-6" aria-hidden="true" />

            {/* Stats Row with top margin above divider and padding below */}
            <div className="mt-4 sm:mt-6 pt-6 sm:pt-8 border-t border-gray-800/80">
              <div className="flex flex-wrap items-center gap-6 sm:gap-10">
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

                {/* Stat 2: Projects Built (Dynamic) */}
                <div className="flex items-center gap-3 pl-4 sm:pl-8 border-l border-gray-800/80">
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

                {/* Stat 3: Years Experience (Dynamic if > 0) */}
                {yearsExperience > 0 && (
                  <div className="flex items-center gap-3 pl-4 sm:pl-8 border-l border-gray-800/80">
                    <svg
                      className="w-5 h-5 text-purple-400 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <div>
                      <div className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {yearsExperience}+
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400">
                        Years Experience
                      </div>
                    </div>
                  </div>
                )}

                {/* Stat 4: Happy Clients (Dynamic if > 0) */}
                {happyClients > 0 && (
                  <div className="flex items-center gap-3 pl-4 sm:pl-8 border-l border-gray-800/80">
                    <svg
                      className="w-5 h-5 text-purple-400 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <div>
                      <div className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {happyClients}+
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400">
                        Happy Clients
                      </div>
                    </div>
                  </div>
                )}
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
