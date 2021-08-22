import { Request, Response, Router } from 'express';
import { checkAuth } from '../auth/check-auth';

const router = Router();
const USERS_BASE_URL = '/users';

/** Create user */
router.post(`${USERS_BASE_URL}`, (req: Request, res: Response) => {});

/** Login user */
router.post(`${USERS_BASE_URL}/login`, checkAuth, (req: Request, res: Response) => {});

/** Access my user */
router.get(`${USERS_BASE_URL}/me`, checkAuth, (req: Request, res: Response) => {});

/** Update my user info */
router.patch(`${USERS_BASE_URL}/me`, checkAuth, (req: Request, res: Response) => {});

/** Delete my user */
router.delete(`${USERS_BASE_URL}/me`, checkAuth, (req: Request, res: Response) => {});
