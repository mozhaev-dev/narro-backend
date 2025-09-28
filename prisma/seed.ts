import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main (): Promise<void> {
  console.log('🌱 Seeding database...');

  // Create a test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      username: 'testuser',
      password: 'hashed_password_here', // In real app, this should be hashed
      firstName: 'Test',
      lastName: 'User',
    },
  });

  console.log('✅ Created test user:', testUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
