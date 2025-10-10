import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/prisma';
import { CreateUser, createUser } from '../services/user';

export const createUserAction = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  // Data is already validated by middleware
  const requestUserData = request.body as CreateUser;

  const user = await createUser(requestUserData);

  return reply.code(201).send({
    success: true,
    data: user,
    message: 'User created successfully',
  });
};

export const getUsers = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  // Query parameters are already validated by middleware
  const { page, limit } = request.query as { page: number; limit: number };
  const skip = (page - 1) * limit;

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.user.count(),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return reply.code(200).send({
    success: true,
    data: users,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  });
};
