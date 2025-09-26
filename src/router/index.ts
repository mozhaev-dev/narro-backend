import { FastifyInstance } from 'fastify';
import healthCheck from './healthCheck';

export async function registerRoutes(fastify: FastifyInstance): Promise<void> {
  await healthCheck(fastify);
}