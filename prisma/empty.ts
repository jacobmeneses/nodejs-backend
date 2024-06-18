import { PrismaClient } from '@prisma/client'
import { emptyDatabase } from './functions';
import { isDevEnv } from '../src/constants'

const prisma = new PrismaClient()

if ( !isDevEnv ) {
  process.exit(1);
}

emptyDatabase(prisma)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

