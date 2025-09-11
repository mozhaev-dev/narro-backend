import { FastifyInstance } from 'fastify';

interface TestResponse {
  message: string;
  timestamp: string;
  version: string;
}

export async function testRoutes(
  fastify: FastifyInstance
): Promise<void> {
  // Test GET endpoint
  fastify.get<{ Reply: TestResponse }>('/test', async () => {
    return {
      message: 'Hello from Narro Backend!',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  });

  // Test POST endpoint with body validation
  fastify.post<{
    Body: { name: string; message?: string };
    Reply: { greeting: string; receivedData: object };
  }>(
    '/test',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', minLength: 1 },
            message: { type: 'string' },
          },
        },
      },
    },
    async (request) => {
      const { name, message } = request.body;
      
      return {
        greeting: `Hello, ${name}!`,
        receivedData: {
          name,
          message: message || 'No message provided',
          timestamp: new Date().toISOString(),
        },
      };
    }
  );
}
