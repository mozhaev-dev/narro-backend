import { FastifyRequest, FastifyReply } from 'fastify';
import { createUser, getAllUsers } from '../services/user';
import { CreateUserQuery, PaginationQuery } from '../middleware/validation';
import { createPaginationResponse, handlePaginationParams } from '../utils/pagination';
import { createHttpSuccess } from '../utils/http';

export const createUserAction = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const requestUserData = request.body as CreateUserQuery;

  const user = await createUser(requestUserData);

  const response = createHttpSuccess(user);
  return reply.code(201).send(response);
};

export const getUsersAction = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { skip, page, limit } = handlePaginationParams(request.query as PaginationQuery);
  const { users, totalCount } = await getAllUsers(skip, limit);

  const paginationResponse = createPaginationResponse(totalCount, page, limit);

  const response = createHttpSuccess(users, paginationResponse);
  return reply.code(200).send(response);
};
