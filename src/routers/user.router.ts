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
    res.status(400).send({ error: e.message });
  }
});

/** Login user */
userRouter.post(`${USERS_BASE_URL}/login`, async (req: Request, res: Response) => {
  try {
    console.log('logging in');
    const user = await UserModel.findUserByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

/** Logout user */
userRouter.post(`${USERS_BASE_URL}/logout`, auth, async (req: Request, res: Response) => {
  try {
    res.locals.user.tokens = res.locals.user.tokens.filter((token) => token.token !== res.locals.token);
    await res.locals.user.save();
    res.send();
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

/** Access my user */
userRouter.get(`${USERS_BASE_URL}/me`, auth, (req: Request, res: Response) => {
  res.send(res.locals.user);
});

/** Update my user info */
userRouter.patch(`${USERS_BASE_URL}/me`, auth, (req: Request, res: Response) => {});

/** Delete my user */
userRouter.delete(`${USERS_BASE_URL}/me`, auth, (req: Request, res: Response) => {});
