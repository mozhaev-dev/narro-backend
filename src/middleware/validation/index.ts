import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodObject } from 'zod';
import { $ZodIssue } from 'zod/v4/core';
import { createHttpError, HttpError } from '../../utils';
export * from './schemas';

interface ValidationOptions {
  body?: ZodObject;
  query?: ZodObject;
  params?: ZodObject;
}

function makeValidationError (message: string, issues?: $ZodIssue[]): HttpError {
  const details = (issues ?? []).reduce((acc, issue) => ({
    ...acc,
    [issue.path.join('.')]: issue.message,
  }), {});

  return createHttpError(message, details);
}

type ValidationMiddleware = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
export function validateRequest (options: ValidationOptions): ValidationMiddleware {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      if (options.body && request.body) {
        const bodyValidation = options.body.safeParse(request.body);
        if (!bodyValidation.success) {
          return reply.code(400).send(makeValidationError('Request body is invalid', bodyValidation.error.issues));
        }
        request.body = bodyValidation.data;
      }

      if (options.query && request.query) {
        const queryValidation = options.query.safeParse(request.query);
        if (!queryValidation.success) {
          return reply.code(400).send(makeValidationError('Request query is invalid', queryValidation.error.issues));
        }
        request.query = queryValidation.data;
      }

      if (options.params && request.params) {
        const paramsValidation = options.params.safeParse(request.params);
        if (!paramsValidation.success) {
          return reply.code(400).send(makeValidationError('Request params are invalid', paramsValidation.error.issues));
        }
        request.params = paramsValidation.data;
      }
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send(makeValidationError('Internal server error during validation'));
    }
  };
}

export const validateBody = (schema: ZodObject): ValidationMiddleware => validateRequest({ body: schema });
export const validateQuery = (schema: ZodObject): ValidationMiddleware => validateRequest({ query: schema });
export const validateParams = (schema: ZodObject): ValidationMiddleware => validateRequest({ params: schema });
