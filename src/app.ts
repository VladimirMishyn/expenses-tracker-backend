import * as express from 'express';
import './database/moongoose';
import { userRouter } from './routers/user.router';

const port = process.env.PORT || 3000;
const app: express.Application = express();
app.use(express.json());
app.use(userRouter);
const httpServer = app.listen(port, () => {
  console.log('HTTP REST API Server running at http://localhost:' + port);
});
