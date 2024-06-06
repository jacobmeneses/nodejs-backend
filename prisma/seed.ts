import { PrismaClient } from '@prisma/client'
import { isDevEnv } from '../src/constants'
const prisma = new PrismaClient()

import tasks from './fixtures/tasks';
import columns from './fixtures/columns';
import users from './fixtures/users';
import sprints from './fixtures/sprints';

async function main() {
  await prisma.sprint.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.column.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.createMany({ data: users });
  await prisma.column.createMany({ data: columns });
  await prisma.sprint.createMany({ data: sprints });
  await prisma.task.createMany({ data: tasks });
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

