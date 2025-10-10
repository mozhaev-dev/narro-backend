import { HttpError } from '../types/errors';

export function createHttpError (message: string, details: object | string = {}): HttpError {
  return {
    success: false,
    error: message,
    details,
  };
}
