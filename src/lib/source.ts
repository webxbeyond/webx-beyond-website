import { docs } from '@/.source';
import { Iconify } from '@/components/iconify';
import { loader } from 'fumadocs-core/source';
import { createElement } from 'react';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: '/',
  icon(icon) {

    if (typeof icon !== "string") {
      return;
    }

    const trimmedIcon = icon.trim();

    return createElement(Iconify, { icon: trimmedIcon, width: 20 });
  },
  source: docs.toFumadocsSource(),
});
