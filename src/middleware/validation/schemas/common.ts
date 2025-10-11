import { z } from 'zod';

export const paginationBodySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => val ? parseInt(val, 10) : 1)
    .refine((val) => val > 0, 'Page must be greater than 0'),
  limit: z
    .string()
    .optional()
    .transform((val) => val ? parseInt(val, 10) : 10)
    .refine((val) => val > 0 && val <= 100, 'Limit must be between 1 and 100'),
});

// Common ID parameter schema
export const idParamSchema = z.object({
  id: z.cuid('Invalid ID format'),
});

export type PaginationBody = z.infer<typeof paginationBodySchema>;
export type IdParam = z.infer<typeof idParamSchema>;
