import { IService } from '@jifywigs/shared/types';

export const services: IService[] = [
  {
    _id: 'svc_001',
    name: 'Wig Washing & Conditioning',
    slug: 'washing',
    description: 'Deep clean and nourish treatment',
    basePrice: 3500,
    durationMins: 60,
    isActive: true,
  },
  {
    _id: 'svc_002',
    name: 'Color Refresh',
    slug: 'coloring',
    description: 'Revive faded color',
    basePrice: 8000,
    durationMins: 120,
    isActive: true,
  },
];