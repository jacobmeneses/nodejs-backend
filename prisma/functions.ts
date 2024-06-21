
export async function emptyDatabase(prisma) {
  // raw query for setting the sequence of the id column
  await prisma.$executeRaw`ALTER SEQUENCE "public"."User_id_seq" RESTART WITH 100`;
  await prisma.$executeRaw`ALTER SEQUENCE "public"."Column_id_seq" RESTART WITH 100`;
  await prisma.$executeRaw`ALTER SEQUENCE "public"."Sprint_id_seq" RESTART WITH 100`;
  await prisma.$executeRaw`ALTER SEQUENCE "public"."Task_id_seq" RESTART WITH 100`;
  await prisma.$executeRaw`ALTER SEQUENCE "public"."UserSetting_id_seq" RESTART WITH 100`;

  await prisma.sprint.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.column.deleteMany({});
  await prisma.user.deleteMany({});
};
