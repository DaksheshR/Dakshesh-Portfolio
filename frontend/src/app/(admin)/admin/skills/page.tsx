/**
 * Admin — Skills management page with CRUD operations.
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import { portfolioService, adminService } from "@/services/portfolio.service";
import type { Skill, SkillCategory } from "@/types";

const emptyForm = {
  name: "",
  category: "frontend" as SkillCategory,
  proficiency: 80,
  icon: "",
  ordering: 0,
};

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [form, setForm] = useState(emptyForm);

  const loadSkills = useCallback(async () => {
    try {
      const data = await portfolioService.getSkills();
      setSkills(data);
    } catch { /* empty */ }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const openCreate = () => {
    setEditingSkill(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setForm({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon,
      ordering: skill.ordering,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingSkill) {
        await adminService.updateSkill(editingSkill.id, form);
      } else {
        await adminService.createSkill(form);
      }
      setIsModalOpen(false);
      loadSkills();
    } catch { /* empty */ }
    setIsSaving(false);
  };

  const handleDelete = async (skill: Skill) => {
    if (!confirm(`Delete skill "${skill.name}"?`)) return;
    try {
      await adminService.deleteSkill(skill.id);
      loadSkills();
    } catch { /* empty */ }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const columns = [
    { key: "name", label: "Name" },
    {
      key: "category",
      label: "Category",
      render: (skill: Skill) => <Badge variant="primary">{skill.category_display}</Badge>,
    },
    {
      key: "proficiency",
      label: "Proficiency",
      render: (skill: Skill) => (
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 bg-surface-muted-light dark:bg-surface-elevated-dark rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 rounded-full" style={{ width: `${skill.proficiency}%` }} />
          </div>
          <span className="text-[11px] font-medium text-text-muted-light dark:text-text-muted-dark tabular-nums">{skill.proficiency}%</span>
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
            Skills
          </h1>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-0.5">
            Manage your technical skills
          </p>
        </div>
        <Button onClick={openCreate}>+ Add Skill</Button>
      </div>

      <DataTable columns={columns} data={skills} onEdit={openEdit} onDelete={handleDelete} isLoading={isLoading} emptyMessage="No skills added yet" />

      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSkill ? "Edit Skill" : "Add Skill"} onSubmit={handleSave} isLoading={isSaving}>
        <Input id="skill-name" label="Skill Name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. React" />

        <div>
          <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-1.5">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-elevated-dark text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200">
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="devops">DevOps</option>
            <option value="tools">Tools</option>
            <option value="other">Other</option>
          </select>
        </div>

        <Input id="skill-proficiency" label="Proficiency (1-100)" name="proficiency" type="number" value={String(form.proficiency)} onChange={handleChange} />
        <Input id="skill-icon" label="Icon (emoji or class)" name="icon" value={form.icon} onChange={handleChange} placeholder="e.g. ⚛️" />
        <Input id="skill-ordering" label="Display Order" name="ordering" type="number" value={String(form.ordering)} onChange={handleChange} />
      </FormModal>
    </div>
  );
}
