import Link, { type LinkProps } from 'next/link';
import Image from 'next/image';
import Spot from '@/public/spot.png';
import { Iconify } from '@/components/iconify';

export default function DocsPage(): React.ReactElement {
  return (
    <main className="container flex flex-col items-center py-16 text-center z-[2]">
      <div className="absolute inset-0 z-[-1] overflow-hidden duration-1000 animate-in fade-in [perspective:2000px]">
        <div
          className="absolute bottom-[20%] left-1/2 size-[1200px] origin-bottom bg-fd-primary/30 opacity-30"
          style={{
            transform: 'rotateX(75deg) translate(-50%, 400px)',
            backgroundImage:
              'radial-gradient(50% 50% at center,transparent,var(--color-fd-background)), repeating-linear-gradient(to right,var(--color-fd-primary),var(--color-fd-primary) 1px,transparent 2px,transparent 100px), repeating-linear-gradient(to bottom,var(--color-fd-primary),var(--color-fd-primary) 2px,transparent 3px,transparent 100px)',
          }}
        />
      </div>
      <div className="absolute inset-0 z-[-1] select-none overflow-hidden opacity-30">
        <Image
          alt="spot"
          src={Spot}
          sizes="100vw"
          className="size-full min-w-[800px] max-w-fd-container"
          priority
        />
      </div>
      <h1 className="mb-4 text-4xl font-semibold md:text-5xl">
        বিষয় নির্বাচন করো!
      </h1>
      <p className="text-fd-muted-foreground">
       নিচের যেকোনো একটি বিষয় নির্বাচন করে শিখতে থাকো।
      </p>
      <div className="mt-16 grid grid-cols-1 gap-4 text-left md:grid-cols-2">
      <Item href="/learn/dev-ops">
      <Icon>
  <Iconify icon="lets-icons:terminal"/>
  </Icon>
  <h2 className="mb-2 text-lg font-semibold">ডেভঅপস <span className="text-xs bg-[#0071e3] text-white px-2 py-1 rounded">চলমান</span></h2>
  <p className="text-sm text-fd-muted-foreground">
    সফটওয়্যার ডেভেলপমেন্ট এবং আইটি অপারেশনের সংযোগস্থলে কার্যকরী প্রক্রিয়াগুলোর সমন্বয়।
  </p>
</Item>

<Item href="/learn/ai">
<Icon>
  <Iconify icon="eos-icons:ai"/>
  </Icon>
  <h2 className="mb-2 text-lg font-semibold">এআই (AI) <span className="text-xs bg-[#0071e3] text-white px-2 py-1 rounded">চলমান</span></h2>
  <p className="text-sm text-fd-muted-foreground">
    বর্তমান সময়ের রিভ্যুলেশনারি ইনভেনশন।
  </p>
</Item>

<Item href="/learn/nodejs">
<Icon>
  <Iconify icon="famicons:logo-nodejs"/>
  </Icon>
  <h2 className="mb-2 text-lg font-semibold">নোড জেএস <span className="text-xs bg-[#0071e3] text-white px-2 py-1 rounded">চলমান</span></h2>
  <p className="text-sm text-fd-muted-foreground">
    বর্তমান সময়ে সবচেয়ে জনপ্রিয় সার্ভার সাইড জাভাস্ক্রিপ্ট রানটাইম এবং একটি লাইব্রেরি।
  </p>
</Item>

<Item href="/learn/html-css">
<Icon>
  <Iconify icon="famicons:logo-nodejs"/>
  </Icon>
  <h2 className="mb-2 text-lg font-semibold">HTML ও CSS <span className="text-xs bg-[#0071e3] text-white px-2 py-1 rounded">চলমান</span></h2>
  <p className="text-sm text-fd-muted-foreground">
    বিল্ডিং ব্লক অফ ওয়েবসাইট।
  </p>
</Item>

<Item href="/learn/cheatsheet">
<Icon>
  <Iconify icon="fluent:notebook-16-regular"/>
  </Icon>
  <h2 className="mb-2 text-lg font-semibold">সংক্ষিপ্ত নোট (Cheatsheets)</h2>
  <p className="text-sm text-fd-muted-foreground">
    আমার প্রোগ্রামিং শেখার ব্যাক্তিগত নোটবুক।
  </p>
</Item>

<Item href="/learn">
<Icon>
  <Iconify icon="material-symbols:cable-sharp"/>
  </Icon>
  <h2 className="mb-2 text-lg font-semibold">নেটওয়ার্কিং <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">শীঘ্রই আসছে</span></h2>
  <p className="text-sm text-fd-muted-foreground">
    বিভিন্ন কম্পিউটার এবং ডিভাইসের মধ্যে সংযোগ স্থাপন ও ডেটা আদান-প্রদান সংক্রান্ত প্রযুক্তি।
  </p>
</Item>

<Item href="/learn">
<Icon>
  <Iconify icon="icon-park-twotone:blockchain"/>
  </Icon>
  <h2 className="mb-2 text-lg font-semibold flex items-center gap-2">
    ব্লকচেইন <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">শীঘ্রই আসছে</span>
  </h2>
  <p className="text-sm text-fd-muted-foreground">
    বিকেন্দ্রীভূত ও নিরাপদ তথ্য সংরক্ষণ ব্যবস্থা, যা ক্রিপ্টোকারেন্সি এবং অন্যান্য প্রযুক্তির ভিত্তি।
  </p>
</Item>

<Item href="/learn">
<Icon>
  <Iconify icon="solar:server-bold-duotone"/>
  </Icon>
  <h2 className="mb-2 text-lg font-semibold">হোম সার্ভার <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">শীঘ্রই আসছে</span></h2>
  <p className="text-sm text-fd-muted-foreground">
    ব্যক্তিগত ব্যবহারের জন্য নির্মিত সার্ভার, যা ফাইল শেয়ারিং, স্ট্রিমিং ও অন্যান্য সেবার জন্য ব্যবহৃত হয়।
  </p>
</Item>
<Item href="/learn">
<Icon>
  <Iconify icon="ph:terminal-duotone"/>
  </Icon>
  <h2 className="mb-2 text-lg font-semibold">ইথিক্যাল হ্যাকিং <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">শীঘ্রই আসছে</span></h2>
  <p className="text-sm text-fd-muted-foreground">
    হ্যাকিং কৌশল শিখে নিজেকে এবং অন্যকে নিরাপদ করার পথে এগিয়ে যাও।
  </p>
</Item>

      </div>
    </main>
  );
}

function Icon({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div
      className="mb-2 size-9 rounded-lg border p-1.5 shadow-fd-primary/30"
      style={{
        boxShadow: 'inset 0px 8px 8px 0px var(--tw-shadow-color)',
      }}
    >
      {children}
    </div>
  );
}

function Item(
  props: LinkProps & { children: React.ReactNode },
): React.ReactElement {
  return (
    <Link
      {...props}
      className="rounded-2xl border border-transparent p-6 shadow-lg"
      style={{
        backgroundImage:
          'linear-gradient(to right bottom, var(--color-fd-background) 10%, var(--color-fd-accent), var(--color-fd-background) 60%),' +
          'linear-gradient(to right bottom, rgb(40,40,40) 10%, rgb(180,180,180), rgb(30,30,30) 60%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
    >
      {props.children}
    </Link>
  );
}
