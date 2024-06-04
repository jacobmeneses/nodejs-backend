import { PrismaClient } from '@prisma/client'
import { isDevEnv } from '../src/constants'
const prisma = new PrismaClient()
const hashedPassword = '$2a$12$OSZqHSfgnQtu.6g.Bjghy.xHwoLGTYpg.F74ZqHYmmkcBWPrEcjsO'; // 123456789

async function main() {
  await prisma.task.deleteMany({});
  await prisma.column.deleteMany({});
  await prisma.user.deleteMany({});

  const users = [
    {
      id: 1,
      email: 'j@example.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      email: 'v@example.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await prisma.user.createMany({
    data: users
  });

  const columns = [
    { id: 1, title: 'To Do', createdAt: new Date(), updatedAt: new Date(), isColumnDone: false },
    { id: 2, title: 'In progress', createdAt: new Date(), updatedAt: new Date(), isColumnDone: false },
    { id: 3, title: 'Done', createdAt: new Date(), updatedAt: new Date(), isColumnDone: true },
  ];

  await prisma.column.createMany({
    data: columns
  });

  const tasks = [
    {
      title: 'Task 1',
      createdBy: 1,
      columnId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Task 2',
      createdBy: 1,
      columnId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Task 3',
      createdBy: 2,
      columnId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await prisma.task.createMany({
    data: tasks
  });
}

if ( !isDevEnv ) {
  process.exit(1);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

