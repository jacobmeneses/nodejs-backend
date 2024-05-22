import { Router } from 'express';
import { router as taskRouter } from './task';

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
];
