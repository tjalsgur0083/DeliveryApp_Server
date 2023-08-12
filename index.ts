import express, {Express, Request, Response} from 'express';

const app: Express = express();
const port = 3000;

app.get('/', (req: Request ,res: Response) => {
  res.send('ok');
});

app.listen(port, () => {
  console.log('Server running at <http://127.0.0.1>: ${port}');
});
