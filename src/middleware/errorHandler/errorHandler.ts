import { FastifyInstance, FastifyError } from 'fastify';
import { Prisma } from '../../generated/prisma';
import { createHttpError } from '../../utils';

export async function registerErrorHandler (fastify: FastifyInstance): Promise<void> {
  fastify.setErrorHandler((error: FastifyError, request, reply) => {
    request.log.error(error);

    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
      case 'P2002': {
        const target = error.meta?.target as string[];
        const field = target?.[0] || 'field';
        return reply.code(409).send(createHttpError('Record error', `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`));
      }
      case 'P2025': {
        return reply.code(404).send(createHttpError('Record not found'));
      }
      default: {
        return reply.code(400).send(createHttpError('Database operation failed'));
      }
      }
    }

    // Handle validation errors (from validation middleware)
    if (error.statusCode === 400) {
      return reply.code(400).send(error);
    }

    // Handle other HTTP errors
    if (error.statusCode && error.statusCode < 500) {
      return reply.code(error.statusCode).send(createHttpError('Client error', error.message || 'Client error'));
    }

    // Handle server errors
    return reply.code(500).send(createHttpError('Internal server error', 'Internal server error'));
  });
}
