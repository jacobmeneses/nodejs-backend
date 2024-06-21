import { Router, Request } from 'express';
import prisma from '../prisma-client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUser } from './types';
import { JwtSecret, JwtExpiresIn } from '../constants';
import { authJWT } from '../middleware/auth';

export const router = Router();

interface UserLoginRequest extends Request {
  body: {
    email: string;
    password: string;
  }
};

router.post('/login', async (req: UserLoginRequest, res) => {
  const { email, password } = req.body;

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

  const token = jwt.sign({ id: user.id }, JwtSecret, { expiresIn: JwtExpiresIn });

  res.json({ token, id: user.id });
});

interface UserSettingsRequest extends Request {
  body: {
    key: string;
    values: any;
  }
};

router.post('/settings', authJWT, async (req: UserSettingsRequest, res) => {
  const { key, values } = req.body;
  const user = req.user as IUser;
  const userId = user.id ? user.id : -1;

  const settings = await prisma.userSetting.findFirst({
    where: {
      userId,
      key,
    }
  });

  let r_settings;

  if ( !settings ) {
    r_settings = await prisma.userSetting.create({
      data: {
        key,
        values,
        userId,
      }
    });
  } else {
    r_settings = await prisma.userSetting.update({
      where: {
        id: settings.id,
      },
      data: {
        values,
      }
    });
  }

  res.send({ settings: r_settings });
});

interface GetUserSettingsRequest extends Request {
  query: {
    key: string;
  }
};

router.get('/settings', async (req: GetUserSettingsRequest, res) => {
  const user = req.user as IUser;
  const userId = user.id ? user.id : -1;
  const { key } = req.query;

  if ( !key ) {
    res.status(400).send({ message: 'Key is required' });
  }

  const settings = await prisma.userSetting.findFirst({
    where: {
      userId,
      key,
    }
  });

  if ( !settings ) {
    res.status(404).send({ message: 'Settings not found' });
    return;
  }

  res.send({ settings });
});

