import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { UserModel } from './../../src/models/user.model';
import { ExpenseModel } from './../../src/models/expense.model';
export const testUserId = new ObjectId();
const otherUserId = new ObjectId();
export const testUser = {
  _id: testUserId,
  name: 'Volodymyr Mishyn',
  email: 'test@email.com',
  password: '11111111',
  tokens: [
    {
      token: jwt.sign({ _id: testUserId }, process.env.JWT_SECRET),
    },
  ],
};

export const expenseOne = {
  _id: new ObjectId(),
  description: 'ps4 game',
  amount: 60,
  type: 'card',
  currency: 'USD',
  owner: testUserId,
};

export const expenseTwo = {
  _id: new ObjectId(),
  description: 'Cohvfe',
  amount: 35,
  type: 'card',
  currency: 'UAH',
  owner: testUserId,
};

export const otherUserExpense = {
  _id: new ObjectId(),
  description: 'Car',
  amount: 20000,
  type: 'card',
  currency: 'USD',
  owner: otherUserId,
};

export const fillDB = async () => {
  await UserModel.deleteMany();
  await ExpenseModel.deleteMany();
  const user = await new UserModel(testUser);
  await user.save();
  await new ExpenseModel(expenseOne).save();
  await new ExpenseModel(expenseTwo).save();
  await new ExpenseModel(otherUserExpense).save();
};
