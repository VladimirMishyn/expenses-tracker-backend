import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model';
import * as jwt from 'jsonwebtoken';

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { _id: string };
    const user = await UserModel.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) throw new Error();
    res.locals.token = token;
    res.locals.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
}
