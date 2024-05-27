import { Router, Request } from 'express';
import prisma from '../prisma-client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const router = Router();

interface UserLoginRequest extends Request {
  body: {
    email: string;
    password: string;
  }
};

router.post('/login', async (req: Request, res) => {
  const { email, password } = req.body as UserLoginRequest['body'];

  const user = await prisma.user.findUnique({
    where: {
      email,
    }
  });

  if (!user) {
    res.status(404).send({ message: 'User not found' });
    return;
  }

  const samePassword = await bcrypt.compare(password, user.password);

  if ( !samePassword ) {
      return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', { expiresIn: process.env.JWT_TOKEN_EXPIRATION || '1h' });

  res.json({ token });
});
