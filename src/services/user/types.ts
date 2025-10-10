import { User } from '../../generated/prisma';

export type FullUser = User;

export type CreateUser = Omit<FullUser, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>;

export type SafeUser = Omit<FullUser, 'password'>;

