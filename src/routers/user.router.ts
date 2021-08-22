import { Request, Response, Router } from 'express';
import { auth } from '../middleware/auth';
import { UserModel } from '../models/user.model';

export const userRouter = Router();
const USERS_BASE_URL = '/users';

/** Create user */
userRouter.post(`${USERS_BASE_URL}`, async (req: Request, res: Response) => {
  console.log('body', req.body);
  const user = new UserModel(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

/** Login user */
userRouter.post(`${USERS_BASE_URL}/login`, auth, (req: Request, res: Response) => {});

/** Logout user */
userRouter.post(`${USERS_BASE_URL}/logout`, auth, (req: Request, res: Response) => {});

/** Access my user */
userRouter.get(`${USERS_BASE_URL}/me`, auth, (req: Request, res: Response) => {
  console.log('aaaa');
});

/** Update my user info */
userRouter.patch(`${USERS_BASE_URL}/me`, auth, (req: Request, res: Response) => {});

/** Delete my user */
userRouter.delete(`${USERS_BASE_URL}/me`, auth, (req: Request, res: Response) => {});
