import { NextResponse } from 'next/server';
import { baseUrl } from '@/lib/metadata';
import { source } from '@/lib/source';

export const revalidate = 3600; // 1h

export async function GET() {
  const items: string[] = [];
  for (const { slug } of source.generateParams()) {
    const page = source.getPage(slug);
    if (!page) continue;
    const { title, description, lastModified } = await page.data;
    const url = new URL('/' + slug.join('/'), baseUrl).toString();
    items.push(`\n  <item>\n    <title>${escapeXml(title || slug[slug.length-1])}</title>\n    <link>${url}</link>\n    <guid>${url}</guid>\n    <description>${escapeXml(description || '')}</description>\n    <pubDate>${new Date(lastModified || Date.now()).toUTCString()}</pubDate>\n  </item>`);
  }
  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>WebX Beyond Feed</title>\n  <link>${baseUrl.toString()}</link>\n  <description>Latest learning pages from WebX Beyond</description>${items.join('')}\n</channel>\n</rss>`;
  return new NextResponse(rss, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

function escapeXml(str: string) {
  return str.replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;','\'':'&apos;'}[c] as string));
}
