import { Model, Schema, model } from 'mongoose';
import isEmail from 'validator/es/lib/isEmail';
import { UserInterface } from '../_entity-models/user.interface';
import * as jwt from 'jsonwebtoken';
import { JWT } from '../_configs/jwt.enum';
const bcrypt = require('bcryptjs');

interface UserModelInterface extends Model<UserInterface> {
  findUserByCredentials(): Promise<UserInterface>;
}

const userSchema = new Schema<UserInterface>({
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
      if (!isEmail(value)) {
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
});
const UserModel = model<UserInterface, UserModelInterface>('User', userSchema);

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, JWT.SEED);
  user.tokens = [...user.tokens, { token }];
  await user.save();
  return token;
};

userSchema.statics.findUserByCredentials = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('Such user does not exist');
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw Error('Wring password');
  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

export { UserModel };
