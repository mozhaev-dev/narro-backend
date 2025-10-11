import { prisma } from '../../lib/prisma';
import { hashPassword } from '../../utils/password';
import { SAFE_USER_SELECT, SafeUserSelect } from './selects';
import { Prisma } from '../../generated/prisma';
import { UpdateUserBody } from '../../middleware/validation';

export async function createUser (userData: Prisma.UserCreateInput): Promise<SafeUserSelect> {
  const { password, ...restData } = userData;

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      password: hashedPassword,
      ...restData,
    },
    select: SAFE_USER_SELECT,
  });

  return user;
}

export async function getAllUsers (skip: number, limit: number): Promise<{ users: SafeUserSelect[]; totalCount: number }> {
  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      select: SAFE_USER_SELECT,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.user.count(),
  ]);

  return { users, totalCount };
}

export async function getUserById (id: string): Promise<SafeUserSelect | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: SAFE_USER_SELECT,
  });

  return user;
}

export async function updateUser (id: string, userData: UpdateUserBody): Promise<SafeUserSelect | null> {
  const user = await prisma.user.update({
    where: { id },
    data: userData,
    select: SAFE_USER_SELECT,
  });

  return user;
}

export async function deleteUser (id: string): Promise<SafeUserSelect | null> {
  const user = await prisma.user.delete({
    where: { id },
    select: SAFE_USER_SELECT,
  });

  return user;
}
