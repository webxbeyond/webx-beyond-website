import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { fdTranslations } from '@/locales/fumadocs-ui';
import { Tiro_Bangla } from 'next/font/google';
import { Viewport } from "next";
import { baseUrl, createMetadata } from "@/lib/metadata";
import SearchDialog from '@/components/search';
import OfflineProvider from '@/components/offline-provider';
import OfflineToast from '@/components/offline-toast.client';
import Loader from '@/components/loader.client';
import CursorContext from '@/components/cursor-context.client';
import NavbarScroll from '@/components/navbar-scroll.client';

const tiroBangla = Tiro_Bangla({
  subsets: ["bengali", "latin", "latin-ext"],
  weight: ["400"]
});

export const metadata = createMetadata({
  title: {
    template: '%s | ওয়েবএক্স বিওয়ান্ড',
    default: 'ওয়েবএক্স বিওয়ান্ড',
  },
  description: 'ওয়েবএক্স বিয়ন্ড একটি আধুনিক ওয়েবসাইট, যেখানে আপনি এআই, ডেভ-অপস, প্রোগ্রামিং, ব্লকচেইন, সাইবার নিরাপত্তা, এবং আরও অনেক বিষয়ে শিক্ষামূলক কনটেন্ট পাবেন। আমাদের লক্ষ্য প্রযুক্তি শিক্ষাকে সহজ, সবার জন্য উন্মুক্ত এবং ব্যবহারিক করে তোলা।',
  metadataBase: new URL(baseUrl),
  alternates: { canonical: '/' },
  keywords: [
    'DevOps', 'Networking', 'Cloud', 'Linux', 'Docker', 'Kubernetes', 'Bangla', 'Tutorial', 'WebX', 'Anis Afifi', 'Programming', 'AI', 'Open Source', 'ডেভঅপস', 'নেটওয়ার্কিং', 'ক্লাউড', 'লিনাক্স', 'ডকার', 'কুবেরনেটিস', 'বাংলা', 'টিউটোরিয়াল', 'ওয়েবএক্স', 'এআই', 'ওপেন সোর্স', 'প্রোগ্রামিং', 'শেখা', 'টেকনোলজি', 'সাইবার সিকিউরিটি', 'নেটওয়ার্ক', 'কোডিং', 'শিক্ষা', 'ওয়েব ডেভেলপমেন্ট', 'গাইড', 'হাতে-কলমে', 'উইকিপিডিয়া', 'বেসিক', 'অ্যাডভান্সড', 'সার্টিফিকেশন', 'ইন্টারভিউ', 'প্রশ্ন', 'উত্তর', 'ক্যারিয়ার', 'প্রজেক্ট', 'কোর্স', 'বই', 'ভিডিও', 'ব্লগ', 'কমিউনিটি'
  ],
  authors: [{ name: 'Anis Afifi' }],
  creator: 'WebX Beyond',
  publisher: 'WebX Beyond',
  category: 'technology',
  openGraph: {
    locale: 'bn_BD',
    type: 'website',
    title: 'ওয়েবএক্স বিওয়ান্ড',
    description: 'ওয়েবএক্স বিয়ন্ড একটি আধুনিক ওয়েবসাইট, যেখানে আপনি এআই, ডেভ-অপস, প্রোগ্রামিং, ব্লকচেইন, সাইবার নিরাপত্তা, এবং আরও অনেক বিষয়ে শিক্ষামূলক কনটেন্ট পাবেন।',
    url: baseUrl,
    siteName: 'ওয়েবএক্স বিওয়ান্ড',
    images: [
      {
        url: '/banner.png',
        width: 512,
        height: 512,
        alt: 'ওয়েবএক্স বিওয়ান্ড',
      },
    ],
  },
  twitter: {
    site: '@webxbeyond',
    card: 'summary_large_image',
    title: 'ওয়েবএক্স বিওয়ান্ড',
    description: 'ওয়েবএক্স বিয়ন্ড একটি আধুনিক ওয়েবসাইট, যেখানে আপনি এআই, ডেভ-অপস, প্রোগ্রামিং, ব্লকচেইন, সাইবার নিরাপত্তা, এবং আরও অনেক বিষয়ে শিক্ষামূলক কনটেন্ট পাবেন।',
  images: ['/banner.png'],
  },
  icons: { icon: '/logo.png' },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
  'max-snippet': -1,
  'max-image-preview': 'large',
  'max-video-preview': -1,
    },
  },
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#fff' },
  ],
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
  <html lang="bn" className={tiroBangla.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            SearchDialog,
          }}
          i18n={{
            locales: [
              { name: 'English', locale: 'en' },
              { name: 'বাংলা', locale: 'bn' },
            ],
            locale: 'bn',
            translations: fdTranslations['bn'],
          }}
        >
          <OfflineProvider />
          <OfflineToast />
          <Loader />
          <CursorContext />
          <NavbarScroll />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
