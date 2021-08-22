import { ObjectId } from 'mongodb';
import { model, Model, Schema } from 'mongoose';
import { ExpensDocumentInterface } from '../_entity-models/expense-document.interface';

export interface ExpenseModelInterface extends Model<ExpensDocumentInterface> {}

const expenseSchema = new Schema<ExpensDocumentInterface>(
  {
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
      validate(value) {
        if (value <= 0) {
          throw new Error('Expense must be a postive number');
        }
      },
    },
    type: {
      type: String,
      required: true,
      default: 'card',
    },
    currency: {
      type: String,
      required: true,
      default: 'UAH',
    },
    owner: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const ExpenseModel: ExpenseModelInterface = model<ExpensDocumentInterface, ExpenseModelInterface>(
  'Expense',
  expenseSchema
);
