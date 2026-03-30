"use client";

import React from "react";
import { todayString } from "@/lib/date";

interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  hint?: string;
  maxDate?: string; // defaults to today
}

export function DatePicker({
  label,
  error,
  hint,
  id,
  maxDate,
  className = "",
  ...props
}: DatePickerProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const max = maxDate ?? todayString();

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700"
        >
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        type="date"
        id={inputId}
        max={max}
        aria-describedby={error ? `${inputId}-error` : undefined}
        aria-invalid={!!error}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm text-slate-900
          bg-white transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-offset-0
          disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
          ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-slate-300 focus:ring-primary-500 focus:border-primary-500"
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-600 mt-0.5">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-slate-500 mt-0.5">{hint}</p>
      )}
    </div>
  );
}
