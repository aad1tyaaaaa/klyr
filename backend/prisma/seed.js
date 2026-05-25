const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Create User
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: '123456', 
      name: 'Aaditya',
      trustScore: 92,
      lastVerified: '2 days ago',
      sharedCount: 4
    },
  });

  console.log('User created:', user.name);

  // 2. Clear existing entries
  await prisma.credential.deleteMany({ where: { userId: user.id } });
  await prisma.activity.deleteMany({ where: { userId: user.id } });

  // 3. Seed Credentials
  await prisma.credential.createMany({
    data: [
      { 
        title: 'Bachelor of Engineering', 
        issuer: 'VIT University', 
        type: 'Education', 
        status: 'Verified', 
        expiry: 'No Expiry', 
        icon: '🎓', 
        color: 'bg-[#F3F0FF]',
        userId: user.id
      },
      { 
        title: 'Internship Certificate', 
        issuer: 'Tata Consultancy Services', 
        type: 'Employment', 
        status: 'Verified', 
        expiry: 'No Expiry', 
        icon: '💼', 
        color: 'bg-[#E7F5FF]',
        userId: user.id
      },
      { 
        title: 'Passport', 
        issuer: 'Government of India', 
        type: 'Identity', 
        status: 'Verified', 
        expiry: 'Mar 2030', 
        icon: '🛂', 
        color: 'bg-[#FFF9DB]',
        userId: user.id
      },
      { 
        title: 'Aadhaar Card', 
        issuer: 'UIDAI', 
        type: 'Identity', 
        status: 'Verified', 
        expiry: 'Permanent', 
        icon: '🆔', 
        color: 'bg-[#EBFAEA]',
        userId: user.id
      },
      { 
        title: 'Salary Slip July', 
        issuer: 'Startup XYZ', 
        type: 'Finance', 
        status: 'Verified', 
        expiry: 'Past Month', 
        icon: '💰', 
        color: 'bg-[#E7F5FF]',
        userId: user.id
      },
      { 
        title: 'PAN Card', 
        issuer: 'Income Tax Dept', 
        type: 'Finance', 
        status: 'Verified', 
        expiry: 'Permanent', 
        icon: '💳', 
        color: 'bg-[#F3F0FF]',
        userId: user.id
      },
      { 
        title: 'Annual Health Checkup', 
        issuer: 'Apollo Hospital', 
        type: 'Health', 
        status: 'Verified', 
        expiry: 'Jan 2024', 
        icon: '❤️', 
        color: 'bg-[#FFF5F5]',
        userId: user.id
      },
      { 
        title: 'AWS Cloud Practitioner', 
        issuer: 'Amazon Web Services', 
        type: 'Education', 
        status: 'Verified', 
        expiry: 'Dec 2027', 
        icon: '☁️', 
        color: 'bg-[#F3F0FF]',
        userId: user.id
      },
      { 
        title: 'Full Stack Eng', 
        issuer: 'Startup XYZ', 
        type: 'Employment', 
        status: 'Pending', 
        expiry: '', 
        icon: '💻', 
        color: 'bg-[#F3F0FF]',
        isClock: true,
        userId: user.id
      },
    ]
  });

  // 4. Seed Activities
  await prisma.activity.createMany({
    data: [
      { title: 'Bachelor of Engineering', subtitle: 'VIT University · Aug 2020', bgColor: 'bg-[#EBFAEA]', icon: '🎓', userId: user.id },
      { title: 'Internship Certificate', subtitle: 'Tata Consultancy Services · Jan 2022', bgColor: 'bg-[#E7F5FF]', icon: '💼', userId: user.id },
      { title: 'Passport', subtitle: 'Government of India · Mar 2020', bgColor: 'bg-[#EBFAEA]', icon: '🛂', userId: user.id }
    ]
  });

  console.log('Seeding finished with new categories!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
