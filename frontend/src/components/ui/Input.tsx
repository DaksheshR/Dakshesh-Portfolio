/**
 * Reusable form Input component with label and error display.
 */

"use client";

import { cn } from "@/utils/helpers";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseInputProps {
  label?: string;
  error?: string;
  id: string;
}

type InputFieldProps = BaseInputProps &
  InputHTMLAttributes<HTMLInputElement> & {
    multiline?: false;
  };

type TextareaFieldProps = BaseInputProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
  };

type InputProps = InputFieldProps | TextareaFieldProps;

const inputBaseStyles = cn(
  "w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all duration-200",
  "bg-white dark:bg-surface-elevated-dark",
  "border-border-light dark:border-border-dark",
  "text-text-primary-light dark:text-text-primary-dark",
  "placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark",
  "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
  "hover:border-border-hover-light dark:hover:border-border-hover-dark"
);

export default function Input(props: InputProps) {
  const { label, error, id, className, multiline, ...rest } = props;

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark"
        >
          {label}
        </label>
      )}

      {multiline ? (
        <textarea
          id={id}
          className={cn(
            inputBaseStyles,
            "resize-y min-h-[120px]",
            error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
            className
          )}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={cn(
            inputBaseStyles,
            error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
            className
          )}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
