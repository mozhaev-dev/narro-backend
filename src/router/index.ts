import { FastifyInstance } from 'fastify';
import healthCheck from './healthCheck';
import user from './user';

export async function registerRoutes (fastify: FastifyInstance): Promise<void> {
  await healthCheck(fastify);
  await user(fastify);
}
