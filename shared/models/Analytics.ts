import { Schema, model, Document } from 'mongoose'; // Add model import

export const AnalyticsSchema = new Schema(
  {
    date: { type: Date, required: true, index: true },
    metric: { type: String, required: true },
    value: { type: Number, required: true },
    category: String,
    metadata: Schema.Types.Mixed,
  },
  { timestamps: true }
);

// Compound index for quick queries
AnalyticsSchema.index({ date: 1, metric: 1 });

export const Analytics = model('Analytics', AnalyticsSchema); // ADD THIS LINE

export interface IAnalyticsDocument extends Document {
  date: Date;
  metric: string;
  value: number;
  category?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}