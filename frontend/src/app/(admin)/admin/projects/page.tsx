/**
 * Admin — Projects management page with CRUD operations.
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import { portfolioService, adminService } from "@/services/portfolio.service";
import type { Project } from "@/types";

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  short_description: "",
  tech_stack: "" as string, // comma-separated input
  image: "",
  live_url: "",
  github_url: "",
  is_featured: false,
  ordering: 0,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);

  const loadProjects = useCallback(async () => {
    try {
      const data = await portfolioService.getProjects();
      setProjects(data.results);
    } catch { /* empty */ }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const openCreate = () => {
    setEditingProject(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      slug: project.slug,
      description: project.description,
      short_description: project.short_description,
      tech_stack: project.tech_stack.join(", "),
      image: project.image || "",
      live_url: project.live_url,
      github_url: project.github_url,
      is_featured: project.is_featured,
      ordering: project.ordering,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const payload = {
      ...form,
      tech_stack: form.tech_stack.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editingProject) {
        await adminService.updateProject(editingProject.slug, payload);
      } else {
        await adminService.createProject(payload);
      }
      setIsModalOpen(false);
      loadProjects();
    } catch { /* empty */ }
    setIsSaving(false);
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Delete project "${project.title}"?`)) return;
    try {
      await adminService.deleteProject(project.slug);
      loadProjects();
    } catch { /* empty */ }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: !editingProject
        ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
        : prev.slug,
    }));
  };

  const columns = [
    {
      key: "image",
      label: "Preview",
      render: (p: Project) =>
        p.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={p.image} alt={p.title} className="w-10 h-7 object-cover rounded border border-gray-700" />
        ) : (
          <span className="text-text-muted-light dark:text-text-muted-dark text-xs">—</span>
        ),
    },
    { key: "title", label: "Title" },
    {
      key: "is_featured",
      label: "Featured",
      render: (p: Project) =>
        p.is_featured ? <Badge variant="accent">⭐ Featured</Badge> : <span className="text-text-muted-light dark:text-text-muted-dark">—</span>,
    },
    {
      key: "tech_stack",
      label: "Tech Stack",
      render: (p: Project) => (
        <div className="flex flex-wrap gap-1">
          {p.tech_stack.slice(0, 3).map((t) => (
            <Badge key={t} variant="secondary" size="sm">{t}</Badge>
          ))}
          {p.tech_stack.length > 3 && <Badge variant="outline" size="sm">+{p.tech_stack.length - 3}</Badge>}
        </div>
      ),
    },
    { key: "ordering", label: "Order" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark tracking-tight">
            Projects
          </h1>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-0.5">
            Manage your portfolio projects
          </p>
        </div>
        <Button onClick={openCreate}>+ Add Project</Button>
      </div>

      <DataTable columns={columns} data={projects} onEdit={openEdit} onDelete={handleDelete} isLoading={isLoading} emptyMessage="No projects added yet" />

      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProject ? "Edit Project" : "Add Project"} onSubmit={handleSave} isLoading={isSaving}>
        <Input id="project-title" label="Title" name="title" value={form.title} onChange={handleTitleChange} placeholder="My Awesome Project" />
        <Input id="project-slug" label="Slug" name="slug" value={form.slug} onChange={handleChange} placeholder="my-awesome-project" />
        <Input id="project-short-desc" label="Short Description" name="short_description" value={form.short_description} onChange={handleChange} placeholder="One-liner description" />
        <Input id="project-description" label="Full Description" name="description" multiline value={form.description} onChange={handleChange} placeholder="Detailed project description..." />
        <Input id="project-tech" label="Tech Stack (comma-separated)" name="tech_stack" value={form.tech_stack} onChange={handleChange} placeholder="React, Django, PostgreSQL" />
        <Input id="project-image" label="Project Image URL (e.g. /images/weather_app.png or https://...)" name="image" value={form.image} onChange={handleChange} placeholder="/images/weather_app.png or https://..." />
        <Input id="project-live" label="Live URL" name="live_url" value={form.live_url} onChange={handleChange} placeholder="https://..." />
        <Input id="project-github" label="GitHub URL" name="github_url" value={form.github_url} onChange={handleChange} placeholder="https://github.com/..." />

        <div className="flex items-center gap-3">
          <input id="project-featured" type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} className="w-4 h-4 rounded border-border-light dark:border-border-dark text-primary-600 focus:ring-primary-500/20" />
          <label htmlFor="project-featured" className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">Featured Project</label>
        </div>

        <Input id="project-ordering" label="Display Order" name="ordering" type="number" value={String(form.ordering)} onChange={handleChange} />
      </FormModal>
    </div>
  );
}
