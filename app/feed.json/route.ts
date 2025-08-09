import { NextResponse } from 'next/server';
import { baseUrl } from '@/lib/metadata';
import { source } from '@/lib/source';

export const revalidate = 3600; // 1h

export async function GET() {
  interface FeedItem {
    id: string;
    url: string;
    title: string;
    content_text: string;
    date_modified: string;
    language: string;
  }
  const items: FeedItem[] = [];
  for (const { slug } of source.generateParams()) {
    const page = source.getPage(slug);
    if (!page) continue;
    const { title, description, lastModified } = await page.data;
    items.push({
      id: slug.join('/'),
      url: new URL('/' + slug.join('/'), baseUrl).toString(),
      title: title || slug[slug.length - 1],
      content_text: description || '',
      date_modified: lastModified || new Date().toISOString(),
      language: 'bn'
    });
  }
  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'WebX Beyond Feed',
    home_page_url: baseUrl.toString(),
    feed_url: new URL('/feed.json', baseUrl).toString(),
    description: 'Latest learning pages from WebX Beyond',
    language: 'bn',
  items
  };
  return NextResponse.json(feed, { headers: { 'Cache-Control': 'public, max-age=0, s-maxage=3600' } });
}
