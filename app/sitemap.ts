import { source } from '@/lib/source';
import { baseUrl } from '@/lib/metadata';
import type { MetadataRoute } from 'next';

// Dynamic sitemap with real lastModified per page
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({
    url: baseUrl.toString(),
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 1,
  });

  // Each docs page param (slug[]) maps to a source page with potential lastModified info
  for (const { slug } of source.generateParams()) {
    const page = source.getPage(slug);
    if (!page) continue;
    // page.data.lastModified may be Date or string depending on loader; fallback to now
    const lastMod = (page as any).data?.lastModified || new Date().toISOString();
    entries.push({
      url: new URL('/' + slug.join('/'), baseUrl).toString(),
      lastModified: typeof lastMod === 'string' ? lastMod : new Date(lastMod).toISOString(),
      changeFrequency: 'weekly',
      priority: slug.length === 1 ? 0.8 : 0.6,
    });
  }

  return entries;
}
