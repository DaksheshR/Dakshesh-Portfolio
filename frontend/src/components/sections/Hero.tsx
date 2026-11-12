/**
 * Hero section — Full-viewport landing with animated gradient text,
 * typing effect, CTA buttons, and smooth scroll indicator.
 */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import type { HeroSection as HeroData } from "@/types";

interface HeroProps {
  data: HeroData | null;
}

const typingTexts = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Tech Innovator",
];

export default function Hero({ data }: HeroProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const currentFullText = data?.subtitle
      ? [data.subtitle, ...typingTexts.slice(1)]
      : typingTexts;
    const text = currentFullText[currentTextIndex % currentFullText.length];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(text.slice(0, displayText.length + 1));
          if (displayText.length === text.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(text.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => prev + 1);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, data?.subtitle]);

  const title = data?.title || "Hi, I'm Dakshesh";
  const tagline =
    data?.tagline ||
    "I craft pixel-perfect, high-performance web applications that deliver exceptional user experiences.";

  // Source resume directly from the public folder (/daksheshResume.pdf)
  const resumeUrl = "/daksheshResume.pdf";

  const handleDownloadResume = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      e.preventDefault();
      const response = await fetch(resumeUrl);
      if (!response.ok) throw new Error("Fetch failed");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "daksheshResume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback if fetch is blocked
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.setAttribute("download", "daksheshResume.pdf");
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/[0.08] rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary-400/[0.06] rounded-full blur-3xl animate-float delay-300" />
        {/* Dot pattern */}
        <div className="absolute inset-0 dot-pattern opacity-60" />
      </div>

      <div className="section-container text-center">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-700/60 bg-black/40 backdrop-blur-md mb-8 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </span>
          <span className="text-xs font-medium text-gray-300">
            Available for opportunities
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          {title.split(" ").map((word, i) =>
            i === title.split(" ").length - 1 ? (
              <span key={i} className="gradient-text">
                {word}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </motion.h1>

        {/* Typing effect subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-8 flex items-center justify-center mb-6"
        >
          <span className="text-base sm:text-lg text-text-muted-light dark:text-text-muted-dark font-mono">
            {"< "}
          </span>
          <span className="text-base sm:text-lg text-primary-600 dark:text-primary-400 font-mono">
            {displayText}
          </span>
          <span className="w-px h-5 bg-primary-500 ml-0.5 animate-pulse" />
          <span className="text-base sm:text-lg text-text-muted-light dark:text-text-muted-dark font-mono">
            {" />"}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-base text-text-secondary-light dark:text-text-secondary-dark max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap"
        >
          <a href="#contact">
            <Button size="lg">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Get In Touch
            </Button>
          </a>

          {/* View Resume in new tab */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              View Resume
            </Button>
          </a>

          {/* Download Resume file */}
          <a
            href={resumeUrl}
            download="daksheshResume.pdf"
            onClick={handleDownloadResume}
          >
            <Button variant="outline" size="lg">
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Resume
            </Button>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-20"
        >
          <a
            href="#about"
            className="inline-flex flex-col items-center text-text-muted-light dark:text-text-muted-dark hover:text-text-secondary-light dark:hover:text-text-secondary-dark transition-colors"
          >
            <svg
              className="w-5 h-5 animate-bounce-slow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
