import { FastifyRequest, FastifyReply } from 'fastify';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../services/user';
import { CreateUserBody, PaginationBody, UpdateUserBody, IdParam } from '../middleware/validation';
import { createPaginationResponse, handlePaginationParams } from '../utils/pagination';
import { createHttpSuccess, createHttpError } from '../utils/http';

export const createUserAction = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const requestUserData = request.body as CreateUserBody;

  const user = await createUser(requestUserData);

  return reply.code(201).send(createHttpSuccess(user));
};

export const getUsersAction = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { skip, page, limit } = handlePaginationParams(request.query as PaginationBody);
  const { users, totalCount } = await getAllUsers(skip, limit);

  const paginationResponse = createPaginationResponse(totalCount, page, limit);

  return reply.code(200).send(createHttpSuccess(users, paginationResponse));
};

export const getUserAction = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params as IdParam;

  const user = await getUserById(id);

  if (!user) {
    return reply.code(404).send(createHttpError('User not found'));
  }

  return reply.code(200).send(createHttpSuccess(user));
};

export const updateUserAction = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params as IdParam;
  const requestUserData = request.body as UpdateUserBody;

  const user = await updateUser(id, requestUserData);

  if (!user) {
    return reply.code(404).send(createHttpError('User not found'));
  }

  return reply.code(200).send(createHttpSuccess(user));
};

export const deleteUserAction = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params as IdParam;
  const user = await deleteUser(id);

  if (!user) {
    return reply.code(404).send(createHttpError('User not found'));
  }

  return reply.code(200).send(createHttpSuccess(user));
};
