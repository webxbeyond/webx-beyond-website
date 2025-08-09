import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      className="[&_.fd-header]:backdrop-blur [&_.fd-header]:bg-white/80 [&_.fd-header]:border-b [&_.fd-header]:border-[#E9E9E9]"
    >
      {children}
      <Footer />
    </HomeLayout>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t bg-fd-card py-12 text-fd-secondary-foreground">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {/*<p className="mb-1 text-sm font-semibold">Anis Afifi</p>*/}
          <p className="text-xs">
           © {new Date().getFullYear()} সর্বস্বত্ত সংরক্ষিত{' '}
            {/*<a*/}
            {/*  href="https://anisafifi.com"*/}
            {/*  rel="noreferrer noopener"*/}
            {/*  target="_blank"*/}
            {/*  className="font-medium"*/}
            {/*>*/}
            {/*  Anis Afifi*/}
            {/*</a>*/}
          </p>
        </div>
      </div>
    </footer>
  );
}
