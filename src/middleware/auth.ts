import { Request, Response, NextFunction } from 'express';

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
      // Logic here
      next();
    } catch (e) {
      res.sendStatus(403).send({ error: e });
    }
  } else {
    res.sendStatus(401).send({ error: 'Authentication fail' });
  }
}
