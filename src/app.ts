import express from 'express';
import './database/moongoose';
import { expenseRouter } from './routers/expense.router';
import { userRouter } from './routers/user.router';

export const app: express.Application = express();
app.use(express.json());
app.use(userRouter);
app.use(expenseRouter);
