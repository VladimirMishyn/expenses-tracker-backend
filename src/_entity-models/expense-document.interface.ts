import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { UserDocumentInterface } from './user-document.interface';

export interface ExpensDocumentInterface extends Document {
  description: string;
  amount: number;
  type: string;
  currency: string;
  owner: string | ObjectId | UserDocumentInterface;
}
