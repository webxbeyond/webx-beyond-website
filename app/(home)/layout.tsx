import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';
import { Footer } from '@/components/footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions} className="dark:bg-neutral-950">
      {children}
      <Footer />
    </HomeLayout>
  );
}

// Old inline footer removed in favor of shared <Footer /> component.
