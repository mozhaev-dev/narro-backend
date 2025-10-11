import { FastifyInstance } from 'fastify';
import { createUserAction, getUsersAction } from '../controllers';
import { validateBody, validateQuery, paginationSchema, createUserSchema } from '../middleware/validation';

export default async function (
  fastify: FastifyInstance,
): Promise<void> {
  fastify.get('/users', {
    preHandler: validateQuery(paginationSchema),
    handler: getUsersAction,
  });

  fastify.post('/users', {
    preHandler: validateBody(createUserSchema),
    handler: createUserAction,
  });
}
