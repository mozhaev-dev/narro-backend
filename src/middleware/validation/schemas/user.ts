import { z } from 'zod';

export const baseUserBodySchema = z.object({
  email: z
    .email('Invalid email format')
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores and hyphens'),
  firstName: z
    .string()
    .min(3, 'First name must be at least 3 characters')
    .max(50, 'First name must be less than 50 characters')
    .optional()
    .transform((val) => val ?? null),
  lastName: z
    .string()
    .min(3, 'Last name must be at least 3 characters')
    .max(50, 'Last name must be less than 50 characters')
    .optional()
    .transform((val) => val ?? null),
});

export const createUserSchema = baseUserBodySchema.extend({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
});

// Schema for updating user profile (without password)
export const updateUserBodySchema = baseUserBodySchema.partial().extend({
  isActive: z.boolean().optional(),
});

export type CreateUserBody = z.infer<typeof createUserSchema>;
export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;
