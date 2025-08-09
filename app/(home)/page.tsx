import Link from "next/link";
import type { ReactNode } from "react";
import { Iconify } from "@/components/iconify";
import { HighlightCard } from '@/components/highlight-card';
import { FadeIn, SlideUp } from '@/components/motion';
import Hero from './hero';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';
import { UwuHero } from './uwu';

export default function Page() {
  return (
    <>
      <main className="container relative  px-2 py-4 z-[2] lg:py-16">
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
          {/* Full topic catalogue & featured lessons temporarily hidden to reduce visual load */}
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
    <div className="h-full flex flex-col rounded-2xl border border-fd-foreground/10 bg-fd-muted/30 p-6 transition-colors hover:bg-fd-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary/40">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex size-8 items-center justify-center rounded-full border bg-fd-background/60">
          <Iconify icon={icon} width={18} />
        </span>
        <h2 className="text-base font-semibold leading-tight">{heading}</h2>
      </div>
      <p className="text-sm text-fd-muted-foreground leading-relaxed mt-auto">{children}</p>
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
    <section className=" py-12 md:py-16 ">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl mb-8">কেন ওয়েব বিওয়ান্ড?</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
    <section className="pt-10 md:pt-4">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl mb-4">আমরা কী শেখাই</h2>
      <p className="text-center text-fd-muted-foreground max-w-2xl mx-auto mb-8">মূল প্ল্যাটফর্মিং স্কিল থেকে শুরু করে আধুনিক ডিপ্লয়মেন্ট ও এআই ব্যবহারের বাস্তব কৌশল—এক জায়গায়।</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                    {/* {s.hint && (
                      <span className="inline-flex items-center rounded-full border border-fd-foreground/10 bg-fd-background/60 px-2 py-[2px] text-[10px] font-medium text-fd-muted-foreground">
                        {s.hint}
                      </span>
                    )} */}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed text-fd-muted-foreground mb-3">{s.d}</p>
                  {/* {s.cta && (
                    <Link
                      href={s.cta.href}
                      className={cn(buttonVariants({ variant: 'outline', size: 'sm', className: 'rounded-full !h-7 text-xs px-3 py-0 backdrop-blur supports-[backdrop-filter]:bg-fd-background/60' }))}
                      aria-label={`${s.t} - ${s.cta.label}`}
                    >
                      {s.cta.label}
                      <Iconify icon="ph:arrow-up-right-duotone" width={14} className="ml-1" />
                    </Link>
                  )} */}
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
        একেবারেই ফ্রি ও ওপেন
      </h2>
      <p className="relative mx-auto mb-8 max-w-2xl text-center text-fd-muted-foreground text-sm md:text-base">
        এখনই একটি টপিক বেছে নিয়ে শুরু করুন—কোনো সাইনআপ বা পেমেন্ট ছাড়াই। ভবিষ্যতে আরও প্র্যাকটিস, কমিউনিটি ও প্রজেক্ট যুক্ত হবে।
      </p>
      <div className="relative flex flex-wrap justify-center gap-4">

        <Link href="#select-topics" className={cn(buttonVariants({ size: 'lg', className: 'rounded-full backdrop-blur supports-[backdrop-filter]:bg-fd-background/60', variant: 'outline' }))}>
          সব টপিক দেখুন
          <Iconify icon="ph:list-bullets-duotone" width={18} className="ml-1" />
        </Link>
      </div>
    </section>
  );
}

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
      { title: 'পারফরম্যান্স অপ্টিমাইজেশন', description: 'ওয়েব অ্যাপের লোড টাইম, বান্ডেল সাইজ, ল্যাটেন্সি ও কোর ওয়েব ভাইটাল উন্নত করার কৌশল।', icon: 'tabler:chart-line', href: '/#select-topics', badge: { text: 'শীঘ্রই আসছে', variant: 'soon' } },
      { title: 'ডাটা ইঞ্জিনিয়ারিং', description: 'ইটিএল পাইপলাইন, ডাটা মডেলিং, স্ট্রিম প্রসেসিং ও অ্যানালিটিক্স ফাউন্ডেশন।', icon: 'ph:database-duotone', href: '/#select-topics', badge: { text: 'শীঘ্রই আসছে', variant: 'soon' } },
      { title: 'গো (Go)', description: 'কনকারেন্সি ফ্রেন্ডলি, পারফরম্যান্ট সার্ভার ও টুলিং নির্মাণের জন্য গো ল্যাঙ্গ শেখা।', icon: 'logos:go', href: '/#select-topics', badge: { text: 'শীঘ্রই আসছে', variant: 'soon' } },
      { title: 'রাস্ট (Rust)', description: 'মেমরি সেফটি, হাই পারফরম্যান্স ও সিস্টেম লেভেল প্রোগ্রামিংয়ের আধুনিক ভাষা।', icon: 'logos:rust', href: '/#select-topics', badge: { text: 'শীঘ্রই আসছে', variant: 'soon' } },
      { title: 'টেরাফর্ম / IaC', description: 'ইনফ্রাস্ট্রাকচার অ্যাজ কোড দিয়ে পুনরুত্পাদনযোগ্য ক্লাউড রিসোর্স ম্যানেজমেন্ট।', icon: 'logos:terraform-icon', href: '/#select-topics', badge: { text: 'শীঘ্রই আসছে', variant: 'soon' } },
      { title: 'অবজারভেবিলিটি', description: 'মেট্রিক্স, লগ, ট্রেস ও অ্যালার্টিং দিয়ে সিস্টেমের স্বচ্ছতা ও নির্ভরযোগ্যতা।', icon: 'ph:waveform-duotone', href: '/#select-topics', badge: { text: 'শীঘ্রই আসছে', variant: 'soon' } },
    ];

  const current = cards.filter(c => !c.badge || c.badge.variant === 'progress');
  const upcoming = cards.filter(c => c.badge?.variant === 'soon');
  return (
    <section id="select-topics" className=" pt-12  md:pt-16">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl mb-4">শুরু করার জন্য বেছে নিন</h2>
      <p className="text-center text-fd-muted-foreground mb-10 max-w-2xl mx-auto text-sm md:text-base">নতুন শুরুকারীদের জন্য কিউরেটেড কিছু পথ। আপনার লক্ষ্য অনুযায়ী একটি নির্বাচন করুন।</p>
      {/* Current / Active topics */}
      <div className="mb-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {current.map((c, i) => (
            <SlideUp key={c.title} delay={i * 0.05}>
              <HighlightCard icon={c.icon} title={c.title} href={c.href} description={c.description} badge={c.badge} />
            </SlideUp>
          ))}
        </div>
      </div>

      {/* Upcoming topics */}
      {upcoming.length > 0 && (
        <div>
          <h3 className="text-center font-semibold mb-4">শীঘ্রই আসছে</h3>
          {/* grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 opacity-80">
            {upcoming.map((c, i) => (
              <SlideUp key={c.title} delay={i * 0.05}>
                <HighlightCard icon={c.icon} title={c.title} href={c.href} description={c.description} badge={c.badge} />
              </SlideUp>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
