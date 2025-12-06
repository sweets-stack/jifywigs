// client/src/components/marketing/SeoMeta.tsx
'use client';

import Script from 'next/script';
import { IProduct } from '@jifywigs/shared/types';

interface SeoMetaProps {
  product?: IProduct;
  service?: any;
  training?: any;
  page?: { title: string; description: string; url: string };
}

export const SeoMeta = ({ product, service, training, page }: SeoMetaProps) => {
  // JSON-LD for Product
  const productJsonLd = product
    ? {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.name,
        image: product.images[0],
        description: product.description,
        sku: product._id,
        brand: { '@type': 'Brand', name: 'JifyWigs' },
        offers: {
          '@type': 'Offer',
          url: `${process.env.NEXT_PUBLIC_APP_URL}/shop/${product.slug}`,
          priceCurrency: 'NGN',
          price: product.discountPrice || product.price,
          priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          itemCondition: 'https://schema.org/NewCondition',
          availability: product.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating || 4.5,
          reviewCount: product.reviewCount || 50,
        },
      }
    : null;

  // JSON-LD for Service
  const serviceJsonLd = service
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description: service.description,
        provider: {
          '@type': 'Organization',
          name: 'JifyWigs',
          url: process.env.NEXT_PUBLIC_APP_URL,
        },
        areaServed: 'NG',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'NGN',
          price: service.basePrice,
          url: `${process.env.NEXT_PUBLIC_APP_URL}/services/${service.slug}`,
        },
      }
    : null;

  const ld = productJsonLd || serviceJsonLd || null;

  return (
    <>
      {ld && (
        <Script id="json-ld" type="application/ld+json">
          {JSON.stringify(ld)}
        </Script>
      )}
    </>
  );
};