import { Schema, model } from 'mongoose'; // Add model import
import { TrainingMode } from '../enums';

export const TrainingSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    studentPhone: { type: String, required: true },
    courseName: { type: String, required: true },
    courseSlug: { type: String, required: true },
    mode: { 
      type: String, 
      enum: Object.values(TrainingMode), 
      default: TrainingMode.PHYSICAL 
    },
    amountPaid: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: Date,
    status: { 
      type: String, 
      enum: ['enrolled', 'in_progress', 'completed', 'cancelled'],
      default: 'enrolled'
    },
    certificateIssued: { type: Boolean, default: false },
    certificateUrl: String,
    notes: String,
    assignedInstructor: { type: Schema.Types.ObjectId, ref: 'User' },
    completedAt: Date,
  },
  { timestamps: true }
);

export const Training = model('Training', TrainingSchema); // ADD THIS LINE

export interface ITrainingDocument extends Document {
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseName: string;
  courseSlug: string;
  mode: TrainingMode;
  amountPaid: number;
  totalAmount: number;
  startDate: Date;
  endDate?: Date;
  status: 'enrolled' | 'in_progress' | 'completed' | 'cancelled';
  certificateIssued: boolean;
  certificateUrl?: string;
  notes?: string;
  assignedInstructor?: string;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}