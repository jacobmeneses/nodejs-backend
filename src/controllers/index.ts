import { Router } from 'express';
import { router as taskRouter } from './task';
import { router as userRouter } from './user';
import { router as sprintRouter } from './sprint';

export class AppRouter {
  path: string;
  router: Router;

  public constructor(path: string, router: Router) {
    this.path = path;
    this.router = router;
  }
};

export const routers = [ 
  new AppRouter('/tasks', taskRouter),
  new AppRouter('/users', userRouter),
  new AppRouter('/sprints', sprintRouter),
];
