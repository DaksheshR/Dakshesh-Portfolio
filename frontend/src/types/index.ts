/**
 * TypeScript type definitions for the portfolio application.
 *
 * These interfaces mirror the Django model serializers to ensure
 * type safety across the frontend-backend boundary.
 */

// ─── User & Auth ────────────────────────────────────────────────────────────

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  date_joined: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  detail: string;
  user: User;
}

// ─── Portfolio Models ───────────────────────────────────────────────────────

export interface HeroSection {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  profile_image: string | null;
  resume_url: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  created_at: string;
  updated_at: string;
}

export interface AboutSection {
  id: number;
  description: string;
  image: string | null;
  years_experience: number;
  projects_completed: number;
  happy_clients: number;
  created_at: string;
  updated_at: string;
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "tools"
  | "other"
  | "languages"
  | "programming_languages";

export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  category_display: string;
  proficiency: number;
  icon: string;
  ordering: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  tech_stack: string[];
  image: string | null;
  live_url: string;
  github_url: string;
  is_featured: boolean;
  ordering: number;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  description: string;
  logo: string | null;
  ordering: number;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── API Response Types ─────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiError {
  detail?: string;
  [key: string]: unknown;
}
