import { TrainingMode, TrainingStatus } from '@jifywigs/shared/enums';

export interface ITraining {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  durationWeeks: number;
  mode: TrainingMode;
  status: TrainingStatus;
}
