/**
 * Education section — Elegant timeline with 3D graphic, institution cards,
 * CGPA metrics, degree level badges, and university watermark styling.
 */

"use client";

import { motion } from "framer-motion";
import { formatDate } from "@/utils/helpers";
import type { Education as EducationData } from "@/types";

interface EducationProps {
  data: EducationData[];
}

function parseEducationDetails(entry: EducationData) {
  const desc = (entry.description || "").trim();

  // Extract CGPA if present (e.g., "CGPA = 8.5", "CGPA: 9.0", "CGPA 9")
  const cgpaMatch = desc.match(/(?:CGPA|GPA|Grade)\s*[:=]?\s*([0-9.]+)/i);
  let cgpa: string | null = null;
  let extraDesc = desc;

  if (cgpaMatch) {
    cgpa = cgpaMatch[1];
    if (cgpa === "9") cgpa = "9.0";
    if (cgpa === "8") cgpa = "8.0";
    extraDesc = desc
      .replace(cgpaMatch[0], "")
      .replace(/^[,\s;.-]+|[,\s;.-]+$/g, "")
      .trim();
  } else if (/^[0-9](\.[0-9]+)?$/.test(desc)) {
    cgpa = desc;
    extraDesc = "";
  }

  // Determine degree level
  const title = (entry.degree || "").toLowerCase();
  const isPostgraduate =
    /master|m\.sc|mca|mba|m\.tech|mtech|m\.s\.|postgraduate|pg/i.test(title);
  const isUndergraduate =
    /bachelor|b\.sc|bca|bba|b\.tech|btech|b\.e\.|undergraduate|ug/i.test(title);
  const degreeType = isPostgraduate
    ? "Postgraduate"
    : isUndergraduate
    ? "Undergraduate"
    : "Degree";

  return { cgpa, extraDesc, degreeType };
}

export default function Education({ data }: EducationProps) {
  const entries =
    data.length > 0
      ? data
      : [
          {
            id: 1,
            institution: "PSG College of Arts and Science",
            degree: "Master of Science",
            field_of_study: "Computer Science",
            start_date: "2026-07-01",
            end_date: null,
            description: "CGPA = 8.5",
            logo: null,
            ordering: 0,
            created_at: "",
            updated_at: "",
          },
          {
            id: 2,
            institution: "Pioneer College of Arts and Science",
            degree: "Bachelor of Science",
            field_of_study: "Computer Science",
            start_date: "2022-08-01",
            end_date: "2025-04-30",
            description: "CGPA = 9.0",
            logo: null,
            ordering: 1,
            created_at: "",
            updated_at: "",
          },
        ];

  return (
    <section
      id="education"
      className="relative py-20 sm:py-28 overflow-hidden border-t border-border-light/60 dark:border-border-dark/60 bg-surface-light dark:bg-[#070816] transition-colors"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Pill Badge */}
          <div className="flex items-center justify-center gap-2.5 mb-3.5">
            <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-primary-500/50" />
            <span className="px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/25">
              JOURNEY
            </span>
            <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-primary-500/50" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary-light dark:text-white mb-3">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-500 dark:from-primary-400 dark:via-indigo-400 dark:to-purple-400">
              Education
            </span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary-light dark:text-gray-400 max-w-md mx-auto">
            Academic journey and qualifications
          </p>
        </motion.div>

        {/* Main Content Grid: 3D Illustration on left, Timeline on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 3D Graduation Cap with orbital glowing rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex lg:col-span-4 flex-col items-center justify-center relative select-none"
          >
            <div className="relative w-80 h-80 xl:w-96 xl:h-96 flex items-center justify-center">
              {/* Backlight orb */}
              <div className="absolute inset-8 rounded-full bg-primary-600/25 blur-3xl -z-10" />

              {/* Orbital concentric rings */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-2 rounded-full border border-primary-500/25 rotate-12 scale-105" />
                <div className="absolute inset-8 rounded-full border border-dashed border-primary-500/30 -rotate-12" />
                <div className="absolute inset-16 rounded-full border border-primary-500/15 rotate-45" />

                {/* Glowing planetary dots on the orbits */}
                <span className="absolute top-12 left-10 w-2.5 h-2.5 rounded-full bg-primary-400 shadow-[0_0_10px_rgba(129,140,248,1)] animate-pulse" />
                <span className="absolute bottom-16 right-12 w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.9)]" />
                <span className="absolute top-1/2 left-4 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
              </div>

              {/* 3D Mortarboard Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/education_cap.jpg"
                alt="Education Illustration"
                className="relative z-10 w-full h-full object-contain mix-blend-screen opacity-95 filter drop-shadow-[0_15px_35px_rgba(99,102,241,0.4)] animate-float"
              />
            </div>
          </motion.div>

          {/* Right Column: Timeline & Cards */}
          <div className="lg:col-span-8 w-full">
            <div className="relative pl-6 sm:pl-8">
              {/* Vertical Dashed Timeline Line */}
              <div className="absolute left-[23px] sm:left-[27px] top-6 bottom-6 w-px border-l-2 border-dashed border-primary-500/35" />

              <div className="space-y-6 sm:space-y-8">
                {entries.map((entry, index) => {
                  const { cgpa, extraDesc, degreeType } = parseEducationDetails(entry);

                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: index * 0.12 }}
                      className="relative flex items-start gap-4 sm:gap-6 group"
                    >
                      {/* Timeline Node: Glowing Graduation Cap Badge */}
                      <div className="relative z-10 flex-shrink-0 mt-2">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-surface-card-light dark:bg-[#0a0c1a] border-2 border-primary-500/60 group-hover:border-primary-400 flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_24px_rgba(99,102,241,0.55)] transition-all duration-300">
                          {entry.logo ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={entry.logo}
                              alt={entry.institution}
                              className="w-full h-full rounded-full object-cover p-1"
                            />
                          ) : (
                            <svg
                              className="w-5 h-5 text-primary-500 dark:text-primary-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.75}
                            >
                              <path d="M12 14l9-5-9-5-9 5 9 5z" />
                              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                              />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Content Card with Watermark */}
                      <div className="flex-1 min-w-0">
                        <div className="relative overflow-hidden rounded-2xl bg-white/95 dark:bg-[#0c0f24]/90 border border-border-light dark:border-primary-500/25 hover:border-primary-500/50 p-6 sm:p-7 shadow-lg shadow-black/5 dark:shadow-[0_4px_30px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:shadow-primary-500/10 hover:-translate-y-0.5">
                          {/* University Building Watermark on right */}
                          <div className="absolute right-0 top-0 bottom-0 w-2/5 sm:w-1/2 pointer-events-none overflow-hidden select-none">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/images/university_bg.jpg"
                              alt=""
                              className="w-full h-full object-cover object-right opacity-10 dark:opacity-20 filter grayscale contrast-125 [mask-image:linear-gradient(to_right,transparent,black_75%)]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0c0f24] dark:via-[#0c0f24]/60 dark:to-transparent" />
                          </div>

                          <div className="relative z-10">
                            {/* Top row: Degree title, college name, and degree type badge */}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                              <div className="space-y-1">
                                <h3 className="text-lg sm:text-xl font-bold text-text-primary-light dark:text-white tracking-tight">
                                  {entry.degree}
                                </h3>
                                <p className="text-sm sm:text-base font-semibold text-primary-600 dark:text-primary-400">
                                  {entry.institution}
                                </p>
                                {entry.field_of_study && (
                                  <p className="text-xs sm:text-sm text-text-muted-light dark:text-gray-400">
                                    {entry.field_of_study}
                                  </p>
                                )}
                              </div>

                              {/* Degree Level Pill Badge (e.g. Postgraduate / Undergraduate) */}
                              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-500/10 dark:bg-primary-500/15 text-primary-600 dark:text-primary-300 border border-primary-500/25 dark:border-primary-500/30 self-start whitespace-nowrap shadow-sm">
                                <svg
                                  className="w-3.5 h-3.5 text-primary-500 dark:text-primary-400"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                                </svg>
                                <span>{degreeType}</span>
                              </div>
                            </div>

                            {/* Stats Row: CGPA & Duration */}
                            <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-2">
                              {/* CGPA */}
                              {cgpa && (
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-500/10 dark:bg-primary-500/15 border border-primary-500/20 dark:border-primary-500/30 flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0 shadow-sm">
                                    <svg
                                      className="w-4 h-4 sm:w-5 sm:h-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={1.75}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                                      />
                                    </svg>
                                  </div>
                                  <div>
                                    <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-text-muted-light dark:text-gray-400">
                                      CGPA
                                    </span>
                                    <span className="block text-base sm:text-lg font-bold text-text-primary-light dark:text-white">
                                      {cgpa}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {/* Duration */}
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-500/10 dark:bg-primary-500/15 border border-primary-500/20 dark:border-primary-500/30 flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0 shadow-sm">
                                  <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.75}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-text-muted-light dark:text-gray-400">
                                    Duration
                                  </span>
                                  <span className="block text-xs sm:text-sm font-semibold text-text-secondary-light dark:text-gray-200">
                                    {formatDate(entry.start_date)} —{" "}
                                    {entry.end_date ? formatDate(entry.end_date) : "Present"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Additional description if present */}
                            {extraDesc && (
                              <div className="mt-4 pt-3.5 border-t border-border-light/70 dark:border-primary-500/15">
                                <p className="text-xs sm:text-sm text-text-secondary-light dark:text-gray-300 leading-relaxed font-normal">
                                  {extraDesc}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
