import type { Metadata } from 'next';
import { DocsPage, DocsBody, DocsTitle, DocsDescription, DocsCategory } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { type ComponentProps, type FC, type ReactElement, type ReactNode } from 'react';
import defaultComponents from 'fumadocs-ui/mdx';
import { Popup, PopupContent, PopupTrigger } from 'fumadocs-twoslash/ui';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Callout } from 'fumadocs-ui/components/callout';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import * as Preview from '@/components/preview';
import { createMetadata } from '@/lib/metadata';
import { source } from '@/lib/source';
import { Wrapper } from '@/components/preview/wrapper';
import { AutoTypeTable } from '@/components/type-table';
import { metadataImage } from '@/lib/metadata-image';
import { baseUrl } from '@/lib/metadata';
import { File, Folder, Files } from 'fumadocs-ui/components/files';
import { Mermaid } from '@theguild/remark-mermaid/mermaid';
import { Iconify } from '@/components/iconify';
import YouTube from '@/components/youtube';
import Roadmaps from '@/components/roadmaps';
import SubnetCalculator from '@/components/subnet-calculator';

function PreviewRenderer({ preview }: { preview: string }): ReactNode {
  if (preview && preview in Preview) {
    const Comp = Preview[preview as keyof typeof Preview];
    return <Comp />;
  }
  return null;
}

export const dynamicParams = false;
export const revalidate = false;

export default async function Page(props: { params: Promise<{ slug: string[] }>; }): Promise<ReactElement> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const preview = page.data.preview;
  const { body: Mdx, toc, lastModified } = await page.data;
  return (
    <DocsPage
      toc={toc}
      lastUpdate={lastModified}
      full={page.data.full}
      tableOfContent={{ style: 'clerk', single: false }}
      article={{ className: 'max-sm:pb-16' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: page.data.title,
            description: page.data.description,
            inLanguage: 'bn',
            author: { '@type': 'Person', name: 'Anis Afifi' },
            publisher: { '@type': 'Organization', name: 'WebX Beyond' },
            url: new URL('/' + page.slugs.join('/'), baseUrl).toString(),
            dateModified: lastModified,
          }),
        }}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody className="text-fd-foreground/80">
        {preview ? <PreviewRenderer preview={preview} /> : null}
        <Mdx
          components={{
            ...defaultComponents,
            Popup,
            PopupContent,
            PopupTrigger,
            Tabs,
            Tab,
            Mermaid,
            TypeTable,
            AutoTypeTable,
            Accordion,
            Accordions,
            Wrapper,
            File,
            Folder,
            Files,
            Iconify,
            YouTube,
            Roadmaps,
            SubnetCalculator,
            blockquote: Callout as unknown as FC<ComponentProps<'blockquote'>>,
            DocsCategory: () => <DocsCategory page={page} from={source} />,
          }}
        />
        {page.data.index ? <DocsCategory page={page} from={source} /> : null}
        <div className="mt-10 flex flex-col items-end gap-2">
          <a
            href={(() => {
              // If the page is an index page (no slug or last slug is a section), link to index.mdx in the folder
              if (page.slugs.length === 1) {
                return `https://github.com/webxbeyond/webx-beyond-website/edit/main/content/learn/${page.slugs.slice(0, 1).join('/')}/index.mdx`;
              }
              return `https://github.com/webxbeyond/webx-beyond-website/edit/main/content/learn/${page.slugs.join('/')}.mdx`;
            })()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-fd-muted-foreground hover:text-fd-primary underline flex items-center gap-1"
          >
            <Iconify icon="flowbite:edit-solid" width={16} />
            কোথাও ভুল হয়েছে? এডিট সাজেস্ট করুন!
          </a>
        </div>

      </DocsBody>
    </DocsPage>
  );
}

export async function generateMetadata(props: { params: Promise<{ slug: string[] }>; }): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const description = page.data.description ?? 'ওয়েবএক্স';
  const slugPath = page.slugs.join('/');
  const canonical = `${baseUrl}/${slugPath}`;
  // Generate topic-specific OG image variant (using metadataImage helper)
  return createMetadata(
    metadataImage.withImage(page.slugs, {
      title: page.data.title,
      description,
      alternates: {
        canonical,
        languages: {
          'en-US': canonical, // placeholder: same URL; adjust when English version exists
          'bn-BD': canonical,
        },
      },
      openGraph: { url: `/${slugPath}` },
      twitter: { title: page.data.title, description },
    }),
  );
}

export function generateStaticParams(): { slug: string[] }[] {
  return source.generateParams();
}

// Helper: Convert date to Bangla format
function banglaDate(date: string | number | Date): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'তারিখ পাওয়া যায়নি';
  const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  const toBn = (num: number|string) => {
    return String(num).replace(/[0-9]/g, (digit: string) => bnDigits[parseInt(digit, 10)]);
  };
  const months = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
  const day = toBn(d.getDate());
  const month = months[d.getMonth()];
  const year = toBn(d.getFullYear());
  let hour = d.getHours();
  const min = toBn(d.getMinutes().toString().padStart(2,'0'));
  const ampm = hour >= 12 ? 'AM' : 'PM';
  hour = hour % 12 || 12;
  return `${day} ${month} ${year}, ${toBn(hour)}:${min} ${ampm}`;
}