import express, {Express, Request, Response} from 'express';

const app: Express = express();
const port = 3000;

app.get('/', (req: Request ,res: Response) => {
  res.send('ok');
  console.log('<http://localhost>: ${port}');
});

app.listen(port);
