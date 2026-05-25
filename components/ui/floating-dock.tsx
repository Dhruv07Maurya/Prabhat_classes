"use client";
/**
 * FloatingDock — Instagram-style fixed bottom navigation bar.
 * Shows on mobile only (md:hidden). Desktop uses the top navbar.
 **/

import { cn } from "@/lib/utils";

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const FloatingDock = ({
  items,
  className,
  desktopClassName: _d,
  mobileClassName: _m,
}: {
  items: DockItem[];
  className?: string;
  /** Legacy — ignored, kept for API compat */
  desktopClassName?: string;
  /** Legacy — ignored, kept for API compat */
  mobileClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "bg-white/95 backdrop-blur-md border-t border-zinc-200 shadow-[0_-1px_12px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      <div
        className="flex items-stretch justify-around"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0.5rem)" }}
      >
        {items.map((item) => (
          <DockButton key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
};

function DockButton({ item }: { item: DockItem }) {
  return (
    <a
      href={item.href}
      onClick={item.onClick}
      aria-label={item.title}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5 flex-1 py-2 px-1",
        "transition-all duration-150 active:scale-90 select-none",
        item.active ? "text-zinc-950" : "text-zinc-400",
      )}
    >
      {/* Icon */}
      <span
        className={cn(
          "flex items-center justify-center w-6 h-6 transition-transform duration-200",
          item.active && "scale-110",
        )}
      >
        {item.icon}
      </span>

      {/* Active indicator dot */}
      <span
        className={cn(
          "block w-1 h-1 rounded-full transition-all duration-200",
          item.active ? "bg-red-600 scale-100" : "bg-transparent scale-0",
        )}
      />

      {/* Label */}
      <span
        className={cn(
          "text-[10px] font-semibold leading-none tracking-tight truncate max-w-full",
          item.active ? "text-zinc-950" : "text-zinc-400",
        )}
      >
        {item.title}
      </span>
    </a>
  );
}
