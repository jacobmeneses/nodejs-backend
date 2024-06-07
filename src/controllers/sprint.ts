import { Router, Request } from 'express';
import prisma from '../prisma-client';
import { authJWT } from '../middleware/auth';
import { diffDays } from './types';

export const router = Router();

interface CreateSprintRequest extends Request {
  body: {
    title: string;
    startDate: string;
    endDate: string;
  }
};

router.post('/', authJWT, async (req: CreateSprintRequest, res) => {
  const { title } = req.body;
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);

  if ( isNaN(startDate.getTime()) || isNaN(endDate.getTime()) ) {
    res.status(400).send({ message: 'Invalid date' });
    return;
  }

  if ( diffDays(startDate, endDate, { abs: false }) < 0 ){
    res.status(400).send({ message: 'Start date must be before end date' });
    return;
  }

  const sprint = await prisma.sprint.create({
    data: {
      title,
      startDate,
      endDate,
    }
  });

  res.status(201).send(sprint);
});

interface GetSprintsRequest extends Request {
};

router.get('/', authJWT, async (req: GetSprintsRequest, res) => {
  const sprints: object[] | null = await prisma.sprint.findMany({});

  res.send({ sprints });
});
