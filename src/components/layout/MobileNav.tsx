"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MobileNavProps {
  onAddExpense: () => void;
}

export function MobileNav({ onAddExpense }: MobileNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-1">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
            isActive("/dashboard") ? "text-primary-600" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/dashboard") ? 2 : 1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </Link>

        {/* Add button (center) */}
        <button
          onClick={onAddExpense}
          className="flex flex-col items-center gap-0.5 px-3 py-1"
          aria-label="Add expense"
        >
          <div className="w-11 h-11 bg-primary-600 rounded-full flex items-center justify-center shadow-lg shadow-primary-600/30 -mt-4">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-xs font-medium text-slate-500 mt-0.5">Add</span>
        </button>

        <Link
          href="/expenses"
          className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
            isActive("/expenses") ? "text-primary-600" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/expenses") ? 2 : 1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Expenses
        </Link>
      </div>
    </nav>
  );
}
