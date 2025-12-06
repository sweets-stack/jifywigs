// server/src/schemas/Admin.ts
import { Schema, model } from 'mongoose';

const AdminSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    permissions: [{ type: String }],
  },
  { timestamps: true }
);

export const Admin = model('Admin', AdminSchema); // ✅ EXPORT HERE