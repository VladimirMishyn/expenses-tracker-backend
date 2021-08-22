import request from 'supertest';
import { app } from '../src/app';
import { UserModel } from '../src/models/user.model';
import { fillDB, testUser, testUserId } from './fixtures/db';

beforeEach(fillDB);

test('Should create new user', async () => {
  const httpResponse = await request(app)
    .post('/users')
    .send({ name: 'Useeer', email: 'user@user.com', password: '000000000' })
    .expect(201);

  const userInDB = await UserModel.findById(httpResponse.body.user._id);
  expect(userInDB).not.toBeNull();
});

test('Should login existing user', async () => {
  const httpResponse = await request(app)
    .post('/users/login')
    .send({
      email: testUser.email,
      password: testUser.password,
    })
    .expect(200);
  const user = await UserModel.findById(testUserId);
  expect(httpResponse.body.token).toBe(user.tokens[1].token);
});

test('Should not login with wrong credentials', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'zrada@email.com',
      password: 'tratatata',
    })
    .expect(400);
});
