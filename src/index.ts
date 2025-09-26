import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import sensible from '@fastify/sensible';
import { API_PREFIX } from './consts';
import { registerRoutes } from './router';

const fastify = Fastify({
  logger: {
    level: process.env['LOG_LEVEL'] || 'info',
  },
});

async function start(): Promise<void> {
  try {
    await fastify.register(cors, {
      origin: process.env['NODE_ENV'] === 'production' ? false : true,
    });
    
    await fastify.register(helmet);
    await fastify.register(sensible);

    await fastify.register(registerRoutes, { prefix: API_PREFIX });

    const port = Number(process.env['PORT']) || 3000;
    const host = process.env['HOST'] || '0.0.0.0';

    await fastify.listen({ port, host });
    console.log(`Server is running on http://${host}:${port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');
  await fastify.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  await fastify.close();
  process.exit(0);
});

start();
