try {
  const { PrismaClient } = require('@prisma/client');
  console.log('PrismaClient loaded');
  
  // Prisma 7 needs adapter pattern for some providers
  // For prisma-client-js, the datasource comes from the environment
  // Set DATABASE_URL before creating the client
  process.env.DATABASE_URL = 'file:./prisma/dev.db';
  
  const prisma = new PrismaClient();
  console.log('Client created');

  prisma.user.findMany()
    .then(users => {
      console.log('Users:', JSON.stringify(users, null, 2));
      return prisma.$disconnect();
    })
    .catch(e => {
      console.log('QUERY ERROR:', e.message);
      return prisma.$disconnect();
    });
} catch(e) {
  console.log('INIT ERROR:', e.message);
  console.log(e.stack);
}
