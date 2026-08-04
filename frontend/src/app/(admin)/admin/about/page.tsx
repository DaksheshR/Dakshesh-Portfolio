/**
 * Admin — About section management page.
 */

"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { portfolioService, adminService } from "@/services/portfolio.service";
import type { AboutSection } from "@/types";

export default function AdminAboutPage() {
  const [about, setAbout] = useState<AboutSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    description: "",
    years_experience: 0,
    projects_completed: 0,
    happy_clients: 0,
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await portfolioService.getAbout();
        if (data) {
          setAbout(data);
          setForm({
            description: data.description,
            years_experience: data.years_experience,
            projects_completed: data.projects_completed,
            happy_clients: data.happy_clients,
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
      if (about) {
        const updated = await adminService.updateAbout(about.id, form);
        setAbout(updated);
      } else {
        const created = await adminService.createAbout(form);
        setAbout(created);
      }
      setMessage("About section saved successfully!");
    } catch {
      setMessage("Failed to save. Please try again.");
    }
    setIsSaving(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  if (isLoading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-12 w-full" />)}</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark tracking-tight">
          About Section
        </h1>
        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-0.5">
          Manage your bio and statistics
        </p>
      </div>

      <Card className="max-w-2xl">
        <div className="space-y-4">
          <Input id="about-description" label="Bio / Description" name="description" multiline value={form.description} onChange={handleChange} placeholder="Write about yourself..." />

          <div className="grid grid-cols-3 gap-4">
            <Input id="about-years" label="Years Experience" name="years_experience" type="number" value={String(form.years_experience)} onChange={handleChange} />
            <Input id="about-projects" label="Projects Completed" name="projects_completed" type="number" value={String(form.projects_completed)} onChange={handleChange} />
            <Input id="about-clients" label="Happy Clients" name="happy_clients" type="number" value={String(form.happy_clients)} onChange={handleChange} />
          </div>

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
