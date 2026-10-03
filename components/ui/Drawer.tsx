"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A modal side panel built on the native <dialog> element, so the browser
 * provides the focus trap, Escape to close, scroll lock and inert background.
 */
export function Drawer({
  open,
  onClose,
  label,
  side = "right",
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  side?: "left" | "right";
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      data-side={side}
      className="drawer"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex h-full flex-col">{children}</div>
    </dialog>
  );
}
