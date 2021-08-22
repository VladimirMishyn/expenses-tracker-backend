import { Request, Response, Router } from 'express';
import { auth } from '../middleware/auth';
import { ExpenseModel } from '../models/expense.model';

export const expenseRouter = Router();
const EXPENSES_BASE_URL = '/expenses';

/** Create expense */
expenseRouter.post(`${EXPENSES_BASE_URL}`, auth, async (req: Request, res: Response) => {
  const expense = new ExpenseModel({ ...req.body, owner: res.locals.user._id });
  try {
    await expense.save();
    res.status(201).send(expense);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

/** Get single expense  */
expenseRouter.get(`${EXPENSES_BASE_URL}/:id`, auth, async (req: Request, res: Response) => {});

/** Update single expense  */
expenseRouter.patch(`${EXPENSES_BASE_URL}/:id`, auth, async (req: Request, res: Response) => {});

/** Delete single expense  */
expenseRouter.delete(`${EXPENSES_BASE_URL}/:id`, auth, async (req: Request, res: Response) => {});

/**
 * Query expenses
 * GET /expenses?limit=10,skip=10
 * GET /expenses?from=timestamp,to=timestamp
 */
expenseRouter.get(`${EXPENSES_BASE_URL}`, auth, async (req: Request, res: Response) => {
  try {
    await res.locals.user
      .populate({
        path: 'expenses',
      })
      .execPopulate();
    res.send(res.locals.user.expenses);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
