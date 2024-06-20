import { Router, Request } from 'express';
import prisma from '../prisma-client';
import { authJWT } from '../middleware/auth';
import { Sprint } from '@prisma/client';
import { IUser } from './types';

export const router = Router();

interface GetTasksRequest extends Request {
  query: {
    spid: string;
  }
};

router.get('/', authJWT, async (req: GetTasksRequest, res) => {
  // const createdBy = req.user ? req.user.id : -1;
  const sprintId = req.query.spid ? parseInt(req.query.spid) : null;

  const tasks: object[] | null = await prisma.task.findMany({
    where: {
      // createdBy,
      sprintId,
    },
    include: {
      creator: {
        select: { id: true, name: true, thumbnail: true }
      }
    }
  });

  // TODO: Get columns belong to sprint
  const columns: object[] | null = await prisma.column.findMany({});

  let sprint : Sprint | null = null;

  if (sprintId) {
    sprint = await prisma.sprint.findUnique({
      where: {
        id: sprintId
      }
    });
  }

  res.send({
    columns,
    tasks,
    sprint: sprint ? sprint : {},
  });
});

interface MoveTaskRequest extends Request {
  body: {
    columnId: number;
    taskId: number;
  }
};

router.put('/move', authJWT, async (req: MoveTaskRequest, res) => {
  const taskId : number = req.body.taskId;
  const columnId : number = req.body.columnId;
  // const createdBy = req.user ? req.user.id : -1;

  try {
    const task : object | null = await prisma.task.findUnique({
      where: {
        id: taskId,
        // createdBy,
      }
    });

    if ( !task ) {
      res.status(404).send({ message: 'Task not found' });
      return;
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
        // createdBy,
      },
      data: {
        columnId
      }
    });
  } catch (error) {
    res.status(500).send({ message: 'Error updating task' });
    return;
  }

  res.send({ message: 'Task updated' });
});

interface CreateTaskRequest extends Request {
  body: {
    title: string;
    columnId: number;
    sprintId: number;
  }
};

router.post('/', authJWT, async (req: CreateTaskRequest, res) => {
  const { title, columnId } = req.body as CreateTaskRequest['body'];
  const createdBy = req.user ? req.user.id : -1;
  const sprintId = req.body.sprintId;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        columnId,
        createdBy,
        sprintId,
      },
      select: {
        title: true,
        createdAt: true,
        updatedAt: true,
        columnId: true,
        sprintId: true,
        creator: {
          select: { id: true, name: true, thumbnail: true }
        }
      }
    });

    res.send({ task });
  } catch (error) {
    res.status(500).send({ message: 'Error creating task' });
  }
});

interface DeleteTaskRequest extends Request {
  params: {
    taskId: string;
  }
};

router.delete('/:taskId', authJWT, async (req: DeleteTaskRequest, res) => {
  const taskId = parseInt(req.params.taskId);
  // const createdBy = req.user ? req.user.id : -1;

  try {
    const task = await prisma.task.delete({
      where: {
        id: taskId,
        // createdBy,
      }
    });

    res.send({ task });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting task' });
  }
});

