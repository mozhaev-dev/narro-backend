# Validation Middleware

Система валидации через middleware для Fastify с использованием Zod.

## Основные возможности

- ✅ Валидация body, query параметров и route параметров
- ✅ Автоматическая трансформация данных (например, строки в числа)
- ✅ Централизованная обработка ошибок
- ✅ Type-safe валидированные данные
- ✅ Удобные helper функции

## Использование

### 1. Валидация body запроса

```typescript
import { validateBody } from "../middleware/validation";
import { createUserSchema } from "../services/validation/schemas/user";

fastify.post("/users", {
  preHandler: validateBody(createUserSchema),
  handler: createUserAction,
});
```

### 2. Валидация query параметров

```typescript
import { validateQuery } from "../middleware/validation";
import { paginationSchema } from "../services/validation/schemas/common";

fastify.get("/users", {
  preHandler: validateQuery(paginationSchema),
  handler: getUsers,
});
```

### 3. Валидация route параметров

```typescript
import { validateParams } from "../middleware/validation";
import { idParamSchema } from "../services/validation/schemas/common";

fastify.get("/users/:id", {
  preHandler: validateParams(idParamSchema),
  handler: getUserById,
});
```

### 4. Комбинированная валидация

```typescript
import { validateRequest } from "../middleware/validation";

fastify.put("/users/:id", {
  preHandler: validateRequest({
    params: idParamSchema,
    body: updateUserSchema,
    query: optionsSchema,
  }),
  handler: updateUser,
});
```

## Схемы валидации

### Пользователи

```typescript
// Создание пользователя
export const createUserSchema = z.object({
  email: z.email(),
  username: z.string().min(3).max(30),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});
```

### Общие схемы

```typescript
// Пагинация
export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10)),
});

// ID параметр
export const idParamSchema = z.object({
  id: z.string().cuid(),
});
```

## Обработка ошибок

Централизованная обработка ошибок автоматически:

- ✅ Обрабатывает ошибки валидации
- ✅ Обрабатывает Prisma ошибки (P2002, P2025, etc.)
- ✅ Возвращает структурированные ответы
- ✅ Логирует ошибки

### Пример ответа при ошибке валидации

```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

## Преимущества нового подхода

### До (валидация в сервисе)

```typescript
export async function createUser(userData: CreateUser): Promise<SafeUser> {
  const validatedUserData = validateUserCreate(userData);

  if (validatedUserData.success === false) {
    throw validatedUserData.error;
  }

  // Логика создания пользователя...
}
```

### После (валидация в middleware)

```typescript
// В роуте
fastify.post("/users", {
  preHandler: validateBody(createUserSchema),
  handler: createUserAction,
});

// В сервисе
export async function createUser(userData: CreateUser): Promise<SafeUser> {
  // Данные уже валидированы, сразу используем
  const { password, ...restData } = userData;
  // Логика создания пользователя...
}
```

## Результат

- 🎯 **Разделение ответственности**: валидация на уровне роутов, бизнес-логика в сервисах
- 🚀 **Производительность**: ранняя валидация, меньше обработки невалидных данных
- 🛡️ **Безопасность**: все входящие данные проверяются до попадания в контроллеры
- 📝 **Читаемость**: явная валидация в определении роутов
- 🔧 **Переиспользование**: одни схемы для разных эндпоинтов
