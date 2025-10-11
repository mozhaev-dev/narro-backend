import { Prisma } from '../../generated/prisma';

export const FULL_USER_SELECT: Prisma.UserSelect = {
  id: true,
  email: true,
  password: true,
  username: true,
  firstName: true,
  lastName: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type FullUserSelect = Prisma.UserGetPayload<{
  select: typeof FULL_USER_SELECT;
}>;

export const SAFE_USER_SELECT: Prisma.UserSelect = {
  id: true,
  email: true,
  password: false,
  username: true,
  firstName: true,
  lastName: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type SafeUserSelect = Prisma.UserGetPayload<{
  select: typeof SAFE_USER_SELECT;
}>;
