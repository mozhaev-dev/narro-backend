import { PaginationResponse } from './pagination';

interface HttpResponse {
  success: boolean;
}

export interface HttpError extends HttpResponse {
  success: false;
  error: string;
  details: object | string;
}

export interface HttpSuccess<T> extends HttpResponse {
  success: true;
  data: T;
  pagination?: PaginationResponse;
}

export function createHttpError (message: string, details: object | string = {}): HttpError {
  return {
    success: false,
    error: message,
    details,
  };
}

export function createHttpSuccess<T> (data: T, pagination?: PaginationResponse): HttpSuccess<T> {
  const response: HttpSuccess<T> = {
    success: true,
    data,
  };

  if (pagination) {
    response.pagination = pagination;
  }

  return response;
}
