'use client';

import { RootProvider } from 'fumadocs-ui/provider';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';

const SearchDialog = dynamic(() => import('@/components/search'), {
  ssr: false,
});

const inject = `
const urlParams = new URLSearchParams(window.location.search);
const uwuParam = urlParams.get("uwu");

if (typeof uwuParam === 'string') {
    localStorage.setItem('uwu', uwuParam);
}

const item = localStorage.getItem('uwu')
    
if (item === 'true') {
    document.documentElement.classList.add("uwu")
}    

// TOC heading translation fallback (replace 'On this page' -> Bangla)
function __wbxTranslateToc(){
  try {
    const target = 'On this page';
    const bangla = 'এই পৃষ্ঠায়';
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    let node;
    while((node = walker.nextNode())){
      if(node.childElementCount === 0 && node.textContent && node.textContent.trim() === target){
        node.textContent = bangla;
      }
    }
  } catch(e) {}
}
__wbxTranslateToc();
new MutationObserver(()=>{__wbxTranslateToc();}).observe(document.body,{subtree:true,childList:true});
`;

export function Provider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <RootProvider
      search={{
        enabled: false,
        SearchDialog,
      }}
      // @ts-expect-error: i18n prop may not be typed in current version but supported at runtime
      i18n={{ toc: 'এই পৃষ্ঠায়', search: 'সার্চ', nextPage: 'পরবর্তী', previousPage: 'পূর্ববর্তী' }}
    >
      <TooltipProvider>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: inject }}
        />
        {children}
      </TooltipProvider>
    </RootProvider>
  );
}
