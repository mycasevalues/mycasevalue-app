import { z } from 'zod';

/**
 * Email validation schema
 */
export const emailSchema = z.string().email('Invalid email address').max(255);

/**
 * NOS Code validation schema (3-digit code)
 */
export const nosCodeSchema = z.string().regex(/^\d{3}$/, 'NOS code must be exactly 3 digits');

/**
 * District code validation schema
 */
export const districtCodeSchema = z.string().min(2).max(10);

/**
 * Search query validation schema
 */
export const searchQuerySchema = z.object({
  query: z.string().min(1).max(500),
  category: z.string().max(50).optional(),
});

/**
 * Translation/AI input validation schema
 */
export const translateSchema = z.object({
  text: z.string().min(1).max(10000),
  targetLanguage: z.string().max(10),
});

/**
 * Calculator input validation schema
 */
export const calculatorSchema = z.object({
  caseType: z.string().max(50).optional(),
  district: z.string().max(50).optional(),
  amount: z.number().min(0).max(1000000000).optional(),
});

/**
 * Contact form validation schema
 */
export const contactSchema = z.object({
  email: emailSchema,
  name: z.string().min(1).max(100),
  message: z.string().min(1).max(2000),
});

/**
 * Report capture validation schema
 */
export const reportCaptureSchema = z.object({
  email: emailSchema,
  reportSlug: z.string().max(255).optional(),
});

/**
 * Existing calculator schema
 */
export const CalculatorInputSchema = z.object({
  nosCode: z.number().int().min(100).max(999),
  districtId: z.string().max(50).optional(),
  estimatedDamages: z.number().min(0).max(1000000000).optional(),
  represented: z.boolean(),
});

/**
 * Existing search schema
 */
export const SearchInputSchema = z.object({
  query: z.string().min(1).max(500).trim(),
  category: z.string().max(50).optional(),
  limit: z.number().int().min(1).max(50).default(20),
});

/**
 * Existing AI tool schema
 */
export const AIToolInputSchema = z.object({
  caseType: z.number().int().min(100).max(999).optional(),
  district: z.string().max(50).optional(),
  userInput: z.string().min(1).max(5000).trim(),
});

/**
 * Existing document upload schema
 */
export const DocumentUploadSchema = z.object({
  filename: z.string().max(255),
  fileSize: z.number().max(10485760),
  mimeType: z.enum(['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
});

/**
 * Existing contact form schema
 */
export const ContactFormSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(255),
  subject: z.string().min(1).max(200).trim(),
  message: z.string().min(1).max(2000).trim(),
});

/**
 * Existing alert schema
 */
export const AlertSchema = z.object({
  alertType: z.enum(['case', 'case_type', 'judge']),
  caseNumber: z.string().max(50).optional(),
  nosCode: z.number().int().min(100).max(999).optional(),
  district: z.string().max(50).optional(),
  judgeName: z.string().max(100).optional(),
});

/**
 * Generic input validation helper function
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validation result with data or error message
 */
export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
      return { success: false, error: messages };
    }
    return { success: false, error: 'Validation failed' };
  }
}
