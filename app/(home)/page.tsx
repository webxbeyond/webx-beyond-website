import { cva } from "class-variance-authority";

import { File, Files, Folder } from "fumadocs-ui/components/files";
import Link from "next/link";
import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { UwuHero } from "@/app/(home)/uwu";
import { CreateAppAnimation, WhyInteractive } from "./page.client";
// import Img from "./img.png";
import ArchImg from "./arch.png";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Iconify } from "@/components/iconify";
import { WebX } from "./svg";

const badgeVariants = cva(
  "inline-flex size-7 items-center justify-center rounded-full bg-fd-primary font-medium text-fd-primary-foreground"
);

export default function Page() {
  const gridColor =
    "color-mix(in oklab, var(--color-fd-primary) 10%, transparent)";

  return (
    <>
      <div
        className="absolute inset-x-0 top-[200px] h-[250px] max-md:hidden"
        // style={{
        //   background: `repeating-linear-gradient(to right, ${gridColor}, ${gridColor} 1px,transparent 1px,transparent 50px), repeating-linear-gradient(to bottom, ${gridColor}, ${gridColor} 1px,transparent 1px,transparent 50px)`,
        // }}
      />
      <main className="container relative max-w-[1100px] px-2 py-4 z-[2] lg:py-16">
        <div
          style={{
            background:
              "repeating-linear-gradient(to bottom, transparent, color-mix(in oklab, var(--color-fd-primary) 1%, transparent) 500px, transparent 1000px)",
          }}
        >
          <div className="relative">
            <Hero />
            <UwuHero />
          </div>
          <Introduction />
          <div
            className="relative overflow-hidden  px-8 py-16 sm:py-24"
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

function Architecture() {
  return (
    <div className="flex flex-col gap-4  px-8 py-16 md:py-24 lg:flex-row md:px-16">
      <div className="shrink-0 flex-1 font-mono text-start">
        <p className="px-2 py-1 text-sm bg-fd-primary text-fd-primary-foreground font-medium w-fit mb-4">
          Designed with Love
        </p>
        <h2 className="text-xl font-medium mb-4 sm:text-2xl">
          One framework to solve three problems.
        </h2>
        <p className="text-sm text-fd-muted-foreground mb-6">
          Fumadocs makes it easy to build beautiful docs, and bring the power to
          transform content into data, on Next.js.
          <br />
          Every part is handled with love - incredibly flexible and
          customisable.
        </p>
      </div>
      <Image
        src={ArchImg}
        alt="Architecture"
        className="md:-mt-20 ms-auto w-full max-w-[450px] invert dark:invert-0"
      />
    </div>
  );
}

async function Why() {
  return (
    <div className="relative overflow-hidden px-8 py-12 md:p-16 md:min-h-[700px]">
      <p className="text-center font-medium text-fd-muted-foreground">
        Fumadocs offers a complete toolchain to build and maintain your docs.
      </p>
      <WhyInteractive
        typeTable={
          <TypeTable
            type={{
              name: {
                type: "string",
                description: "The name of player",
                default: "hello",
              },
              code: {
                type: "string",
                description: (
                  <CodeBlock lang="ts" code='console.log("Hello World")' />
                ),
              },
            }}
          />
        }
        codeblockSearchRouter={
          <CodeBlock
            lang="ts"
            code={`import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
 
export const { GET } = createFromSource(source);`}
          />
        }
        codeblockTheme={
          <CodeBlock
            lang="css"
            code={`@import 'tailwindcss';
@import 'fumadocs-ui/css/neutral.css';
@import 'fumadocs-ui/css/preset.css';

@source '../node_modules/fumadocs-ui/dist/**/*.js';`}
          />
        }
        codeblockInteractive={
          <CodeBlock
            lang="tsx"
            code={`import { File, Folder, Files } from 'fumadocs-ui/components/files';
 
<Files>
  <Folder name="app" defaultOpen>
    <File name="layout.tsx" />
    <File name="page.tsx" />
    <File name="global.css" />
  </Folder>
  <File name="package.json" />
</Files>`}
          />
        }
        codeblockMdx={
          <CodeBlock
            lang="tsx"
            code={`import { db } from '@/server/db';

export function ProductTable() {
  const products = db.getProducts()
    
  return (
    <ul>
      {products.map(product => <li key={product.key}>{product.name}</li>)}
    </ul>
  );
}

## Products

<ProductTable />`}
          />
        }
      />
    </div>
  );
}

function Highlights(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 border-r md:grid-cols-2 lg:grid-cols-3">
      <Highlight icon="solar:rocket-2-bold-duotone" heading="Light and Fast.">
        Powerful documentation site with Next.js App Router.
      </Highlight>
      <Highlight icon="fluent:rocket-24-filled" heading="Performance.">
        Less client components, less Javascript, optimized images.
      </Highlight>
      <Highlight icon="solar:rocket-2-bold-duotone" heading="Accessibility & UX first.">
        Focus on user experience and accessibility.
      </Highlight>
      <Highlight icon="solar:rocket-2-bold-duotone" heading="Syntax Highlighting.">
        Beautiful syntax highlighter, powered by{" "}
        <a href="https://shiki.style" rel="noreferrer noopener">
          Shiki
        </a>
        .
      </Highlight>
      <Highlight icon="solar:rocket-2-bold-duotone" heading="Automation.">
        Useful remark/rehype plugins. Typescript Twoslash, OpenAPI docs
        generation, and more.
      </Highlight>
      <Highlight icon="solar:rocket-2-bold-duotone" heading="Personalized.">
        Advanced options for customising your theme in a comfortable way.
      </Highlight>
    </div>
  );
}

function Highlight({
  icon,
  heading,
  children,
}: {
  icon: string;
  heading: ReactNode;
  children: ReactNode;
}): React.ReactElement {
  return (
    <div className="border-l border-t px-6 py-12">
      <div className="mb-4 flex flex-row items-center gap-2 text-fd-muted-foreground">
        <Iconify icon={icon} width={22} />
        <h2 className="text-sm font-medium">{heading}</h2>
      </div>
      <span className="font-medium">{children}</span>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative z-[2] flex flex-col overflow-hidden  bg-fd-background px-6 pt-12 max-md:text-center md:px-12 md:pt-16 [.uwu_&]:hidden">

        <WebX className="mb-8 mx-auto md:mx-0 md:max-w-[600px]"/>

      <p className="mb-8 text-fd-muted-foreground md:max-w-[80%] md:text-lg">
        আধুনিক ওয়েব ডেভেলপমেন্ট, ওয়েব৩, এআই, ক্লাউড কম্পিউটিং, ডেভঅপস এবং ভবিষ্যতের প্রযুক্তির দুনিয়ায় আপনাকে স্বাগত!
      </p>
        <p className="mb-8 text-fd-muted-foreground md:max-w-[80%] md:text-lg">
        আমার লক্ষ্য হলো ওয়েব প্রযুক্তির সর্বশেষ ট্রেন্ড, উদ্ভাবনী সমাধান ও বাস্তব অভিজ্ঞতা শেয়ার করা, যাতে আপনি দক্ষতা বাড়িয়ে পরবর্তী প্রজন্মের ওয়েব গড়ে তুলতে পারেন।
        নতুন প্রযুক্তি শিখতে, গভীরে অনুসন্ধান করতে এবং ভবিষ্যতের ওয়েবে নেতৃত্ব দিতে
        <span className="text-fd-foreground"> WebX</span>

         -এর সাথেই থাকুন! 🚀
      </p>
      <div className="inline-flex items-center gap-3 max-md:mx-auto mb-8">
        <Link
          href="/learn"
          className={cn(
            buttonVariants({
              size: "lg",
              className: "rounded-full",
              variant: "secondary",
            })
          )}
        >
          আপনার জার্নি শুরু করুন!
        </Link>
      </div>
      {/*<Image*/}
      {/*  src={Img}*/}
      {/*  alt="preview"*/}
      {/*  className="mb-[-250px] mt-12 min-w-[800px] select-none duration-1000 animate-in fade-in slide-in-from-bottom-12 md:mb-[-340px] md:min-w-[1100px]"*/}
      {/*  priority*/}
      {/*/>*/}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse at top, transparent 80%, color-mix(in oklab, var(--color-fd-primary) 10%, transparent))",
            "linear-gradient(to bottom, var(--color-fd-background) 80%, transparent)",
          ].join(", "),
        }}
      />
    </div>
  );
}

function Introduction(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 border-r md:grid-cols-2">
      <div className="flex flex-col gap-2 border-l border-t px-6 py-12 md:py-16">
        <div className={cn(badgeVariants())}>1</div>
        <h3 className="text-xl font-bold">Code</h3>
        <p className="mb-8 text-fd-muted-foreground">কোড লিখুন।</p>
        <CreateAppAnimation />
      </div>
      <div className="flex flex-col gap-2 border-l border-t px-6 py-12 md:py-16">
        <div className={cn(badgeVariants())}>2</div>
        <h3 className="text-xl font-bold">Eat.</h3>
        <p className="mb-8 text-fd-muted-foreground">স্বাস্থ্যকর খাবার খান।</p>
        <div className="relative flex flex-col">
          <CodeBlock
            lang="mdx"
            wrapper={{ className: "absolute inset-x-2 top-0" }}
            code={`---
title: রেসিপি
---

## ভূমিকা
`}
          />
          <Files className="z-[2] mt-48 shadow-xl">
            <Folder name="content" defaultOpen>
              <File name="index.mdx" />
              <File name="components.mdx" />
            </Folder>
          </Files>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-l border-t px-6 py-12 md:py-16">
        <div className={cn(badgeVariants())}>3</div>
        <h3 className="text-xl font-bold">Sleep.</h3>
        <p className="mb-8 text-fd-muted-foreground">পরিমিত ঘুমান।</p>
      </div>
      <div className="flex flex-col gap-2 border-l border-t px-6 py-12 md:py-16">
        <div className={cn(badgeVariants())}>4</div>
        <h3 className="text-xl font-bold">Repeat.</h3>
        <p className="text-fd-muted-foreground">পুনরায় শুরু করুন।</p>
      </div>
    </div>
  );
}
