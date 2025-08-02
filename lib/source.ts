import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createElement } from 'react';
import { Iconify } from '@/components/iconify';

export const source = loader({
  baseUrl: '/learn',
  icon(icon) {

    if (typeof icon !== "string") {
      return;
    }

    const trimmedIcon = icon.trim();

    return createElement(Iconify, { icon: trimmedIcon, width: 20 });
  },
  source: docs.toFumadocsSource(),
});
