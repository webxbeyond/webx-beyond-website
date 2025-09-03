import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions, linkItems, logo } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/'>) {
   const base = baseOptions();
  return (
    <>
      <DocsLayout
     {...base}
      tree={source.pageTree}
      // just icon items
      links={linkItems.filter((item) => item.type === 'icon')}
      nav={{
        ...base.nav,
        title: <>{logo}</>,
        // children: (
        //   <AISearchTrigger
        //     className={cn(
        //       buttonVariants({
        //         variant: 'secondary',
        //         size: 'sm',
        //         className:
        //           'absolute left-1/2 top-1/2 -translate-1/2 text-fd-muted-foreground rounded-full gap-2 md:hidden',
        //       }),
        //     )}
        //   >
        //     <Sparkles className="size-4.5 fill-current" />
        //     Ask AI
        //   </AISearchTrigger>
        // ),
      }}
      sidebar={{
        tabs: false,
        // tabs: {
        //   transform(option, node) {
        //     const meta = source.getNodeMeta(node);
        //     if (!meta || !node.icon) return option;

        //     return {
        //       ...option,
        //       description: false,
        //       icon: (
        //         <div
                  
        //         >
        //           {node.icon}
        //         </div>
        //       ),
        //     };
        //   },
        // },
      }}
     >
      {children}
    </DocsLayout>
  </>
  );
}
