import { ITraining } from '@jifywigs/shared/types';
import { TrainingMode, TrainingStatus } from '@jifywigs/shared/enums';

export const trainingCourses: ITraining[] = [
  {
    _id: 'trn_001',
    title: 'Wig Mastery',
    slug: 'wig-mastery',
    description: '4-week certification',
    price: 60000,
    currency: 'NGN',
    durationWeeks: 4,
    mode: TrainingMode.ONLINE,
    instructor: { name: 'Aunty Jify' },
    capacity: 50,
    enrolledCount: 32,
    status: TrainingStatus.PUBLISHED,
  },
];