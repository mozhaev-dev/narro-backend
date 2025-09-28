import { FastifyInstance } from 'fastify';
import { getUsers } from '../controller/user';

export default async function (
  fastify: FastifyInstance,
): Promise<void> {
  fastify.get('/users', getUsers);
}
