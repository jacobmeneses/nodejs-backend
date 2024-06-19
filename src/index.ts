import express, { Request, Response, NextFunction } from 'express';
import prisma from './prisma-client';
import { routers, AppRouter } from './controllers';
import passport from './passport';
import cors from 'cors';
import { DefaultApiPort } from './constants';
import path from 'path';

const app = express();
const PORT = process.env.PORT || DefaultApiPort;

const corsOptions = {
  origin: '*',
	methods: 'GET,POST,PUT,DELETE',
};

const PUBLIC_DIR = process.env.PUBLIC_DIR || '../public';
const staticRoute = path.join(__dirname, PUBLIC_DIR);

console.log('Serving static files at', staticRoute);

app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(express.json());
app.use(express.static(staticRoute));

routers.forEach((route: AppRouter) => {
  app.use('/api/v1' + route.path, route.router);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
