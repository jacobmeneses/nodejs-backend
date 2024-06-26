import { PrismaClient } from '@prisma/client'
import { isDevEnv } from '../src/constants'
import { emptyDatabase } from './functions';
const prisma = new PrismaClient()

import tasks from './fixtures/tasks';
import columns from './fixtures/columns';
import users from './fixtures/users';
import sprints from './fixtures/sprints';
import user_settings from './fixtures/user-settings';

async function main() {
  await emptyDatabase(prisma);

  await prisma.user.createMany({ data: users });
  await prisma.column.createMany({ data: columns });
  await prisma.sprint.createMany({ data: sprints });
  await prisma.task.createMany({ data: tasks });
  await prisma.userSetting.createMany({ data: user_settings });
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

