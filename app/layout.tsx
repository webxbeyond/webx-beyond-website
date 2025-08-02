import './global.css';

import { Tiro_Bangla } from 'next/font/google';
import type { ReactNode } from 'react';
import {Viewport} from "next";
import {baseUrl, createMetadata} from "@/lib/metadata";
import { Provider } from './provider';
import { Body } from './layout.client';
import OfflineProvider from "@/components/offline-provider";

const tiroBangla = Tiro_Bangla({
    subsets: ["bengali", "latin", "latin-ext"],
    weight: ["300", "400" , "500" , "600" , "700" ]
});

export const metadata = createMetadata({
    title: {
        template: '%s | ওয়েবএক্স',
        default: 'ওয়েবএক্স',
    },
    description: 'Learn DevOps, Networking and Others with Anis Afifi',
    metadataBase: baseUrl,
    icons: {
        icon: "/logo.png",
    }
});

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
        { media: '(prefers-color-scheme: light)', color: '#fff' },
    ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={tiroBangla.className} suppressHydrationWarning>
      <Body>
        
      {/* <CustomBanner/> */}
        <Provider>
            <OfflineProvider />
                {children}
        </Provider>
      </Body>
    </html>
  );
}