import Link from 'next/link';
import { Iconify } from '@/components/iconify';
import type { ReactNode } from 'react';

export type HighlightCardBadgeVariant = 'progress' | 'soon';

export interface HighlightCardProps {
  icon: string;
  title: string;
  description?: ReactNode;
  href: string;
  badge?: { text: string; variant: HighlightCardBadgeVariant };
  className?: string;
  delay?: number; // optional animation delay hook (not used internally, for parent mapping convenience)
  progress?: number; // 0-100 progress percentage for 'progress' variant topics
}

function badgeClasses(variant: HighlightCardBadgeVariant) {
  switch (variant) {
    case 'progress':
      return 'bg-[#0071e3] text-white';
    case 'soon':
      return 'bg-yellow-500 text-white';
    default:
      return 'bg-fd-primary text-fd-primary-foreground';
  }
}

export function HighlightCard({ icon, title, description, href, badge, className, progress }: HighlightCardProps) {
  return (
    <Link
      href={href}
      className={`group h-full flex flex-col focus:outline-none rounded-2xl border border-fd-foreground/10 bg-fd-muted/30 p-6 transition-colors hover:bg-fd-muted/50 focus-visible:ring-2 focus-visible:ring-fd-primary/40 ${className || ''}`.trim()}
      aria-label={title}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex size-8 items-center justify-center rounded-full border bg-fd-background/60">
          <Iconify icon={icon} width={18} />
        </span>
        <h3 className="text-base font-semibold leading-tight flex items-center gap-2">
          {title}
          {badge && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide ${badgeClasses(badge.variant)}`}>
              {badge.text}
            </span>
          )}
        </h3>
      </div>
      {description && (
        <p className="text-sm text-fd-muted-foreground leading-relaxed line-clamp-4 mt-auto">
          {description}
        </p>
      )}
      {/* Progress bar (only when variant is progress & progress provided) */}
      {badge?.variant === 'progress' && typeof progress === 'number' && progress >= 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-wide text-fd-muted-foreground">অগ্রগতি</span>
            <span className="text-[10px] font-medium text-fd-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-fd-foreground/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-fd-primary to-fd-secondary transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}
    </Link>
  );
}
