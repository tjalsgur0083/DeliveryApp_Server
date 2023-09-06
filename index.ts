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
  console.log('Server is running on port ${port}');
});

pool.connect((err) => {
  if(err) {
    console.error('DB연결 안됨 ㅠㅠ ', err);
    return;
  }
  console.log('DB연결 성공ㅋㅋㅋ쉽노ㅋㅋ');
});
// app.post('/user_table', async (req: Request, res: Response) => {
//   const {EMAIL, PASSWORD} = req.body;
    
//   const connection = await pool.getConnection();

//   const query = 'SELECT * FROM user_table WHERE EMAIL = ?';
//   const [results] = await connection.query(query, [EMAIL]);

//     // if (results.length === 0) {
//     //   connection.release();
//     //   return res.status(401).json({error: '사용자가 존재하지 않음'});
//     // }

//     // const user = results[0];

//     // if (user.PASSWORD !== PASSWORD) {
//     //   connection.release();
//     //   return res.status(401).json({error: '비밀번호가 틀렸습니다'});
//     // }

//     // connection.release();
//     // res.status(200).json({message: '로그인 성공'});

//     console.log('<http://localhost:3000/user_table>'); 

//     connection.release();  
//     res.json(results);  
//  (err) 
//     console.error('유저 정보를 가져오기 실패:', err);
//     res.status(500).json({ error: '유저 정보 가져오기 실패'});
// });

app.use('/user_table', user_id);

app.get('/', (req: Request ,res: Response) => {
  res.send('running test');
  console.log('<http://localhost>: ${port}');
});

export default pool;