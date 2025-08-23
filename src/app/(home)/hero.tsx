"use client";

import Link from 'next/link';
import { Iconify } from '@/components/iconify';
import { Stagger, StaggerItem, SlideUp } from '@/components/motion';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';
import { WebX } from '../../components/logo';

export default function Hero() {
  const tags = ['ওয়েব ডেভেলপমেন্ট', 'ওয়েব৩', 'এআই', 'ক্লাউড', 'ডেভঅপস'];

  return (
    <div className="relative z-[2] flex flex-col overflow-hidden bg-fd-background px-6 pt-16 md:px-12 md:pt-24 max-md:text-center rounded-3xl border border-fd-foreground/5 backdrop-blur [.uwu_&]:hidden">
      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-start md:gap-10">
          <div className="md:flex-1">
            <h1 className="font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl  mb-6">
              আগামী প্রজন্মের ওয়েব প্রযুক্তি শেখা এখন বাংলায়
            </h1>
            <p className="text-fd-muted-foreground md:text-lg leading-relaxed mb-5">
              আধুনিক ওয়েব, এআই, ডেভঅপস, ক্লাউড, নেটওয়ার্কিং ও নিরাপত্তা—সব কিছু এক প্ল্যাটফর্মে। গভীরভাবে শেখো, হাতে-কলমে প্রয়োগ করো, আর তৈরি করে ফেলো নিজের ভবিষ্যৎ।
            </p>
            <p className="text-fd-muted-foreground md:text-lg leading-relaxed mb-8">
              <span className="text-fd-foreground font-medium">WebX Beyond</span> দিচ্ছে কিউরেটেড কনটেন্ট, রোডম্যাপ, প্র্যাকটিস ও প্রজেক্ট আইডিয়া—একেবারেই ফ্রি।
            </p>
            <Stagger className="mb-8 flex flex-wrap gap-2 max-md:justify-center">
              {tags.map((t) => (
                <StaggerItem key={t}>
                  <span className="group relative inline-flex items-center gap-1 rounded-full border border-fd-foreground/20 bg-fd-muted/30 px-3 py-1 text-xs text-fd-muted-foreground overflow-hidden">
                    <span className="absolute inset-0 opacity-0 transition-opacity bg-[radial-gradient(circle_at_center,var(--color-fd-primary)_0%,transparent_70%)]" />
                    <span className="relative">{t}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
            <SlideUp>
              <div className="inline-flex flex-wrap items-center gap-4 max-md:justify-center mb-10">
                <Link href="#select-topics" className={cn(buttonVariants({ size: 'lg', className: 'rounded-full backdrop-blur supports-[backdrop-filter]:bg-fd-background/60', variant: 'outline' }))}>
                  আপনার জার্নি শুরু করুন
                  <Iconify icon="ph:arrow-right-duotone" width={18} className="ml-1" />
                </Link>
              </div>
            </SlideUp>
            <div className="grid grid-cols-3 max-w-sm gap-4 text-center text-xs md:text-sm mb-6 mx-auto md:mx-0">
              {[{ n: '১০০০+', l: 'লাইন নোট' }, { n: '৫০+', l: 'পাঠ্য বিষয়' }, { n: 'ফ্রি', l: 'ওপেন এক্সেস' }].map(v => (
                <div
                  key={v.l}
                  className="group relative rounded-lg border border-fd-foreground/10 bg-fd-muted/20 py-3 transition-transform duration-300 will-change-transform hover:shadow-lg hover:shadow-fd-primary/10"
                  style={{ perspective: '800px' }}
                  onMouseMove={(e) => {
                    const target = e.currentTarget as HTMLDivElement;
                    const rect = target.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const rx = ((y / rect.height) - 0.5) * 8;
                    const ry = ((x / rect.width) - 0.5) * -8;
                    target.style.setProperty('--tilt', `rotateX(${rx}deg) rotateY(${ry}deg)`);
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLDivElement;
                    target.style.setProperty('--tilt', 'rotateX(0deg) rotateY(0deg)');
                  }}
                >
                  <div className="pointer-events-none" style={{ transform: 'var(--tilt)', transition: 'transform 300ms ease' }}>
                    <div className="font-semibold text-fd-foreground/90">{v.n}</div>
                    <div className="text-fd-muted-foreground/70 mt-0.5">{v.l}</div>
                  </div>
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_30%,var(--color-fd-primary)/25,transparent_70%)]" />
                </div>
              ))}
            </div>
          </div>
          <div className="md:flex-1 flex items-start justify-center md:justify-end relative mt-10 md:mt-0">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl" aria-hidden />
              <WebX width={260} height={380} className="relative mx-auto my-auto md:mx-0 w-[260px] md:w-[380px] drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]" />
            </div>
          </div>
        </div>
      </div>
      {/* Subtle overlay bottom fade */}
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_bottom,var(--color-fd-background)_40%,transparent)]" />
    </div>
  );
}
