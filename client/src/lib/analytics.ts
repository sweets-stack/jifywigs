// client/src/lib/analytics.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/ga4/events
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// eCommerce events
export const trackViewProduct = (product: { id: string; name: string; price: number }) => {     
  event({
    action: 'view_item',
    category: 'Ecommerce',
    label: product.name,
    value: product.price,
  });
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    (window as any).gtag('event', 'view_item', {
      currency: 'NGN',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          currency: 'NGN',
        },
      ],
    });
  }
};

export const trackAddToCart = (product: { id: string; name: string; price: number; quantity: number }) => {
  event({
    action: 'add_to_cart',
    category: 'Ecommerce',
    label: product.name,
  });
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    (window as any).gtag('event', 'add_to_cart', {
      currency: 'NGN',
      value: product.price * product.quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: product.quantity,
        },
      ],
    });
  }
};

// Tracking page specific event
export const trackViewTrackingPage = (trackingId: string, type: string) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    (window as any).gtag('event', 'view_tracking', {
      event_category: 'Tracking',
      event_label: `${type}: ${trackingId}`,
    });
  }
};