# Narro Backend

REST API backend for Narro application

## Quick Start

### Prerequisites

- Node.js 22.17.0
- npm
- Docker (optional)

### Local Development

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run type-check` - Run TypeScript type checking

## Docker

### Build and run with Docker

```bash
# Build the image
docker build -t narro-backend .

# Run the container
docker run -p 3000:3000 narro-backend
```

### Using Docker Compose

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```
