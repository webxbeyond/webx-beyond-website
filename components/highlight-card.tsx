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

export function HighlightCard({ icon, title, description, href, badge, className }: HighlightCardProps) {
  return (
    <Link
      href={href}
      className={`group block focus:outline-none rounded-2xl border border-fd-foreground/10 bg-fd-muted/30 p-6 transition-colors hover:bg-fd-muted/50 focus-visible:ring-2 focus-visible:ring-fd-primary/40 ${className || ''}`.trim()}
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
        <p className="text-sm text-fd-muted-foreground leading-relaxed line-clamp-4">
          {description}
        </p>
      )}
    </Link>
  );
}
