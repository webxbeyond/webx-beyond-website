import { source } from "@/lib/source";
import {
  DocsBody,
  DocsPage,
  DocsTitle, 
} from "fumadocs-ui/page";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import YouTube from "@/components/youtube";
import { Iconify } from "@/components/iconify";
import { LLMCopyButton, ViewOptions } from "@/components/page-actions";
import { createMetadata } from '@/lib/metadata';
import { metadataImage } from '@/lib/metadata-image';
import { baseUrl } from '@/lib/metadata';
// -------------------------------------------------------------------

export default async function Page(props: PageProps<"/[...slug]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: "clerk", single: false }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsBody>
        <div className="flex flex-row gap-2 items-center border-b pt-2 pb-4 mb-4">
          <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
          <ViewOptions
            markdownUrl={`${page.url}`}
            githubUrl={(() => {
              // If the page is an index page (no slug or last slug is a section), link to index.mdx in the folder
              if (page.slugs.length === 1) {
                return `https://github.com/webxbeyond/webx-beyond-website/edit/main/content/learn/${page.slugs
                  .slice(0, 1)
                  .join("/")}/index.mdx`;
              }
              return `https://github.com/webxbeyond/webx-beyond-website/edit/main/content/learn/${page.slugs.join(
                "/"
              )}.mdx`;
            })()}
          />
        </div>
        <MDXContent
          components={getMDXComponents({
            YouTube,
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
        <div className="mt-10 flex flex-col items-end border-t pt-4 gap-2">
          <a
            href={(() => {
              // If the page is an index page (no slug or last slug is a section), link to index.mdx in the folder
              if (page.slugs.length === 1) {
                return `https://github.com/webxbeyond/webx-beyond-website/edit/main/content/learn/${page.slugs
                  .slice(0, 1)
                  .join("/")}/index.mdx`;
              }
              return `https://github.com/webxbeyond/webx-beyond-website/edit/main/content/learn/${page.slugs.join(
                "/"
              )}.mdx`;
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
  const slugPath = page.slugs.join('/');
  const canonical = `${baseUrl}/${slugPath}`;
  // Generate topic-specific OG image variant (using metadataImage helper)
  return createMetadata(
    metadataImage.withImage(page.slugs, {
      title: page.data.title,
      description: page.data.description,
      keywords: page.data.keywords,
      alternates: {
        canonical,
        languages: {
          'en-US': canonical, // placeholder: same URL; adjust when English version exists
          'bn-BD': canonical,
        },
      },
      openGraph: { url: `/${slugPath}` },
      twitter: { 
        title: page.data.title, 
        description: page.data.description,
      },
    }),
  );
}

export function generateStaticParams(): { slug: string[] }[] {
  return source.generateParams();
}