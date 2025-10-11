import { PaginationQuery } from '../middleware/validation';

export function handlePaginationParams (paginationQuery: PaginationQuery): PaginationQuery & { skip: number } {
  const { page, limit } = paginationQuery;
  const skip = (page - 1) * limit;

  return {
    ...paginationQuery,
    skip,
  };
}

export type PaginationResponse = {
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export function createPaginationResponse (totalCount: number, page: number, limit: number): PaginationResponse {
  const totalPages = Math.ceil(totalCount / limit);

  return {
    totalCount,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
