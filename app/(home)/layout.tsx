import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { useEffect } from 'react';
import { baseOptions } from '@/app/layout.config';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      className="[&_.fd-header]:sticky [&_.fd-header]:top-0 [&_.fd-header]:z-50 [&_.fd-header]:backdrop-blur [&_.fd-header]:bg-white/80 [&_.fd-header]:border-b [&_.fd-header]:border-[#E9E9E9] [&_.fd-header.scrolled]:bg-white/95 [&_.fd-header.scrolled]:shadow-sm"
    >
      <HeaderScrollScript />
      {children}
      <Footer />
    </HomeLayout>
  );
}

function HeaderScrollScript() {
  // runs on client only (small inline script) to toggle shadow after scroll
  useEffect(() => {
    const header = document.querySelector('.fd-header');
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 4) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
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
