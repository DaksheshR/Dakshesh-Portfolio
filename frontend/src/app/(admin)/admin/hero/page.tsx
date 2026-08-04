/**
 * Admin — Hero section management page.
 */

"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { portfolioService, adminService } from "@/services/portfolio.service";
import type { HeroSection } from "@/types";

export default function AdminHeroPage() {
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    tagline: "",
    resume_url: "",
    github_url: "",
    linkedin_url: "",
    twitter_url: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await portfolioService.getHero();
        if (data) {
          setHero(data);
          setForm({
            title: data.title,
            subtitle: data.subtitle,
            tagline: data.tagline,
            resume_url: data.resume_url,
            github_url: data.github_url,
            linkedin_url: data.linkedin_url,
            twitter_url: data.twitter_url,
          });
        }
      } catch { /* empty */ }
      setIsLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");
    try {
      if (hero) {
        const updated = await adminService.updateHero(hero.id, form);
        setHero(updated);
      } else {
        const created = await adminService.createHero(form);
        setHero(created);
      }
      setMessage("Hero section saved successfully!");
    } catch {
      setMessage("Failed to save. Please try again.");
    }
    setIsSaving(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isLoading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-12 w-full" />)}</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark tracking-tight">
          Hero Section
        </h1>
        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-0.5">
          Manage your landing page content
        </p>
      </div>

      <Card className="max-w-2xl">
        <div className="space-y-4">
          <Input id="hero-title" label="Title" name="title" value={form.title} onChange={handleChange} placeholder="Hi, I'm Dakshesh" />
          <Input id="hero-subtitle" label="Subtitle" name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Full Stack Developer" />
          <Input id="hero-tagline" label="Tagline" name="tagline" multiline value={form.tagline} onChange={handleChange} placeholder="A brief tagline about yourself..." />
          <Input id="hero-resume" label="Resume URL" name="resume_url" value={form.resume_url} onChange={handleChange} placeholder="https://..." />
          <Input id="hero-github" label="GitHub URL" name="github_url" value={form.github_url} onChange={handleChange} placeholder="https://github.com/..." />
          <Input id="hero-linkedin" label="LinkedIn URL" name="linkedin_url" value={form.linkedin_url} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
          <Input id="hero-twitter" label="Twitter/X URL" name="twitter_url" value={form.twitter_url} onChange={handleChange} placeholder="https://x.com/..." />

          {message && (
            <p className={`text-xs font-medium ${message.includes("success") ? "text-emerald-500" : "text-red-500"}`}>
              {message}
            </p>
          )}

          <Button onClick={handleSave} isLoading={isSaving} size="lg">
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}
