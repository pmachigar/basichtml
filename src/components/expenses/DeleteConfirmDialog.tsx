"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  description: string;
}

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  description,
}: DeleteConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Expense" maxWidth="max-w-sm">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-slate-700">
              Are you sure you want to delete{" "}
              <span className="font-medium text-slate-900">&ldquo;{description}&rdquo;</span>?
              This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
