import type { Metadata } from 'next/types';

// Determine the canonical base URL for the site (used across SEO helpers)
export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? new URL('http://localhost:3000')
    : new URL('https://webxbeyond.com');

const defaultOgImage = '/banner.png';
const siteName = 'ওয়েবএক্স';
const twitterHandle = '@money_is_shark'; // adjust if you have a dedicated brand handle

export function createMetadata(override: Metadata): Metadata {
  const title = override.title ?? undefined;
  const description = override.description ?? undefined;

  return {
    ...override,
    metadataBase: baseUrl,
    alternates: {
      canonical: override.alternates?.canonical || baseUrl.toString(),
      ...override.alternates,
    },
    openGraph: {
      title,
      description,
      url: baseUrl.toString(),
      images: defaultOgImage,
      siteName,
      type: 'website',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: twitterHandle,
      title,
      description,
      images: [defaultOgImage],
      ...override.twitter,
    },
    icons: {
      icon: '/logo.png',
      ...(typeof override.icons === 'object' && override.icons !== null
        ? override.icons
        : {}),
    },
  };
}
