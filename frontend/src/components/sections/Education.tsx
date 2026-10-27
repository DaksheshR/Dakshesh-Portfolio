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
        <div className="relative max-w-3xl mx-auto">
          {/* Continuous vertical timeline line */}
          <div className="absolute left-4 sm:left-5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary-500 via-border-light dark:via-border-dark to-transparent" />

          <div className="space-y-8 sm:space-y-10">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative flex items-start gap-4 sm:gap-6"
              >
                {/* Timeline Node / Icon badge */}
                <div className="relative z-10 flex-shrink-0 mt-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface-light dark:bg-surface-card-dark border-2 border-primary-500 flex items-center justify-center shadow-sm shadow-primary-500/20">
                    {entry.logo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={entry.logo}
                        alt={entry.institution}
                        className="w-full h-full rounded-full object-cover p-0.5"
                      />
                    ) : (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500"
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

                {/* Content card */}
                <div className="flex-1 min-w-0">
                  <Card hover className="p-6 sm:p-7">
                    {/* Header: Degree, Institution, and Date badge */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-bold text-text-primary-light dark:text-text-primary-dark tracking-tight">
                          {entry.degree}
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-primary-600 dark:text-primary-400">
                          {entry.institution}
                        </p>
                        {entry.field_of_study && (
                          <p className="text-xs sm:text-sm text-text-muted-light dark:text-text-muted-dark">
                            {entry.field_of_study}
                          </p>
                        )}
                      </div>

                      {/* Date pill badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 text-xs font-medium self-start whitespace-nowrap">
                        <svg
                          className="w-3.5 h-3.5"
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
                        <span>
                          {formatDate(entry.start_date)} —{" "}
                          {entry.end_date ? formatDate(entry.end_date) : "Present"}
                        </span>
                      </div>
                    </div>

                    {/* Description / CGPA / Details */}
                    {entry.description && (
                      <div className="pt-3.5 border-t border-border-light/70 dark:border-border-dark/70">
                        <p className="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed whitespace-pre-line font-normal">
                          {entry.description}
                        </p>
                      </div>
                    )}
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
