import { FastifyInstance } from 'fastify';
import { createUserAction, getUsers } from '../controllers/user';
import { validateBody, validateQuery, paginationSchema, createUserSchema } from '../middleware/validation';

export default async function (
  fastify: FastifyInstance,
): Promise<void> {
  fastify.get('/users', {
    preHandler: validateQuery(paginationSchema),
    handler: getUsers,
  });

  fastify.post('/users', {
    preHandler: validateBody(createUserSchema),
    handler: createUserAction,
  });
}
