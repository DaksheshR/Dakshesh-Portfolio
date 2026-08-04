/**
 * Education section — Vertical timeline layout with institution details.
 */

"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { formatDate } from "@/utils/helpers";
import type { Education as EducationData } from "@/types";

interface EducationProps {
  data: EducationData[];
}

export default function Education({ data }: EducationProps) {
  const entries =
    data.length > 0
      ? data
      : [
          {
            id: 1,
            institution: "University of Technology",
            degree: "Bachelor of Technology",
            field_of_study: "Computer Science & Engineering",
            start_date: "2020-08-01",
            end_date: "2024-06-01",
            description:
              "Graduated with honors. Key coursework: Data Structures, Algorithms, Web Development, Database Management Systems, Software Engineering.",
            logo: null,
            ordering: 0,
            created_at: "",
            updated_at: "",
          },
          {
            id: 2,
            institution: "Higher Secondary School",
            degree: "Higher Secondary Certificate",
            field_of_study: "Science (PCM)",
            start_date: "2018-06-01",
            end_date: "2020-05-01",
            description:
              "Completed with distinction. Active participant in science olympiads and coding competitions.",
            logo: null,
            ordering: 1,
            created_at: "",
            updated_at: "",
          },
        ];

  return (
    <section id="education" className="relative border-t border-border-light dark:border-border-dark">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            My <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subtitle">
            Academic journey and qualifications
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border-light dark:bg-border-dark" />

          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative flex items-start gap-6 mb-10 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary-500 border-[3px] border-surface-light dark:border-surface-dark z-10 mt-2" />

              {/* Spacer for layout */}
              <div className="hidden md:block md:w-1/2" />

              {/* Content card */}
              <div className="ml-10 md:ml-0 md:w-1/2 md:px-6">
                <Card hover>
                  {/* Date range */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <svg
                      className="w-3.5 h-3.5 text-text-muted-light dark:text-text-muted-dark"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-[11px] font-medium text-text-muted-light dark:text-text-muted-dark tabular-nums">
                      {formatDate(entry.start_date)} —{" "}
                      {entry.end_date ? formatDate(entry.end_date) : "Present"}
                    </span>
                  </div>

                  {/* Institution info */}
                  <div className="flex items-start gap-3 mb-3">
                    {entry.logo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={entry.logo}
                        alt={entry.institution}
                        className="w-9 h-9 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-primary-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          />
                        </svg>
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
                        {entry.degree}
                      </h3>
                      <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                        {entry.institution}
                      </p>
                      <p className="text-[11px] text-text-muted-light dark:text-text-muted-dark">
                        {entry.field_of_study}
                      </p>
                    </div>
                  </div>

                  {entry.description && (
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                      {entry.description}
                    </p>
                  )}
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
