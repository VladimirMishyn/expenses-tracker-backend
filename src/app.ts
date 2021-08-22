import * as express from 'express';
const port = process.env.PORT || 3000;
const app: express.Application = express();
app.use(express.json());

const httpServer = app.listen(port, () => {
  console.log('HTTP REST API Server running at http://localhost:' + port);
});
