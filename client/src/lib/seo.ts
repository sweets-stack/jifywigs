// client/src/lib/seo.ts
import { Metadata } from 'next';

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

export const generateSeo = (config: SeoConfig): Metadata => {
  const baseUrl = 'https://jifywigs.com';
  const imageUrl = config.image || `${baseUrl}/og-image.jpg`;

  return {
    title: config.title,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.url || baseUrl,
      siteName: 'JifyWigs',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      locale: 'en_NG',
      type: 'website', // ✅ Only 'website' or 'article' allowed
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [imageUrl],
    },
  };
};