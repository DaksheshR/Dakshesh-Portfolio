/**
 * Projects section — Filterable project cards with hover overlays,
 * tech stack badges, and featured project highlighting.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Project } from "@/types";

interface ProjectsProps {
  data: Project[];
}

export default function Projects({ data }: ProjectsProps) {
  const [filter, setFilter] = useState<"all" | "featured">("all");

  // Fallback data
  const projects =
    data.length > 0
      ? data
      : [
          {
            id: 1,
            title: "E-Commerce Platform",
            slug: "ecommerce-platform",
            description:
              "A full-featured e-commerce platform built with Next.js and Django REST Framework, featuring real-time inventory management and Stripe payments.",
            short_description:
              "Full-stack e-commerce with real-time inventory & payments",
            tech_stack: ["Next.js", "Django", "PostgreSQL", "Stripe", "Redis"],
            image: null,
            live_url: "",
            github_url: "",
            is_featured: true,
            ordering: 0,
            created_at: "",
            updated_at: "",
          },
          {
            id: 2,
            title: "Task Management App",
            slug: "task-management",
            description:
              "A collaborative task management application with real-time updates, drag-and-drop boards, and team workspaces.",
            short_description:
              "Real-time collaborative task boards with drag-and-drop",
            tech_stack: ["React", "Node.js", "Socket.io", "MongoDB"],
            image: null,
            live_url: "",
            github_url: "",
            is_featured: true,
            ordering: 1,
            created_at: "",
            updated_at: "",
          },
          {
            id: 3,
            title: "Weather Dashboard",
            slug: "weather-dashboard",
            description:
              "A beautiful weather dashboard with location-based forecasts, interactive maps, and weather alerts.",
            short_description: "Location-based weather forecasts with interactive maps",
            tech_stack: ["Vue.js", "Python", "OpenWeather API"],
            image: null,
            live_url: "",
            github_url: "",
            is_featured: false,
            ordering: 2,
            created_at: "",
            updated_at: "",
          },
        ];

  const filteredProjects =
    filter === "featured"
      ? projects.filter((p) => p.is_featured)
      : projects;

  return (
    <section id="projects" className="relative border-t border-border-light dark:border-border-dark">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A selection of projects I&apos;ve built and shipped
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center gap-2 mb-10"
        >
          {(["all", "featured"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                filter === f
                  ? "bg-text-primary-light dark:bg-text-primary-dark text-surface-light dark:text-surface-dark"
                  : "text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark border border-border-light dark:border-border-dark hover:border-border-hover-light dark:hover:border-border-hover-dark"
              }`}
            >
              {f === "all" ? "All Projects" : "⭐ Featured"}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  hover
                  padding="none"
                  className="group overflow-hidden h-full"
                >
                  {/* Project Image / Placeholder */}
                  <div className="relative h-48 bg-surface-muted-light dark:bg-surface-elevated-dark overflow-hidden">
                    {project.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center dot-pattern">
                        <svg
                          className="w-12 h-12 text-text-muted-light dark:text-text-muted-dark"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={0.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex gap-2">
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="sm" variant="primary">
                              Live Demo
                            </Button>
                          </a>
                        )}
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="sm" variant="secondary">
                              Source
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Featured badge */}
                    {project.is_featured && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="accent" size="sm">
                          ⭐ Featured
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-1.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-4 leading-relaxed line-clamp-2">
                      {project.short_description || project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1">
                      {project.tech_stack.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" size="sm">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech_stack.length > 4 && (
                        <Badge variant="outline" size="sm">
                          +{project.tech_stack.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
