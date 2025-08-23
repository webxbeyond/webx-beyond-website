import { source } from '@/lib/source';
import { baseUrl } from '@/lib/metadata';
import type { MetadataRoute } from 'next';

// Dynamic sitemap with real lastModified per page
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    let lastModified: string | undefined;
    try {
      const data: unknown = await page.data; // data may or may not include lastModified
      if (data && typeof data === 'object' && 'lastModified' in data) {
        const value = (data as { lastModified?: string | Date }).lastModified;
        if (value instanceof Date) lastModified = value.toISOString();
        else if (typeof value === 'string') lastModified = value;
      }
    } catch {
      // ignore data errors
    }
    if (!lastModified) lastModified = new Date().toISOString();
    entries.push({
      url: new URL('/' + slug.join('/'), baseUrl).toString(),
      lastModified,
      changeFrequency: 'weekly',
      priority: slug.length === 1 ? 0.8 : 0.6,
    });
  }

  return entries;
}
