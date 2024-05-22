import { Router, Request } from 'express';
import prisma from '../prisma-client';

export const router = Router();

router.get('/', async (req: Request, res) => {
  const tasks: object[] | null = await prisma.task.findMany({
  });
	const columns: object[] | null = await prisma.column.findMany({});

  res.send({
		columns,
		tasks,
	});
});
