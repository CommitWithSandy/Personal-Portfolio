import mongoose, { Schema, Document } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  roleType?: string;
  message: string;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  roleType: { type: String, default: 'Full-Time Role' },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export const ContactMessage =
  mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
