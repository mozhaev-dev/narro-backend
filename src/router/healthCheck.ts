import { FastifyInstance } from 'fastify';

export default async function (
  fastify: FastifyInstance,
): Promise<void> {
  fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });
}
