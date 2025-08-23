import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { fdTranslations } from '@/locales/fumadocs-ui';
import { Tiro_Bangla } from 'next/font/google';
import { Viewport } from "next";
import { baseUrl, createMetadata } from "@/lib/metadata";
import SearchDialog from '@/components/search';

const tiroBangla = Tiro_Bangla({
  subsets: ["bengali", "latin", "latin-ext"],
  weight: ["400"]
});

export const metadata = createMetadata({
  title: {
    template: '%s | ওয়েবএক্স',
    default: 'ওয়েবএক্স',
  },
  description: 'Learn DevOps, Networking, Cloud, AI and more in Bangla with WebX Beyond.',
  metadataBase: new URL(baseUrl),
  alternates: { canonical: '/' },
  keywords: [
    'DevOps', 'Networking', 'Cloud', 'Linux', 'Docker', 'Kubernetes', 'Bangla', 'Tutorial', 'WebX', 'Anis Afifi', 'Programming', 'AI', 'Open Source', 'ডেভঅপস', 'নেটওয়ার্কিং', 'ক্লাউড', 'লিনাক্স', 'ডকার', 'কুবেরনেটিস', 'বাংলা', 'টিউটোরিয়াল', 'ওয়েবএক্স', 'এআই', 'ওপেন সোর্স', 'প্রোগ্রামিং', 'শেখা', 'টেকনোলজি', 'সাইবার সিকিউরিটি', 'নেটওয়ার্ক', 'কোডিং', 'শিক্ষা', 'ওয়েব ডেভেলপমেন্ট', 'গাইড', 'হাতে-কলমে', 'উইকিপিডিয়া', 'বেসিক', 'অ্যাডভান্সড', 'সার্টিফিকেশন', 'ইন্টারভিউ', 'প্রশ্ন', 'উত্তর', 'ক্যারিয়ার', 'প্রজেক্ট', 'কোর্স', 'বই', 'ভিডিও', 'ব্লগ', 'কমিউনিটি'
  ],
  authors: [{ name: 'Anis Afifi' }],
  creator: 'WebX Beyond',
  publisher: 'WebX Beyond',
  category: 'technology',
  openGraph: { locale: 'en_US' },
  twitter: { site: '@money_is_shark' },
  icons: { icon: '/logo.png' },
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#fff' },
  ],
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={tiroBangla.className} suppressHydrationWarning>
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
      {children}
    </RootProvider>
      </body>
    </html>
  );
}
