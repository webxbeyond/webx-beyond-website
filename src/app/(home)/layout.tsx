import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { Footer } from '@/components/footer';

export default function Layout({ children }: LayoutProps<'/'>) {
  const opts = baseOptions();
  // // enable the built-in header for home only and remove github + desktop search
  // opts.nav = { ...(opts.nav || {}), enabled: true };

  // // remove the GitHub button
  // opts.githubUrl = undefined;

  // // hide desktop (lg) search component but keep mobile if any
  // opts.searchToggle = {
  //   ...(opts.searchToggle || {}),
  // components: { ...(opts.searchToggle?.components || {}), lg: false },
  // };

  return (
    <>
      <HomeLayout {...opts}>
        {children}
        <Footer />
      </HomeLayout>
    </>
  );
}
