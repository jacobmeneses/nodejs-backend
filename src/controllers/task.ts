import { Router, Request } from 'express';
import prisma from '../prisma-client';
import { authJWT } from '../middleware/auth';
import { IUser } from './types';

export const router = Router();

interface GetTasksRequest extends Request {};

router.get('/', authJWT, async (req: GetTasksRequest, res) => {
  const createdBy = req.user ? req.user.id : -1;

  const tasks: object[] | null = await prisma.task.findMany({
    where: {
      createdBy,
    }
  });
  const columns: object[] | null = await prisma.column.findMany({});

  res.send({
    columns,
    tasks,
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
  const createdBy = req.user ? req.user.id : -1;

  try {
    const task : object | null = await prisma.task.findUnique({
      where: {
        id: taskId,
        createdBy,
      }
    });

    if ( !task ) {
      res.status(404).send({ message: 'Task not found' });
      return;
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
        createdBy,
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
  }
};

router.post('/', authJWT, async (req: CreateTaskRequest, res) => {
  const { title, columnId } = req.body as CreateTaskRequest['body'];
  const createdBy = req.user ? req.user.id : -1;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        columnId,
        createdBy,
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
  const createdBy = req.user ? req.user.id : -1;

  try {
    const task = await prisma.task.delete({
      where: {
        id: taskId,
        createdBy,
      }
    });

    res.send({ task });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting task' });
  }
});

