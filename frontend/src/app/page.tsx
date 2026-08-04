/**
 * Homepage — Assembles all portfolio sections.
 *
 * This is a Server Component that fetches data from the Django API
 * and passes it to client-side section components.
 */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import type {
  HeroSection,
  AboutSection,
  Skill,
  Project,
  Education as EducationType,
  PaginatedResponse,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Fetch data from the API with graceful error handling.
 * Returns null/empty array if the API is unreachable.
 */
async function fetchData<T>(
  endpoint: string,
  fallback: T
): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds (ISR)
    });
    if (!res.ok) return fallback;
    return res.json();
  } catch {
    // API unreachable — return fallback so the site still renders
    return fallback;
  }
}

export default async function HomePage() {
  // Fetch all portfolio data in parallel
  const [heroData, aboutData, skillsData, projectsData, educationData] =
    await Promise.all([
      fetchData<HeroSection[]>("/portfolio/hero/", []),
      fetchData<AboutSection[]>("/portfolio/about/", []),
      fetchData<Skill[]>("/portfolio/skills/", []),
      fetchData<PaginatedResponse<Project>>("/portfolio/projects/", {
        count: 0,
        next: null,
        previous: null,
        results: [],
      }),
      fetchData<EducationType[]>("/portfolio/education/", []),
    ]);

  const hero = heroData.length > 0 ? heroData[0] : null;
  const about = aboutData.length > 0 ? aboutData[0] : null;
  const projects = projectsData.results;

  return (
    <>
      <Navbar />
      <main>
        <Hero data={hero} />
        <About data={about} />
        <Skills data={skillsData} />
        <Projects data={projects} />
        <Education data={educationData} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
