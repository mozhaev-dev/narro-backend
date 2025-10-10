import { prisma } from '../../lib/prisma';
import { hashPassword } from '../../utils/password';
import { SAFE_USER_SELECT } from './selects';
import { CreateUser, SafeUser } from './types';
export * from './types';

export async function createUser (userData: CreateUser): Promise<SafeUser> {
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
