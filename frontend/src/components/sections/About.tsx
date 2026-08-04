/**
 * About section — Split layout with image/stats and bio text,
 * with animated counters for stats.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { AboutSection as AboutData } from "@/types";

interface AboutProps {
  data: AboutData | null;
}

function AnimatedCounter({ end, label }: { end: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const stepTime = Math.abs(Math.floor(duration / end));

          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) {
              clearInterval(timer);
              setCount(end);
            }
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark tracking-tight">
        {count}<span className="text-primary-500">+</span>
      </div>
      <div className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1 font-medium">
        {label}
      </div>
    </div>
  );
}

export default function About({ data }: AboutProps) {
  const description =
    data?.description ||
    "I'm a passionate full-stack developer with a keen eye for detail and a drive to create seamless digital experiences. I specialize in building modern web applications using cutting-edge technologies.\n\nWith a strong foundation in both frontend and backend development, I bring ideas to life through clean code, intuitive interfaces, and robust architectures. I'm always eager to learn new technologies and take on challenging projects.";

  const stats = [
    { value: data?.years_experience || 3, label: "Years Experience" },
    { value: data?.projects_completed || 15, label: "Projects Completed" },
    { value: data?.happy_clients || 10, label: "Happy Clients" },
  ];

  return (
    <section id="about" className="relative border-t border-border-light dark:border-border-dark">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden aspect-square bg-surface-muted-light dark:bg-surface-elevated-dark border border-border-light dark:border-border-dark flex items-center justify-center">
                {data?.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={data.image}
                    alt="About Dakshesh"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* Placeholder illustration */
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-primary-500/10 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-primary-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark font-medium">
                      Creative Developer
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Bio + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-4">
              {description.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-text-secondary-light dark:text-text-secondary-dark leading-[1.8] text-[15px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 p-6 rounded-xl border border-border-light dark:border-border-dark bg-surface-muted-light dark:bg-surface-elevated-dark">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <AnimatedCounter
                    key={stat.label}
                    end={stat.value}
                    label={stat.label}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
