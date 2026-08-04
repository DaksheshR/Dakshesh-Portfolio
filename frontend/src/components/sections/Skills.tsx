/**
 * Skills section — Grouped skill bars with animated proficiency levels.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import type { Skill, SkillCategory } from "@/types";

interface SkillsProps {
  data: Skill[];
}

const categoryConfig: Record<
  SkillCategory,
  { label: string; color: string; icon: string }
> = {
  frontend: { label: "Frontend", color: "from-blue-500 to-cyan-500", icon: "🎨" },
  backend: { label: "Backend", color: "from-emerald-500 to-teal-500", icon: "⚙️" },
  database: { label: "Database", color: "from-amber-500 to-orange-500", icon: "🗄️" },
  devops: { label: "DevOps", color: "from-purple-500 to-violet-500", icon: "🚀" },
  tools: { label: "Tools", color: "from-rose-500 to-pink-500", icon: "🛠️" },
  other: { label: "Other", color: "from-gray-500 to-slate-500", icon: "💡" },
};

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setTimeout(() => setWidth(skill.proficiency), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [skill.proficiency, delay]);

  const config = categoryConfig[skill.category] || categoryConfig.other;

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {skill.icon && (
            <span className="text-sm">{skill.icon}</span>
          )}
          <span className="font-medium text-text-primary-light dark:text-text-primary-dark text-[13px]">
            {skill.name}
          </span>
        </div>
        <span className="text-[11px] font-semibold text-text-muted-light dark:text-text-muted-dark tabular-nums">
          {skill.proficiency}%
        </span>
      </div>
      <div className="h-1.5 bg-surface-muted-light dark:bg-surface-elevated-dark rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${config.color} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills({ data }: SkillsProps) {
  // Group skills by category
  const grouped = data.reduce(
    (acc, skill) => {
      const cat = skill.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    },
    {} as Record<SkillCategory, Skill[]>
  );

  // Fallback data if empty
  const hasData = data.length > 0;
  const displayGroups = hasData
    ? grouped
    : ({
        frontend: [
          { id: 1, name: "React / Next.js", category: "frontend", proficiency: 90, icon: "", ordering: 0, category_display: "Frontend", created_at: "", updated_at: "" },
          { id: 2, name: "TypeScript", category: "frontend", proficiency: 85, icon: "", ordering: 1, category_display: "Frontend", created_at: "", updated_at: "" },
          { id: 3, name: "Tailwind CSS", category: "frontend", proficiency: 92, icon: "", ordering: 2, category_display: "Frontend", created_at: "", updated_at: "" },
        ],
        backend: [
          { id: 4, name: "Python / Django", category: "backend", proficiency: 88, icon: "", ordering: 0, category_display: "Backend", created_at: "", updated_at: "" },
          { id: 5, name: "Node.js", category: "backend", proficiency: 80, icon: "", ordering: 1, category_display: "Backend", created_at: "", updated_at: "" },
          { id: 6, name: "REST APIs", category: "backend", proficiency: 90, icon: "", ordering: 2, category_display: "Backend", created_at: "", updated_at: "" },
        ],
        database: [
          { id: 7, name: "PostgreSQL", category: "database", proficiency: 82, icon: "", ordering: 0, category_display: "Database", created_at: "", updated_at: "" },
          { id: 8, name: "MongoDB", category: "database", proficiency: 75, icon: "", ordering: 1, category_display: "Database", created_at: "", updated_at: "" },
        ],
        tools: [
          { id: 9, name: "Git & GitHub", category: "tools", proficiency: 90, icon: "", ordering: 0, category_display: "Tools", created_at: "", updated_at: "" },
          { id: 10, name: "Docker", category: "tools", proficiency: 70, icon: "", ordering: 1, category_display: "Tools", created_at: "", updated_at: "" },
        ],
      } as Record<SkillCategory, Skill[]>);

  return (
    <section id="skills" className="relative border-t border-border-light dark:border-border-dark">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {(Object.entries(displayGroups) as [SkillCategory, Skill[]][]).map(
            ([category, skills], groupIndex) => {
              const config = categoryConfig[category] || categoryConfig.other;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: groupIndex * 0.1 }}
                >
                  <Card hover>
                    <div className="flex items-center gap-2.5 mb-5">
                      <span className="text-lg">{config.icon}</span>
                      <Badge variant="primary" size="md">
                        {config.label}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      {skills.map((skill, i) => (
                        <SkillBar
                          key={skill.id}
                          skill={skill}
                          delay={300 + i * 150}
                        />
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
