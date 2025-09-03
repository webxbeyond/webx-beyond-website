
import { source } from '@/lib/source';
import { baseUrl } from '@/lib/metadata';
import { NextResponse } from 'next/server';

// Serve XML sitemap for Google Search Console
export async function GET() {
  const urls = [];

  // Homepage
  urls.push({
    loc: baseUrl.toString(),
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 1,
  });

  for (const { slug } of source.generateParams()) {
    const page = source.getPage(slug);
    if (!page) continue;
    let lastmod: string | undefined;
    try {
      const data: unknown = await page.data;
      if (data && typeof data === 'object' && 'lastModified' in data) {
        const value = (data as { lastModified?: string | Date }).lastModified;
        if (value instanceof Date) lastmod = value.toISOString();
        else if (typeof value === 'string') lastmod = value;
      }
    } catch {}
    if (!lastmod) lastmod = new Date().toISOString();
    urls.push({
      loc: new URL('/' + slug.join('/'), baseUrl).toString(),
      lastmod,
      changefreq: 'weekly',
      priority: slug.length === 1 ? 0.8 : 0.6,
    });
  }

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n')}\n</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
