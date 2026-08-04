/**
 * Admin — Education management page with CRUD operations.
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import { portfolioService, adminService } from "@/services/portfolio.service";
import { formatDate } from "@/utils/helpers";
import type { Education } from "@/types";

const emptyForm = {
  institution: "",
  degree: "",
  field_of_study: "",
  start_date: "",
  end_date: "",
  description: "",
  ordering: 0,
};

export default function AdminEducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Education | null>(null);
  const [form, setForm] = useState(emptyForm);

  const loadEducation = useCallback(async () => {
    try {
      const data = await portfolioService.getEducation();
      setEducation(data);
    } catch { /* empty */ }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadEducation();
  }, [loadEducation]);

  const openCreate = () => {
    setEditingEntry(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (entry: Education) => {
    setEditingEntry(entry);
    setForm({
      institution: entry.institution,
      degree: entry.degree,
      field_of_study: entry.field_of_study,
      start_date: entry.start_date,
      end_date: entry.end_date || "",
      description: entry.description,
      ordering: entry.ordering,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const payload = {
      ...form,
      end_date: form.end_date || null,
    };
    try {
      if (editingEntry) {
        await adminService.updateEducation(editingEntry.id, payload);
      } else {
        await adminService.createEducation(payload);
      }
      setIsModalOpen(false);
      loadEducation();
    } catch { /* empty */ }
    setIsSaving(false);
  };

  const handleDelete = async (entry: Education) => {
    if (!confirm(`Delete "${entry.degree} — ${entry.institution}"?`)) return;
    try {
      await adminService.deleteEducation(entry.id);
      loadEducation();
    } catch { /* empty */ }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const columns = [
    { key: "institution", label: "Institution" },
    { key: "degree", label: "Degree" },
    { key: "field_of_study", label: "Field" },
    {
      key: "start_date",
      label: "Period",
      render: (e: Education) =>
        `${formatDate(e.start_date)} — ${e.end_date ? formatDate(e.end_date) : "Present"}`,
    },
    { key: "ordering", label: "Order" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark tracking-tight">
            Education
          </h1>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-0.5">
            Manage your academic history
          </p>
        </div>
        <Button onClick={openCreate}>+ Add Entry</Button>
      </div>

      <DataTable columns={columns} data={education} onEdit={openEdit} onDelete={handleDelete} isLoading={isLoading} emptyMessage="No education entries yet" />

      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingEntry ? "Edit Education" : "Add Education"} onSubmit={handleSave} isLoading={isSaving}>
        <Input id="edu-institution" label="Institution" name="institution" value={form.institution} onChange={handleChange} placeholder="University of Technology" />
        <Input id="edu-degree" label="Degree" name="degree" value={form.degree} onChange={handleChange} placeholder="Bachelor of Technology" />
        <Input id="edu-field" label="Field of Study" name="field_of_study" value={form.field_of_study} onChange={handleChange} placeholder="Computer Science" />

        <div className="grid grid-cols-2 gap-4">
          <Input id="edu-start" label="Start Date" name="start_date" type="date" value={form.start_date} onChange={handleChange} />
          <Input id="edu-end" label="End Date (blank = Present)" name="end_date" type="date" value={form.end_date} onChange={handleChange} />
        </div>

        <Input id="edu-description" label="Description" name="description" multiline value={form.description} onChange={handleChange} placeholder="Achievements, GPA, activities..." />
        <Input id="edu-ordering" label="Display Order" name="ordering" type="number" value={String(form.ordering)} onChange={handleChange} />
      </FormModal>
    </div>
  );
}
