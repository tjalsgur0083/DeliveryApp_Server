import express, {Express, Request, Response} from 'express';
import mysql from 'mysql';
import user_id from './router/user_table';
import bodyParser from 'body-parser';

const app: Express = express();
const port = 8000;;

const pool = mysql.createConnection({
  host: '127.0.0.1',     // 데이터베이스 호스트
  user: 'root',  // 데이터베이스 유저명
  password: 'HYeok!02584',  // 데이터베이스 비밀번호
  database: 'user_data',   // 사용할 데이터베이스 이름
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log('Server is running on port', port);
});

pool.connect((err) => {
  if(err) {
    console.error('DB연결 안됨 ㅠㅠ ', err);
    return;
  }
  console.log('DB연결 성공ㅋㅋㅋ쉽노ㅋㅋ');
});

app.use('/user_table', user_id);

app.get('/', (req: Request ,res: Response) => {
  res.send('running test');
  console.log('<http://localhost>:', port);
});

export default pool;