import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import sensible from '@fastify/sensible';
import { testRoutes } from './routes/test';

const fastify = Fastify({
  logger: {
    level: process.env['LOG_LEVEL'] || 'info',
  },
});

async function start(): Promise<void> {
  try {
    // Register plugins
    await fastify.register(cors, {
      origin: process.env['NODE_ENV'] === 'production' ? false : true,
    });
    
    await fastify.register(helmet);
    await fastify.register(sensible);

    // Register routes
    await fastify.register(testRoutes, { prefix: '/api/v1' });

    // Health check endpoint
    fastify.get('/health', async () => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    });

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
