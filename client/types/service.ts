// client/src/types/service.ts
export interface IService {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  durationMins: number;
  isActive: boolean;
}