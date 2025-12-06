// shared/types/marketing.ts
export interface ISubscriber {
  _id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  subscribedAt: Date;
  confirmedAt?: Date;
  isConfirmed: boolean;
  tags?: string[];
  source: 'footer' | 'homepage' | 'popup';
}