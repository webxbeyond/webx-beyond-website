import Link from "next/link";
import type { ReactNode } from "react";
import { Iconify } from "@/components/iconify";
import { HighlightCard } from '@/components/highlight-card';
import { WebX } from "./svg";
import { FadeIn, SlideUp } from '@/components/motion';
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
        <div>
          <div className="relative">
            <FadeIn>
              <Hero />
            </FadeIn>
            <UwuHero />
          </div>
          <SelectTopics />
          <Topics />
          <FeaturedLessons />
          <div
            className="relative overflow-hidden px-8 py-16 sm:py-24"
            style={{
              backgroundImage:
                "radial-gradient(circle at bottom center, var(--color-fd-secondary), var(--color-fd-background))",
            }}
          >
            <h2 className="bg-gradient-to-b from-fd-primary to-fd-foreground/40 bg-clip-text text-center text-2xl font-semibold text-transparent sm:text-3xl pt-3">
              একেবারেই ফ্রিতে শিখুন
            </h2>
          </div>
          <Highlights />
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
function Highlights() {
  return (
    <section className="px-6 py-12 md:px-12 md:py-16">
      <h2 className="sr-only">Highlights</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SlideUp delay={0.0}>
          <Highlight icon="ph:rocket-launch-duotone" heading="আধুনিক ওয়েব ডেভেলপমেন্ট">
            Next.js, React, Tailwind—বাস্তব উদাহরণ আর প্রজেক্ট-কেন্দ্রিক শেখা。
          </Highlight>
        </SlideUp>
        <SlideUp delay={0.05}>
          <Highlight icon="ph:cube-duotone" heading="ওয়েব৩ প্রস্তুতি">
            ব্লকচেইন কনসেপ্ট, স্মার্ট কন্ট্রাক্ট ও ডিস্ট্রিবিউটেড ওয়েবের বেসিক。
          </Highlight>
        </SlideUp>
        <SlideUp delay={0.1}>
          <Highlight icon="ph:brain-duotone" heading="এআই-ফার্স্ট লার্নিং">
            মডেল, এআই টুলিং, এবং ডেভেলপার ওয়ার্কফ্লোতে এআই ইন্টিগ্রেশন。
          </Highlight>
        </SlideUp>
        <SlideUp delay={0.15}>
          <Highlight icon="ph:cloud-duotone" heading="ক্লাউড ও ডেভঅপস">
            AWS/Google Cloud, CI/CD, কন্টেইনার, কুবেরনেটিস—ডিপ্লয়মেন্ট প্র্যাকটিস。
          </Highlight>
        </SlideUp>
        <SlideUp delay={0.2}>
          <Highlight icon="ph:sparkle-duotone" heading="পারফরম্যান্স ও অ্যাক্সেসিবিলিটি">
            দ্রুত, হালকা ও ব্যবহারবান্ধব অভিজ্ঞতার উপর বিশেষ জোর。
          </Highlight>
        </SlideUp>
        <SlideUp delay={0.25}>
          <Highlight icon="ph:book-open-text-duotone" heading="ফ্রি ও ওপেন কনটেন্ট">
            বাংলায় বিজ্ঞানের মতো সাজানো শেখার রিসোর্স—সবাইয়ের জন্য উন্মুক্ত。
          </Highlight>
        </SlideUp>
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
      <h2 className="text-center text-2xl font-semibold sm:text-3xl mb-8">টপিকস এক্সপ্লোর করুন</h2>
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
      <h2 className="text-center text-2xl font-semibold sm:text-3xl mb-8">বিষয় নির্বাচন করো!</h2>
      <p className="text-center text-fd-muted-foreground mb-10 max-w-2xl mx-auto">নিচের যেকোনো একটি বিষয় নির্বাচন করে শিখতে থাকো।</p>
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
