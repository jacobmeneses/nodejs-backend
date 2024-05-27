import { Router, Request } from 'express';
import prisma from '../prisma-client';
import { authJWT } from '../middleware/auth';

export const router = Router();

router.get('/', authJWT, async (req: Request, res) => {
  const tasks: object[] | null = await prisma.task.findMany({
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

  try {
    const task : object | null = await prisma.task.findUnique({
      where: {
        id: taskId,
      }
    });

    if ( !task ) {
      res.status(404).send({ message: 'Task not found' });
      return;
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
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

router.post('/', authJWT, async (req: Request, res) => {
  const { title, columnId } = req.body as CreateTaskRequest['body'];

  try {
    const task = await prisma.task.create({
      data: {
        title,
        columnId,
        createdBy: 1, // TODO: Authenticated user
      }
    });

    res.send({ task });
  } catch (error) {
    res.status(500).send({ message: 'Error creating task' });
  }
});


