/**
 * Projects section — Horizontal carousel of modern project cards matching
 * the reference dark portfolio design with live demo, github, tech badges,
 * filter tabs, and an interactive "View More" detail modal.
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types";

interface ProjectsProps {
  data: Project[];
}

// Fallback projects matching the user's reference mockup in case backend has no records yet
const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Weather Forecast Website",
    slug: "weather-forecast-website",
    description:
      "A real-time weather forecasting website providing current weather conditions, interactive forecasts, and meteorological details using third-party weather APIs.\n\nFeatures include:\n• Current temperature, humidity, wind speed and pressure metrics\n• 5-day predictive weather forecasts with hourly breakdowns\n• Geolocation-based weather discovery and worldwide city search\n• Responsive, animated visual widgets for weather conditions",
    short_description:
      "Real-time weather forecasting website providing current weather conditions and forecast information using a third-party weather API.",
    tech_stack: ["HTML", "CSS", "JavaScript", "FastAPI", "OpenWeather"],
    image: null,
    live_url: "https://weather-forecast.example.com",
    github_url: "https://github.com/dakshesh",
    is_featured: true,
    ordering: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    title: "Warehouse Spare Parts Management System",
    slug: "warehouse-spare-parts-management",
    description:
      "A role-based warehouse management system to manage spare parts, inventory, purchases, and issue/return with reports and notifications.\n\nKey capabilities:\n• Role-based access control (Admin, Warehouse Manager, Staff)\n• Real-time stock tracking with low-inventory automated alerts\n• Comprehensive purchase order and supplier management\n• Historical issue/return logging and downloadable audit reports",
    short_description:
      "A role-based warehouse management system to manage spare parts, inventory, purchases, and issue/return with reports and notifications.",
    tech_stack: ["Next.js", "TypeScript", "Django", "PostgreSQL", "JWT"],
    image: null,
    live_url: "https://warehouse.example.com",
    github_url: "https://github.com/dakshesh",
    is_featured: false,
    ordering: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: 3,
    title: "Portfolio Website",
    slug: "portfolio-website",
    description:
      "A personal portfolio to showcase my projects, skills, experience, and achievements with a clean and responsive design.\n\nHighlights:\n• Interactive dark portfolio design with custom neon/glassmorphism aesthetics\n• Dynamic data management driven by Django REST Framework and PostgreSQL\n• Fluid Framer Motion animations and horizontal project carousels\n• Accessible, mobile-first responsive architecture",
    short_description:
      "A personal portfolio to showcase my projects, skills, experience, and achievements with a clean and responsive design.",
    tech_stack: ["Next.js", "Tailwind CSS", "TypeScript"],
    image: null,
    live_url: "https://dakshesh.dev",
    github_url: "https://github.com/dakshesh",
    is_featured: true,
    ordering: 3,
    created_at: "",
    updated_at: "",
  },
];

export default function Projects({ data }: ProjectsProps) {
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeDot, setActiveDot] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Active list from API or fallback
  const projectsList = useMemo(() => {
    return data && data.length > 0 ? data : fallbackProjects;
  }, [data]);

  const featuredCount = useMemo(() => {
    return projectsList.filter((p) => p.is_featured).length;
  }, [projectsList]);

  const filteredProjects = useMemo(() => {
    if (filter === "featured") {
      return projectsList.filter((p) => p.is_featured);
    }
    return projectsList;
  }, [projectsList, filter]);

  // Compute number of pagination dots (up to 5 or matching project count)
  const totalDots = useMemo(() => {
    return Math.min(Math.max(filteredProjects.length, 1), 5);
  }, [filteredProjects]);

  // Check scroll position to update navigation state & active dot
  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setActiveDot(0);
      return;
    }

    const progress = scrollLeft / maxScroll;
    const dotIndex = Math.min(
      totalDots - 1,
      Math.max(0, Math.round(progress * (totalDots - 1)))
    );
    setActiveDot(dotIndex);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [filteredProjects, totalDots]);

  // Scroll by 1 card step
  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  // Click dot to navigate
  const handleDotClick = (dotIndex: number) => {
    const el = scrollContainerRef.current;
    if (!el || totalDots <= 1) return;
    const { scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    const target = (dotIndex / (totalDots - 1)) * maxScroll;
    el.scrollTo({ left: target, behavior: "smooth" });
    setActiveDot(dotIndex);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative border-t border-[#27272a]/60 overflow-hidden py-20 sm:py-24 bg-[#070816]"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="section-container relative z-10">
        {/* Section Pill / Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center w-full mb-8 sm:mb-10"
        >
          {/* Top WORK Pill */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold tracking-widest text-indigo-300 uppercase bg-[#0d122e] border border-indigo-500/30">
              WORK
            </span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>

          {/* Title */}
          <h2 className="section-title text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            My <span className="gradient-text">Projects</span>
          </h2>

          {/* Subtitle */}
          <p className="section-subtitle text-center mx-auto text-sm sm:text-base text-gray-400 mt-2">
            A selection of projects I&apos;ve built and shipped
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2.5 mt-6 sm:mt-8">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                filter === "all"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-[0_0_16px_rgba(99,102,241,0.4)] border border-purple-400/30"
                  : "bg-[#090d21] text-gray-300 hover:text-white border border-[#1b2144] hover:border-gray-600"
              }`}
            >
              All Projects ({projectsList.length})
            </button>

            <button
              onClick={() => setFilter("featured")}
              className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                filter === "featured"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-[0_0_16px_rgba(99,102,241,0.4)] border border-purple-400/30"
                  : "bg-[#090d21] text-gray-300 hover:text-white border border-[#1b2144] hover:border-gray-600"
              }`}
            >
              <span className="text-amber-400">★</span>
              <span>Featured ({featuredCount})</span>
            </button>
          </div>
        </motion.div>

        {/* Dedicated Line Feed Spacer between Filter Pills and Project Cards */}
        <div className="h-8 sm:h-12" aria-hidden="true" />

        {/* Carousel Container with Side Navigation Arrows */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm mb-4">No projects found in this category.</p>
            <button
              onClick={() => setFilter("all")}
              className="px-5 py-2 rounded-full text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors cursor-pointer"
            >
              View All Projects
            </button>
          </div>
        ) : (
          <div className="relative mt-2 sm:mt-4">
            {/* Left Navigation Arrow (shown only when projects overflow 3 cards) */}
            {filteredProjects.length > 3 && (
              <button
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous projects"
                className={`hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center transition-all duration-200 cursor-pointer ${
                  canScrollLeft
                    ? "bg-[#090d21]/95 text-white border border-[#232a52] hover:border-indigo-400 hover:bg-[#12183c] shadow-[0_0_18px_rgba(99,102,241,0.25)]"
                    : "bg-[#070a1a]/60 text-gray-600 border border-gray-800/40 cursor-not-allowed opacity-40"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Right Navigation Arrow (shown only when projects overflow 3 cards) */}
            {filteredProjects.length > 3 && (
              <button
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Next projects"
                className={`hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center transition-all duration-200 cursor-pointer ${
                  canScrollRight
                    ? "bg-[#090d21]/95 text-white border border-[#232a52] hover:border-indigo-400 hover:bg-[#12183c] shadow-[0_0_18px_rgba(99,102,241,0.25)]"
                    : "bg-[#070a1a]/60 text-gray-600 border border-gray-800/40 cursor-not-allowed opacity-40"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Cards Container: dynamically centers 1, 2, or 3 projects; horizontally scrolls when 4+ */}
            <div
              ref={scrollContainerRef}
              className={`flex gap-5 sm:gap-6 pb-4 pt-2 px-1 ${
                filteredProjects.length === 1
                  ? "justify-center"
                  : filteredProjects.length === 2
                  ? "justify-start sm:justify-center overflow-x-auto sm:overflow-visible snap-x sm:snap-none"
                  : filteredProjects.length === 3
                  ? "justify-start lg:justify-center overflow-x-auto lg:overflow-visible snap-x lg:snap-none"
                  : "justify-start overflow-x-auto snap-x snap-mandatory scroll-smooth"
              } [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
            >
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id || idx}
                  className={`flex-shrink-0 flex flex-col items-center ${
                    filteredProjects.length === 1
                      ? "w-full max-w-[380px]"
                      : filteredProjects.length === 2
                      ? "w-[85vw] sm:w-[calc(50%-12px)] lg:w-[380px] max-w-[380px] snap-start"
                      : "w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[380px] snap-start"
                  }`}
                >
                  <ProjectCard
                    project={project}
                    onViewMore={() => setSelectedProject(project)}
                  />
                </div>
              ))}
            </div>

            {/* Bottom Pagination Dots (shown only when projects overflow 3 cards) */}
            {filteredProjects.length > 3 && totalDots > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: totalDots }).map((_, dotIdx) => {
                  const isActive = dotIdx === activeDot;
                  return (
                    <button
                      key={dotIdx}
                      onClick={() => handleDotClick(dotIdx)}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                      className={`transition-all duration-300 cursor-pointer rounded-full ${
                        isActive
                          ? "w-6 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.7)]"
                          : "w-2 h-2 bg-gray-700/60 hover:bg-gray-500"
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Detail Modal ("View More") */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/**
 * Single Project Card strictly adhering to the percentage breakdown:
 * - Square shape with curved corners (aspect-square / 1:1 ratio)
 * - Project Image / Preview:    40%
 * - Project Title:               8%
 * - Short Description:          17%
 * - Technology Stack:           15%
 * - Live Demo + GitHub Buttons: 12%
 * - Internal spacing / padding:  8% (2% top + 2% bottom padding + 4 x 1% row gaps)
 * - Total:                     100%
 */
function ProjectCard({
  project,
  onViewMore,
}: {
  project: Project;
  onViewMore: () => void;
}) {
  const visibleTech = project.tech_stack?.slice(0, 4) || [];
  const extraCount = (project.tech_stack?.length || 0) - visibleTech.length;

  // Display the uploaded backend image URL directly
  const displayImage = project.image || null;

  return (
    <div
      onClick={onViewMore}
      className="group relative flex flex-col w-full aspect-square max-w-[380px] sm:max-w-[390px] bg-[#080c24] hover:bg-[#0c1230] border border-[#1b224c] hover:border-indigo-500/70 rounded-[22px] sm:rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(99,102,241,0.22)] cursor-pointer select-none overflow-hidden"
      style={{
        aspectRatio: "1 / 1",
        paddingTop: "2%",
        paddingBottom: "2%",
        paddingLeft: "4%",
        paddingRight: "4%",
        rowGap: "1%",
      }}
    >
      {/* 1. Project Image / Preview (40%) */}
      <div
        style={{ height: "40%" }}
        className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#060816] border border-[#18204c] flex-shrink-0"
      >
        {/* Overlaid Featured Badge (Top-Left) */}
        {project.is_featured && (
          <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold text-indigo-200 bg-[#0c1236]/85 backdrop-blur-md border border-indigo-500/40 shadow-sm">
            <span className="text-amber-400 text-xs">★</span>
            <span>Featured Project</span>
          </span>
        )}

        {/* Overlaid External Icon Link (Top-Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewMore();
          }}
          aria-label="Open project details"
          className="absolute top-2 right-2 z-10 w-6 h-6 rounded-lg bg-[#0c1236]/80 backdrop-blur-md border border-[#232b5d] hover:border-indigo-400 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>

        {/* Thumbnail Image */}
        {displayImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={displayImage}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Clean stylish fallback mockup illustration */
          <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-b from-[#0b0f2a] to-[#050713]">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-1 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-[11px] font-mono text-gray-400 truncate max-w-[85%]">
              {project.title}
            </span>
          </div>
        )}
      </div>

      {/* 2. Project Title (8%) */}
      <div
        style={{ height: "8%" }}
        className="w-full flex items-center flex-shrink-0"
      >
        <h3 className="text-[14px] sm:text-[15px] font-bold text-white leading-tight group-hover:text-indigo-300 transition-colors truncate w-full">
          {project.title}
        </h3>
      </div>

      {/* 3. Short Description (17%) */}
      <div
        style={{ height: "17%" }}
        className="w-full flex items-center flex-shrink-0 overflow-hidden"
      >
        <p className="text-[11px] sm:text-[11.5px] text-gray-400 leading-snug line-clamp-2 sm:line-clamp-3 font-normal">
          {project.short_description || project.description}
        </p>
      </div>

      {/* 4. Technology Stack (15%) */}
      <div
        style={{ height: "15%" }}
        className="w-full flex items-center flex-shrink-0 overflow-hidden"
      >
        <div className="flex flex-wrap items-center gap-1.5 w-full">
          {visibleTech.map((tech, i) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium text-gray-200 bg-[#0e1435] border border-[#232c66]"
            >
              {i === 0 && (
                <svg
                  className="w-3 h-3 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              )}
              {tech}
            </span>
          ))}

          {extraCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium text-indigo-300 bg-[#141b44] border border-indigo-500/40">
              +{extraCount}
            </span>
          )}
        </div>
      </div>

      {/* 5. Live Demo + GitHub Buttons (12%) */}
      <div
        style={{ height: "12%" }}
        className="w-full flex items-center gap-2 flex-shrink-0"
      >
        {project.live_url ? (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 h-full max-h-[36px] sm:max-h-[38px] inline-flex items-center justify-center gap-1.5 px-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 shadow-[0_0_12px_rgba(99,102,241,0.3)] transition-all duration-200"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>Live Demo</span>
            <svg
              className="w-3 h-3 opacity-80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        ) : (
          <button
            onClick={onViewMore}
            className="flex-1 h-full max-h-[36px] sm:max-h-[38px] inline-flex items-center justify-center gap-1.5 px-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 shadow-[0_0_12px_rgba(99,102,241,0.3)] transition-all duration-200 cursor-pointer"
          >
            <span>View Details</span>
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 h-full max-h-[36px] sm:max-h-[38px] inline-flex items-center justify-center gap-1.5 px-3 rounded-xl text-xs font-semibold text-gray-200 hover:text-white bg-[#0c1028] hover:bg-[#141a42] border border-[#222a56] hover:border-gray-500 transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
            </svg>
            <span>GitHub</span>
            <svg
              className="w-3 h-3 opacity-80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * Detailed Modal opened when someone clicks onto a project card to read full description.
 * Applies uniform equal spacing across all 4 sides (top, bottom, left, right)
 * so content and action buttons never touch or get clipped by the curved borders.
 */
function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#090d26] border border-[#232a5a] rounded-2xl sm:rounded-3xl max-h-[85vh] overflow-y-auto shadow-[0_0_50px_rgba(99,102,241,0.25)] custom-scrollbar"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#111738] hover:bg-[#1a2356] border border-[#232a52] text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-20 shadow-md"
        >
          ✕
        </button>

        {/* Inner Content Container: Identical, generous spacing on left, right, top, bottom */}
        <div
          style={{ padding: "clamp(24px, 4vw, 36px)" }}
          className="flex flex-col gap-5 sm:gap-6"
        >
          {/* Featured Badge if applicable */}
          {project.is_featured && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-500/40 w-fit">
              <span className="text-amber-400">★</span>
              <span>Featured Project</span>
            </span>
          )}

          {/* Title & Short Description with clearance from close button */}
          <div className="pr-8 sm:pr-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
              {project.title}
            </h3>
            {project.short_description && (
              <p className="text-xs sm:text-sm text-indigo-300/90 font-medium leading-relaxed">
                {project.short_description}
              </p>
            )}
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech_stack?.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-gray-200 bg-[#0d122f] border border-[#252e64]"
              >
                <span className="text-indigo-400">#</span>
                {tech}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-gray-800 via-gray-700 to-transparent" />

          {/* Full Detailed Description (preserves line feeds, spacing, bullet points) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
              About the Project
            </h4>
            <div className="text-sm sm:text-[15px] text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
              {project.description}
            </div>
          </div>

          {/* Modal Action Buttons: spaced away from bottom and left borders so buttons never clip on corners */}
          <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-[#1d244f]">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 shadow-[0_0_16px_rgba(99,102,241,0.4)] transition-all"
              >
                <span>View Live Demo</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-gray-200 hover:text-white bg-[#0c1024] hover:bg-[#141b42] border border-[#232a52] transition-all"
              >
                <span>View Source Code</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}

            <button
              onClick={onClose}
              className="ml-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/60 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
