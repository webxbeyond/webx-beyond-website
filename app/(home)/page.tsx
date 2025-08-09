import Link from "next/link";
import type { ReactNode } from "react";
import { Iconify } from "@/components/iconify";
import { HighlightCard } from '@/components/highlight-card';
import { WebX } from "./svg";
import { FadeIn, SlideUp } from '@/components/motion';
// @ts-ignore - local client component
import Hero from './hero';
import fs from 'node:fs';
import path from 'node:path';
import { source } from '@/lib/source';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';
import { UwuHero } from './uwu';

export default function Page() {
  return (
    <>
      <main className="container relative max-w-[1200px] px-2 py-4 z-[2] lg:py-16">
        <div className="space-y-8 lg:space-y-14">
          {/* Hero */}
          <div className="relative">
            <FadeIn>
              <Hero />
            </FadeIn>
            <UwuHero />
          </div>
          {/* What We Teach (core domains) */}
          <WhatWeTeach />
          {/* Expectations / Value Proposition */}
            <Expectations />
          {/* Learning Path steps */}
          <LearningPath />
          {/* Curated starting points */}
          <SelectTopics />
          {/* Full topic catalogue */}
          <Topics />
          {/* Recently curated / featured docs */}
          <FeaturedLessons />
          {/* Why WebX Beyond (benefits) */}
          <WhyWebX />
          {/* Free CTA */}
          <FreeCTA />
        </div>
      </main>
    </>
  );
}

// highlight card (clickable via optional href)
function Highlight({
  icon,
  heading,
  children,
  href,
}: {
  icon: string;
  heading: ReactNode;
  children: ReactNode;
  href?: string;
}) {
  const content = (
    <div className="rounded-2xl border border-fd-foreground/10 bg-fd-muted/30 p-6 transition-colors hover:bg-fd-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary/40">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex size-8 items-center justify-center rounded-full border bg-fd-background/60">
          <Iconify icon={icon} width={18} />
        </span>
        <h2 className="text-base font-semibold leading-tight">{heading}</h2>
      </div>
      <p className="text-sm text-fd-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
  return href ? (
    <Link href={href} aria-label={typeof heading === 'string' ? heading : undefined} className="group block focus:outline-none">
      {content}
    </Link>
  ) : content;
}

// highlights grid section (static marketing points)
function WhyWebX() {
  const items = [
    {
      icon: 'ph:book-open-text-duotone',
      title: 'ফ্রি ও ওপেন',
      body: 'কোনো পেওয়াল নেই। শেখা সবার জন্য উন্মুক্ত।',
    },
    {
      icon: 'ph:rocket-launch-duotone',
      title: 'প্র্যাকটিস ও প্রজেক্ট ফোকাস',
      body: 'শুধু তত্ত্ব নয়—বাস্তব উদাহরণ ও হাতে-কলমে নির্মাণ।',
    },
    {
      icon: 'ph:brain-duotone',
      title: 'এআই ইন্টিগ্রেটেড',
      body: 'আধুনিক ওয়ার্কফ্লোতে এআই ব্যবহারের বাস্তব গাইড।',
    },
    {
      icon: 'ph:cloud-duotone',
      title: 'ডেভঅপস ও ক্লাউড',
      body: 'CI/CD, কন্টেইনার, কুবেরনেটিস ও ইনফ্রা বেস্ট প্র্যাকটিস।',
    },
    {
      icon: 'ph:sparkle-duotone',
      title: 'বাংলায় গভীর কনটেন্ট',
      body: 'সংক্ষিপ্ত না—কাঠামোবদ্ধ, প্রগ্রেসিভ শেখার পথ।',
    },
    {
      icon: 'ph:users-three-duotone',
      title: 'কমিউনিটি ফোকাস (শীঘ্রই)',
      body: 'ফিডব্যাক ও সহযোগিতায় উন্নতি—কমিউনিটি যুক্ত হবে।',
    },
  ];
  return (
    <section className="px-6 py-12 md:px-12 md:py-16">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl mb-8">কেন WebX Beyond?</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <SlideUp key={it.title} delay={i * 0.05}>
            <Highlight icon={it.icon} heading={it.title}>{it.body}</Highlight>
          </SlideUp>
        ))}
      </div>
    </section>
  );
}

function WhatWeTeach() {
  const domains = [
    { icon: 'ph:code-duotone', title: 'ওয়েব ডেভেলপমেন্ট', body: 'HTML, CSS, JavaScript, React, Next.js, পারফরম্যান্স।' },
    { icon: 'ph:cloud-duotone', title: 'ক্লাউড ও ডেভঅপস', body: 'লিনাক্স, Docker, Kubernetes, CI/CD, মনিটরিং।' },
    { icon: 'ph:brain-duotone', title: 'কৃত্রিম বুদ্ধিমত্তা', body: 'এআই টুলিং, মডেল ইন্টিগ্রেশন, প্রম্পটিং স্ট্র্যাটেজি।' },
    { icon: 'ph:network-duotone', title: 'নেটওয়ার্কিং ও নিরাপত্তা', body: 'প্রোটোকল, ট্রাবলশুটিং, সিকিউরিটি বেসিক।' },
    { icon: 'ph:cube-duotone', title: 'ব্লকচেইন ভিত্তি', body: 'ডিসেন্ট্রালাইজড ধারণা ও স্মার্ট কন্ট্রাক্ট বেসিক।' },
    { icon: 'ph:notebook-duotone', title: 'চিটশিট ও রেফারেন্স', body: 'দ্রুত পুনরায় দেখার জন্য সংক্ষিপ্ত নোট।' },
  ];
  return (
    <section className="px-6 pt-10 md:px-12 md:pt-4">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl mb-4">আমরা কী শেখাই</h2>
      <p className="text-center text-fd-muted-foreground max-w-2xl mx-auto mb-8">মূল প্ল্যাটফর্মিং স্কিল থেকে শুরু করে আধুনিক ডিপ্লয়মেন্ট ও এআই ব্যবহারের বাস্তব কৌশল—এক জায়গায়।</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {domains.map((d, i) => (
          <SlideUp key={d.title} delay={i * 0.04}>
            <Highlight icon={d.icon} heading={d.title}>{d.body}</Highlight>
          </SlideUp>
        ))}
      </div>
    </section>
  );
}

function Expectations() {
  const points = [
    'স্ট্রাকচার্ড রোডম্যাপ ও ধাপে ধাপে অগ্রগতি',
    'বাস্তব প্রজেক্ট নির্দেশনা ও আইডিয়া',
    'চিটশিট দিয়ে দ্রুত পুনরাবৃত্তি',
    'বাংলা ভাষায় গভীর ব্যাখ্যা',
    'এআই ও অটোমেশন যুক্ত লার্নিং অ্যাপ্রোচ',
    'সম্পূর্ণ ফ্রি ও কোনো লকডাউন ছাড়া',
  ];
  return (
    <section className="px-6 md:px-12 py-10 md:py-12">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl mb-4">আপনি এখানে যা পাবেন</h2>
      <p className="text-center text-fd-muted-foreground max-w-2xl mx-auto mb-6">শুধু পড়ার জন্য নয়—তৈরি করার জন্য প্রস্তুত করে তোলা আমাদের লক্ষ্য।</p>
      <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
        {points.map((p, i) => (
          <SlideUp key={p} delay={i * 0.04}>
            <li className="flex items-start gap-2 rounded-xl border border-fd-foreground/10 bg-fd-muted/30 p-3 text-sm leading-relaxed">
              <span className="mt-0.5 inline-flex size-5 items-center justify-center rounded-full border bg-fd-background/70 text-[10px] font-semibold">{i + 1}</span>
              <span>{p}</span>
            </li>
          </SlideUp>
        ))}
      </ul>
    </section>
  );
}

function LearningPath() {
  const steps: { t: string; d: string; icon: string; hint?: string; cta?: { label: string; href: string } }[] = [
    { t: 'বেসিক শিখুন', icon: 'ph:brackets-curly-duotone', d: 'ওয়েব ভিত্তি, HTML/CSS, জাভাস্ক্রিপ্ট ও গিট দিয়ে একটি মজবুত ফান্ডামেন্টাল গড়ে তুলুন।', hint: 'শুরুর ১–২ সপ্তাহ', cta: { label: 'HTML & CSS', href: '/html-css' } },
    { t: 'প্র্যাকটিস করুন', icon: 'ph:lightning-duotone', d: 'চিটশিট / ছোট অনুশীলনে নিয়মিত পুনরাবৃত্তি করে স্মৃতি শক্ত করুন ও হাত গরম রাখুন।', hint: 'দৈনিক অভ্যাস', cta: { label: 'Cheatsheets', href: '/cheatsheet' } },
    { t: 'প্রজেক্ট বানান', icon: 'ph:stack-duotone', d: 'আইডিয়া বাছাই, ফিচার পরিকল্পনা, ভার্সন কন্ট্রোল, ডিপ্লয়—এন্ড টু এন্ড নির্মাণ।', hint: '২–৬ সপ্তাহ', cta: { label: 'Node.js', href: '/nodejs' } },
    { t: 'অটোমেট ও অপ্টিমাইজ', icon: 'ph:gear-six-duotone', d: 'ডেভঅপস, ক্লাউড, পারফরম্যান্স টিউনিং, সিকিউরিটি বেসিক ও এআই টুলিং ইন্টিগ্রেশন।', hint: 'ইন্টারমিডিয়েট', cta: { label: 'DevOps', href: '/dev-ops' } },
    { t: 'ক্যারিয়ার প্রস্তুতি', icon: 'ph:flag-checkered-duotone', d: 'প্রোফাইল/personal ব্র্যান্ড, ওপেন সোর্স কন্ট্রিবিউশন ও ইন্টারভিউ প্র্যাকটিস।', hint: 'চলমান', cta: { label: 'Start Now', href: '#select-topics' } },
  ];
  return (
    <section className="px-6 md:px-12 py-10 md:py-14">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl mb-4">লার্নিং পথ</h2>
      <p className="text-center text-fd-muted-foreground max-w-3xl mx-auto mb-10 text-sm md:text-base">ধাপে ধাপে অগ্রগতির একটি স্পষ্ট মানচিত্র। প্রতিটি স্টেপ পূর্বের ওপর দাঁড়িয়ে বাস্তব দক্ষতা তৈরি করে।</p>
      {/* Horizontal stepper on md+, vertical on mobile */}
      <ol className="relative mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:gap-4">
        {steps.map((s, i) => (
          <SlideUp key={s.t} delay={i * 0.05}>
            <li
              className="group relative flex-1 rounded-2xl border border-fd-foreground/10 bg-fd-muted/30 backdrop-blur px-5 py-5 md:px-5 md:py-6 transition-colors hover:bg-fd-muted/50"
            >
              {/* Connector (desktop) */}
              {i < steps.length - 1 && (
                <span className="hidden md:block absolute top-1/2 left-[calc(100%+0.25rem)] h-[2px] w-[calc(100%-1rem)] bg-gradient-to-r from-fd-primary/30 to-fd-secondary/30" aria-hidden />
              )}
              <div className="mb-3 flex items-start gap-3">
                <div className="relative">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-fd-foreground/10 bg-fd-background/70 shadow-sm shadow-fd-primary/10">
                    <Iconify icon={s.icon} width={22} className="text-fd-primary" />
                  </span>
                  <span className="absolute -bottom-1 -right-1 inline-flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-fd-primary to-fd-secondary text-[11px] font-bold text-white shadow">
                    {i + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-semibold tracking-tight mb-1 flex items-center gap-2">
                    {s.t}
                    {s.hint && (
                      <span className="inline-flex items-center rounded-full border border-fd-foreground/10 bg-fd-background/60 px-2 py-[2px] text-[10px] font-medium text-fd-muted-foreground">
                        {s.hint}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed text-fd-muted-foreground mb-3">{s.d}</p>
                  {s.cta && (
                    <Link
                      href={s.cta.href}
                      className={cn(buttonVariants({ variant: 'outline', size: 'sm', className: 'rounded-full !h-7 text-xs px-3 py-0 backdrop-blur supports-[backdrop-filter]:bg-fd-background/60' }))}
                      aria-label={`${s.t} - ${s.cta.label}`}
                    >
                      {s.cta.label}
                      <Iconify icon="ph:arrow-up-right-duotone" width={14} className="ml-1" />
                    </Link>
                  )}
                </div>
              </div>
              {/* Mobile connector (vertical) */}
              {i < steps.length - 1 && (
                <span className="md:hidden absolute left-5 bottom-[-1.35rem] h-6 w-[2px] bg-gradient-to-b from-fd-primary/40 to-fd-secondary/40" aria-hidden />
              )}
              {/* Hover ring */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-fd-primary/0 transition group-hover:ring-2 group-hover:ring-fd-primary/30" aria-hidden />
            </li>
          </SlideUp>
        ))}
      </ol>
    </section>
  );
}

function FreeCTA() {
  return (
    <section className="relative overflow-hidden px-8 py-16 sm:py-20 rounded-3xl border border-fd-foreground/10 bg-fd-muted/20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,var(--color-fd-secondary)/25,transparent_70%)]" />
      <h2 className="relative bg-gradient-to-b from-fd-primary to-fd-foreground/60 bg-clip-text text-center text-2xl font-semibold text-transparent sm:text-3xl mb-4">
        একেবারেই ফ্রি & ওপেন
      </h2>
      <p className="relative mx-auto mb-8 max-w-2xl text-center text-fd-muted-foreground text-sm md:text-base">
        এখনই একটি টপিক বেছে নিয়ে শুরু করুন—কোনো সাইনআপ বা পেমেন্ট ছাড়াই। ভবিষ্যতে আরও প্র্যাকটিস, কমিউনিটি ও প্রজেক্ট যুক্ত হবে।
      </p>
      <div className="relative flex flex-wrap justify-center gap-4">
        <Link href="#select-topics" className={cn(buttonVariants({ size: 'lg', className: 'rounded-full shadow-lg shadow-fd-primary/20 hover:shadow-fd-primary/40', variant: 'secondary' }))}>
          শুরু করুন
          <Iconify icon="ph:arrow-right-duotone" width={18} className="ml-1" />
        </Link>
        <Link href="#topics" className={cn(buttonVariants({ size: 'lg', className: 'rounded-full backdrop-blur supports-[backdrop-filter]:bg-fd-background/60', variant: 'outline' }))}>
          সব টপিক দেখুন
          <Iconify icon="ph:list-bullets-duotone" width={18} className="ml-1" />
        </Link>
      </div>
    </section>
  );
}

// Hero moved to client component ./hero.tsx

function Topics() {
  // helper moved here for clarity; could be hoisted if reused elsewhere
  type Topic = {
    slug: string;
    title: string;
    description?: string;
    icon: string;
    href: string;
    count?: number;
  };

  const loadTopics = (): Topic[] => {
    const rootDir = path.join(process.cwd(), 'content', 'learn');
    let list: Topic[] = [];
    try {
      const topMeta = JSON.parse(
        fs.readFileSync(path.join(rootDir, 'meta.json'), 'utf8'),
      ) as { pages: string[] };

      list = topMeta.pages
        .filter((slug) => typeof slug === 'string')
        .map((slug) => {
          try {
            const metaPath = path.join(rootDir, slug, 'meta.json');
            const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as {
              title?: string;
              description?: string;
              icon?: string;
              pages?: string[];
            };
            const count = (meta.pages ?? []).filter(
              (p) =>
                typeof p === 'string' &&
                p !== 'index' &&
                !p.startsWith('---') &&
                p !== '...' &&
                p.trim().length > 0,
            ).length;
            return {
              slug,
              title: meta.title ?? slug,
              description: meta.description,
              icon: meta.icon ?? 'ph:bookmark-duotone',
              href: `/${slug}`,
              count,
            } satisfies Topic;
          } catch {
            return {
              slug,
              title: slug,
              href: `/${slug}`,
              icon: 'ph:bookmark-duotone',
            } as Topic;
          }
        });

      // Enrich with selected cheatsheet subtopics
      const cheatsheetMetaPath = path.join(rootDir, 'cheatsheet', 'meta.json');
      if (fs.existsSync(cheatsheetMetaPath)) {
        const cmeta = JSON.parse(fs.readFileSync(cheatsheetMetaPath, 'utf8')) as {
          pages?: string[];
        };
        const picks = (cmeta.pages ?? []).filter((p) =>
          ['aws', 'google-cloud', 'docker', 'kubernetes', 'git', 'linux'].includes(p),
        );
        for (const p of picks) {
          list.push({
            slug: `cheatsheet/${p}`,
            title:
              p === 'aws' ? 'AWS' :
                p === 'google-cloud' ? 'Google Cloud' :
                  p === 'docker' ? 'Docker' :
                    p === 'kubernetes' ? 'Kubernetes' :
                      p === 'git' ? 'Git' :
                        p === 'linux' ? 'Linux' : p,
            description: 'চিটশিট দিয়ে দ্রুত শিখুন।',
            href: `/cheatsheet/${p}`,
            icon:
              p === 'aws' ? 'mdi:aws' :
                p === 'google-cloud' ? 'logos:google-cloud' :
                  p === 'docker' ? 'mdi:docker' :
                    p === 'kubernetes' ? 'mdi:kubernetes' :
                      p === 'git' ? 'mdi:git' :
                        p === 'linux' ? 'mdi:linux' : 'ph:bookmark-duotone',
          });
        }
      }
    } catch {
      // fallback minimal set
      list = [
        {
          slug: 'html-css',
          title: 'ওয়েব ডেভেলপমেন্ট',
          href: '/html-css',
          icon: 'ph:code-bold',
          description: 'HTML এবং CSS দিয়ে শুরু করুন।',
        },
        {
          slug: 'javascript',
          title: 'জাভাস্ক্রিপ্ট',
          href: '/javascript',
          icon: 'mdi:language-javascript',
          description: 'জাভাস্ক্রিপ্ট দিয়ে ইন্টারেক্টিভ ওয়েবসাইট তৈরি করুন।',
        },
      ];
    }
    return list;
  };

  const topics = loadTopics();

  return (
    <section id="topics" className="px-6 py-10 md:px-12 md:py-14">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl mb-4">সব টপিক</h2>
      <p className="text-center text-fd-muted-foreground max-w-2xl mx-auto mb-8 text-sm md:text-base">সব ক্যাটাগরির একটি পূর্ণ তালিকা। যেকোনো জায়গা থেকে জাম্প ইন করতে পারেন—প্রতিটি সেকশনে প্রগ্রেসিভ কাঠামো।</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((t, i) => (
          <SlideUp key={t.slug} delay={i * 0.05}>
            <Highlight href={t.href} icon={t.icon} heading={t.title}>
              {t.description || 'সংক্ষিপ্ত পরিচিতি পাওয়া যাচ্ছে না।'}
            </Highlight>
          </SlideUp>
        ))}
      </div>
    </section>
  );
}

// curated manual selection section (migrated from former select-topic page)
function SelectTopics() {
  const cards: {
    title: string; description: string; icon: string; href: string; badge?: { text: string; variant: 'progress' | 'soon' }
  }[] = [
      { title: 'ডেভঅপস', description: 'সফটওয়্যার ডেভেলপমেন্ট এবং আইটি অপারেশনের সংযোগস্থলে কার্যকরী প্রক্রিয়াগুলোর সমন্বয়।', icon: 'lets-icons:terminal', href: '/dev-ops', badge: { text: 'চলমান', variant: 'progress' } },
      { title: 'এআই (AI)', description: 'বর্তমান সময়ের রিভ্যুলেশনারি ইনভেনশন।', icon: 'eos-icons:ai', href: '/ai', badge: { text: 'চলমান', variant: 'progress' } },
      { title: 'নোড জেএস', description: 'বর্তমান সময়ে সবচেয়ে জনপ্রিয় সার্ভার সাইড জাভাস্ক্রিপ্ট রানটাইম এবং একটি লাইব্রেরি।', icon: 'famicons:logo-nodejs', href: '/nodejs', badge: { text: 'চলমান', variant: 'progress' } },
      { title: 'HTML ও CSS', description: 'বিল্ডিং ব্লক অফ ওয়েবসাইট।', icon: 'famicons:logo-nodejs', href: '/html-css', badge: { text: 'চলমান', variant: 'progress' } },
      { title: 'সংক্ষিপ্ত নোট (Cheatsheets)', description: 'আমার প্রোগ্রামিং শেখার ব্যাক্তিগত নোটবুক।', icon: 'fluent:notebook-16-regular', href: '/cheatsheet' },
      { title: 'নেটওয়ার্কিং', description: 'বিভিন্ন কম্পিউটার এবং ডিভাইসের মধ্যে সংযোগ স্থাপন ও ডেটা আদান-প্রদান সংক্রান্ত প্রযুক্তি।', icon: 'material-symbols:cable-sharp', href: '/networking', badge: { text: 'শীঘ্রই আসছে', variant: 'soon' } },
      { title: 'ব্লকচেইন', description: 'বিকেন্দ্রীভূত ও নিরাপদ তথ্য সংরক্ষণ ব্যবস্থা, যা ক্রিপ্টোকারেন্সি এবং অন্যান্য প্রযুক্তির ভিত্তি।', icon: 'icon-park-twotone:blockchain', href: '/#select-topics', badge: { text: 'শীঘ্রই আসছে', variant: 'soon' } },
      { title: 'হোম সার্ভার', description: 'ব্যক্তিগত ব্যবহারের জন্য নির্মিত সার্ভার, যা ফাইল শেয়ারিং, স্ট্র্রিমিং ও অন্যান্য সেবার জন্য ব্যবহৃত হয়।', icon: 'solar:server-bold-duotone', href: '/#select-topics', badge: { text: 'শীঘ্রই আসছে', variant: 'soon' } },
      { title: 'ইথিক্যাল হ্যাকিং', description: 'হ্যাকিং কৌশল শিখে নিজেকে এবং অন্যকে নিরাপদ করার পথে এগিয়ে যাও।', icon: 'ph:terminal-duotone', href: '/#select-topics', badge: { text: 'শীঘ্রই আসছে', variant: 'soon' } },
    ];
  return (
    <section id="select-topics" className="px-6 pt-12 md:px-12 md:pt-16">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl mb-4">শুরু করার জন্য বেছে নিন</h2>
      <p className="text-center text-fd-muted-foreground mb-10 max-w-2xl mx-auto text-sm md:text-base">নতুন শুরুকারীদের জন্য কিউরেটেড কিছু পথ। আপনার লক্ষ্য অনুযায়ী একটি নির্বাচন করুন।</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <SlideUp key={c.title} delay={i * 0.05}>
            <HighlightCard icon={c.icon} title={c.title} href={c.href} description={c.description} badge={c.badge} />
          </SlideUp>
        ))}
      </div>
    </section>
  );
}

async function FeaturedLessons() {
  type LessonLink = { href: string; title: string; category: string };
  const loadFeatured = async (): Promise<LessonLink[]> => {
    const bucket: LessonLink[] = [];
    const rootDir = path.join(process.cwd(), 'content', 'learn');
    try {
      const topMeta = JSON.parse(
        fs.readFileSync(path.join(rootDir, 'meta.json'), 'utf8'),
      ) as { pages: string[] };
      for (const slug of topMeta.pages) {
        if (typeof slug !== 'string') continue;
        const metaPath = path.join(rootDir, slug, 'meta.json');
        try {
          const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as {
            pages?: string[];
            title?: string;
          };
          const candidates = (meta.pages ?? []).filter(
            (p) => typeof p === 'string' && p !== 'index' && !p.startsWith('---') && p !== '...' && p.trim().length > 0,
          );
          for (const p of candidates.slice(0, 2)) {
            const page = source.getPage([slug, p]);
            if (page) {
              const data = await page.data;
              bucket.push({
                href: `/${slug}/${p}`,
                title: data.title ?? p,
                category: meta.title ?? slug,
              });
            } else {
              bucket.push({ href: `/${slug}/${p}`, title: p, category: slug });
            }
          }
        } catch {
          // skip broken category
        }
      }
    } catch {
      // ignore top meta errors
    }
    return bucket.slice(0, 6);
  };

  const top = await loadFeatured();
  if (top.length === 0) return null;
  return (
    <section className="px-6 py-10 md:px-12 md:py-14">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl mb-8">নির্বাচিত পাঠ</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {top.map((l, i) => (
          <SlideUp key={l.href} delay={i * 0.05}>
            <Highlight href={l.href} icon="ph:book-open-text-duotone" heading={l.title}>
              {l.category}
            </Highlight>
          </SlideUp>
        ))}
      </div>
    </section>
  );
}
