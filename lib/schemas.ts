import { z } from 'zod';

export const CalculatorInputSchema = z.object({
  nosCode: z.number().int().min(100).max(999),
  districtId: z.string().max(50).optional(),
  estimatedDamages: z.number().min(0).max(1000000000).optional(),
  represented: z.boolean(),
});

export const SearchInputSchema = z.object({
  query: z.string().min(1).max(500).trim(),
  category: z.string().max(50).optional(),
  limit: z.number().int().min(1).max(50).default(20),
});

export const AIToolInputSchema = z.object({
  caseType: z.number().int().min(100).max(999).optional(),
  district: z.string().max(50).optional(),
  userInput: z.string().min(1).max(5000).trim(),
});

export const DocumentUploadSchema = z.object({
  filename: z.string().max(255),
  fileSize: z.number().max(10485760),
  mimeType: z.enum(['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
});

export const ContactFormSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(255),
  subject: z.string().min(1).max(200).trim(),
  message: z.string().min(1).max(2000).trim(),
});

export const AlertSchema = z.object({
  alertType: z.enum(['case', 'case_type', 'judge']),
  caseNumber: z.string().max(50).optional(),
  nosCode: z.number().int().min(100).max(999).optional(),
  district: z.string().max(50).optional(),
  judgeName: z.string().max(100).optional(),
});
