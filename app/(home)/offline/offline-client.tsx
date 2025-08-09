'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Iconify } from '@/components/iconify';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';

export function OfflineClient() {
  const [online, setOnline] = useState(true);
  const [since, setSince] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => {
      const o = navigator.onLine;
      setOnline(o);
      if (!o) setSince(new Date());
      if (o) setTimeout(() => window.location.replace('/'), 500);
    };
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  const minutesOffline = since ? Math.max(0, Math.round((Date.now() - since.getTime()) / 60000)) : 0;

  return (
    <div className="relative mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
      {/* glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-fd-primary/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-60 w-60 rounded-full bg-fd-secondary/20 blur-3xl" />
      </div>
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-fd-foreground/10 bg-fd-muted/30 px-4 py-1 text-xs font-medium text-fd-muted-foreground">
        <Iconify icon={online ? 'ph:wifi-high-duotone' : 'ph:cloud-slash-duotone'} className={cn(online ? 'text-green-500' : 'text-red-500')} width={16} />
        {online ? 'অনলাইনে ফিরে এসেছেন — রিলোড হচ্ছে…' : 'আপনি এখন অফলাইনে'}
      </div>
      <h1 className="mb-4 bg-gradient-to-r from-fd-primary to-fd-secondary bg-clip-text text-3xl font-semibold tracking-tight text-transparent md:text-4xl">
        সংযোগ বিচ্ছিন্ন
      </h1>
      <p className="mb-6 text-sm leading-relaxed text-fd-muted-foreground md:text-base">
        আপনার ইন্টারনেট সংযোগ নেই বা অস্থায়ীভাবে সার্ভারে পৌঁছানো যাচ্ছে না।{' '}
        {since && !online && (
          <span className="text-fd-foreground/80">(প্রায় {minutesOffline} মিনিট)</span>
        )}
      </p>
      {!online && (
        <div className="mb-8 space-y-2 text-xs text-fd-muted-foreground/80 md:text-sm">
          <p>দয়া করে নিচের যেকোনোটি চেষ্টা করুন:</p>
          <ul className="list-inside list-disc space-y-1 text-left">
            <li>Wi‑Fi / মোবাইল ডাটা চালু আছে কি না নিশ্চিত করুন</li>
            <li>ব্রাউজারের রিফ্রেশ বাটন চাপুন</li>
            <li>VPN ব্যবহার করলে অস্থায়ীভাবে বন্ধ করুন</li>
          </ul>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {!online && (
          <button
            onClick={() => window.location.reload()}
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg', className: 'rounded-full' }))}
          >
            আবার চেষ্টা করুন
            <Iconify icon="ph:arrow-clockwise-duotone" width={18} className="ml-1" />
          </button>
        )}
        <Link
          href="/"
          className={cn(buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-full backdrop-blur supports-[backdrop-filter]:bg-fd-background/60' }))}
        >
          হোমপেজ
          <Iconify icon="ph:house-duotone" width={18} className="ml-1" />
        </Link>
      </div>
      <div className="mt-10 text-[10px] uppercase tracking-wide text-fd-muted-foreground/60">
        Offline Fallback • Cached by Service Worker
      </div>
    </div>
  );
}
