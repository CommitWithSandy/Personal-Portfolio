import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name cannot exceed 50 characters' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  subject: z.string().optional(),
  roleType: z.string().optional(),
  message: z

    .string()
    .min(10, { message: 'Message must be at least 10 characters long' })
    .max(1000, { message: 'Message cannot exceed 1000 characters' }),
  honeypot: z.string().max(0, { message: 'Spam detected' }).optional(), // Honeypot field must remain empty
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
