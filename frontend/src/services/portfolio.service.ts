/**
 * Portfolio API service — provides typed functions to fetch and manage
 * all portfolio content from the Django REST API.
 */

import api from "@/lib/axios";
import type {
  AboutSection,
  ContactFormData,
  ContactMessage,
  Education,
  HeroSection,
  PaginatedResponse,
  Project,
  Skill,
} from "@/types";

// ─── Public Endpoints (no auth required) ────────────────────────────────────

export const portfolioService = {
  // Hero
  async getHero(): Promise<HeroSection | null> {
    const { data } = await api.get<HeroSection[]>("/portfolio/hero/");
    return data.length > 0 ? data[0] : null;
  },

  // About
  async getAbout(): Promise<AboutSection | null> {
    const { data } = await api.get<AboutSection[]>("/portfolio/about/");
    return data.length > 0 ? data[0] : null;
  },

  // Skills
  async getSkills(category?: string): Promise<Skill[]> {
    const params = category ? { category } : {};
    const { data } = await api.get<Skill[]>("/portfolio/skills/", { params });
    return data;
  },

  // Projects
  async getProjects(featured?: boolean): Promise<PaginatedResponse<Project>> {
    const params: Record<string, string> = {};
    if (featured !== undefined) params.featured = String(featured);
    const { data } = await api.get<PaginatedResponse<Project>>(
      "/portfolio/projects/",
      { params }
    );
    return data;
  },

  // Education
  async getEducation(): Promise<Education[]> {
    const { data } = await api.get<Education[]>("/portfolio/education/");
    return data;
  },

  // Contact form (public POST)
  async submitContact(formData: ContactFormData): Promise<ContactMessage> {
    const { data } = await api.post<ContactMessage>(
      "/portfolio/contact/",
      formData
    );
    return data;
  },
};

// ─── Admin Endpoints (JWT auth required) ────────────────────────────────────

export const adminService = {
  // Hero
  async updateHero(
    id: number,
    data: Partial<HeroSection>
  ): Promise<HeroSection> {
    const { data: result } = await api.patch<HeroSection>(
      `/portfolio/hero/${id}/`,
      data
    );
    return result;
  },

  async createHero(data: Partial<HeroSection>): Promise<HeroSection> {
    const { data: result } = await api.post<HeroSection>(
      "/portfolio/hero/",
      data
    );
    return result;
  },

  // About
  async updateAbout(
    id: number,
    data: Partial<AboutSection>
  ): Promise<AboutSection> {
    const { data: result } = await api.patch<AboutSection>(
      `/portfolio/about/${id}/`,
      data
    );
    return result;
  },

  async createAbout(data: Partial<AboutSection>): Promise<AboutSection> {
    const { data: result } = await api.post<AboutSection>(
      "/portfolio/about/",
      data
    );
    return result;
  },

  // Skills
  async createSkill(data: Partial<Skill>): Promise<Skill> {
    const { data: result } = await api.post<Skill>(
      "/portfolio/skills/",
      data
    );
    return result;
  },

  async updateSkill(id: number, data: Partial<Skill>): Promise<Skill> {
    const { data: result } = await api.patch<Skill>(
      `/portfolio/skills/${id}/`,
      data
    );
    return result;
  },

  async deleteSkill(id: number): Promise<void> {
    await api.delete(`/portfolio/skills/${id}/`);
  },

  // Projects
  async createProject(data: Partial<Project>): Promise<Project> {
    const { data: result } = await api.post<Project>(
      "/portfolio/projects/",
      data
    );
    return result;
  },

  async updateProject(
    slug: string,
    data: Partial<Project>
  ): Promise<Project> {
    const { data: result } = await api.patch<Project>(
      `/portfolio/projects/${slug}/`,
      data
    );
    return result;
  },

  async deleteProject(slug: string): Promise<void> {
    await api.delete(`/portfolio/projects/${slug}/`);
  },

  // Education
  async createEducation(data: Partial<Education>): Promise<Education> {
    const { data: result } = await api.post<Education>(
      "/portfolio/education/",
      data
    );
    return result;
  },

  async updateEducation(
    id: number,
    data: Partial<Education>
  ): Promise<Education> {
    const { data: result } = await api.patch<Education>(
      `/portfolio/education/${id}/`,
      data
    );
    return result;
  },

  async deleteEducation(id: number): Promise<void> {
    await api.delete(`/portfolio/education/${id}/`);
  },

  // Contact Messages (admin read)
  async getMessages(): Promise<ContactMessage[]> {
    const { data } = await api.get<ContactMessage[]>("/portfolio/contact/");
    return data;
  },

  async markMessageRead(id: number): Promise<ContactMessage> {
    const { data } = await api.patch<ContactMessage>(
      `/portfolio/contact/${id}/mark_read/`
    );
    return data;
  },

  async deleteMessage(id: number): Promise<void> {
    await api.delete(`/portfolio/contact/${id}/`);
  },
};
