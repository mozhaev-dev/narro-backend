# Narro Backend

REST API backend for Narro application

## 🚀 Quick Start

### Local Development Setup

1. **Clone and install dependencies:**

   ```bash
   git clone <repository>
   cd narro-backend
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp env.example .env
   # Edit .env if needed (default values work for development)
   ```

3. **Start PostgreSQL database:**

   ```bash
   docker-compose up postgres -d
   ```

4. **Set up database:**

   ```bash
   # Generate Prisma Client
   npm run db:generate

   # Create database tables
   npm run db:push
   # OR use migrations (recommended for production)
   npm run db:migrate

   # Seed with test data (optional)
   npm run db:seed
   ```

5. **Start development server:**

   ```bash
   npm run dev
   ```

   Server will be available at `http://localhost:3000`

## 📋 Available Scripts

### Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run type-check` - Run TypeScript type checking

### Database (Prisma ORM)

- `npm run db:generate` - Generate Prisma Client after schema changes
- `npm run db:push` - Sync database with schema (development)
- `npm run db:migrate` - Create and run migrations (production)
- `npm run db:reset` - Reset database ⚠️ **deletes all data**
- `npm run db:seed` - Seed database with test data
- `npm run db:studio` - Open Prisma Studio (visual database editor)

### Working with Prisma

#### Schema-First Development (Recommended for Development)

```bash
# 1. Edit prisma/schema.prisma
# 2. Sync changes to database
npm run db:push
# 3. Generate updated TypeScript types
npm run db:generate
```

#### Migration-Based Development (Recommended for Production)

```bash
# 1. Edit prisma/schema.prisma
# 2. Create migration
npm run db:migrate -- --name "add_new_field"
# 3. TypeScript types are auto-generated
```

## 🐳 Docker

### Development (Hybrid Approach - Recommended)

```bash
# Run only database in Docker
docker-compose up postgres -d

# Run application locally
npm run dev
```

### Full Docker Development

```bash
# Run everything in Docker
docker-compose up --build -d

# View logs
docker-compose logs -f narro-backend

# Stop everything
docker-compose down
```

### Production Deployment

```bash
# Build and deploy
docker-compose up --build -d
```

## 📄 License

ISC License
