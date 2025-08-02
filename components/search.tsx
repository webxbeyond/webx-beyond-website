'use client';

import { useMode } from '@/app/layout.client';
import { OramaClient } from '@oramacloud/client';
import type { SharedProps } from 'fumadocs-ui/components/dialog/search';
import SearchDialog from 'fumadocs-ui/components/dialog/search-orama';

const client = new OramaClient({
  endpoint: 'https://cloud.orama.run/v1/indexes/www-webxbeyond-com-mpw8wo',
  api_key: 'hZuGtskR0tUJecK4PtjD3AMOXsEPKUzq',
});

export default function CustomSearchDialog(props: SharedProps) {
  return (
    <SearchDialog
      {...props}
      allowClear
      client={client}
      showOrama
    />
  );
}
