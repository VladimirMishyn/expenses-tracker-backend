import { Model, Schema, model } from 'mongoose';
import validator from 'validator';
import { UserDocumentInterface } from '../_entity-models/user-document.interface';
import jwt from 'jsonwebtoken';
const bcrypt = require('bcryptjs');

export interface UserInterface extends UserDocumentInterface {
  generateAuthToken(): Promise<string>;
}
interface UserModelInterface extends Model<UserInterface> {
  findUserByCredentials(email: string, password: string): Promise<UserInterface>;
}

const userSchema = new Schema<UserDocumentInterface>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      // validate(value) {
      //     if (value.toLowerCase().imclu) {
      //         throw new Error('Provide reasonable password please:)')
      //     }
      // }
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('expenses', {
  ref: 'Expense',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = [...user.tokens, { token }];
  await user.save();
  return token;
};

userSchema.statics.findUserByCredentials = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('Such user does not exist');
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw Error('Wrong password');
  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

export const UserModel: UserModelInterface = model<UserInterface, UserModelInterface>('User', userSchema);
