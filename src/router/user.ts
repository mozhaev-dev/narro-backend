import { FastifyInstance } from 'fastify';
import { createUserAction, getUserAction, getUsersAction, updateUserAction } from '../controllers';
import { validateBody, validateQuery, paginationBodySchema, createUserSchema, validateParams, idParamSchema, validateRequest, updateUserBodySchema } from '../middleware/validation';

export default async function (
  fastify: FastifyInstance,
): Promise<void> {
  fastify.get('/users', {
    preHandler: validateQuery(paginationBodySchema),
    handler: getUsersAction,
  });

  fastify.post('/users', {
    preHandler: validateBody(createUserSchema),
    handler: createUserAction,
  });

  fastify.get('/users/:id', {
    preHandler: validateParams(idParamSchema),
    handler: getUserAction,
  });

  fastify.patch('/users/:id', {
    preHandler: validateRequest({
      params: idParamSchema,
      body: updateUserBodySchema,
    }),
    handler: updateUserAction,
  });

  fastify.delete('/users/:id', {
    preHandler: validateParams(idParamSchema),
    handler: deleteUserAction,
  });
}
