import { app } from './app';
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('HTTP REST API Server running at http://localhost:' + port);
});
