import express, {Express, Request, Response} from 'express';
import mysql from 'mysql2/promise';

const app: Express = express();
const port = process.env.PORT || 3000;;

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',     // 데이터베이스 호스트
  user: process.env.DB_USER || 'root',  // 데이터베이스 유저명
  password: process.env.DB_PASSWORD || 'HYeok!02584',  // 데이터베이스 비밀번호
  database: process.env.DB_NAME || 'user_data',   // 사용할 데이터베이스 이름
  connectionLimit: 10,
});

app.listen(port, () => {
  console.log('Server is running on port ${port}');
});

app.get('/user_table', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();

    const query = "SELECT * FROM user_table";
    const [results] = await connection.query(query);

    console.log('<http://localhost:3000/user_table>');

    connection.release();
    res.json(results);
  } catch (err) {
    console.error('유저 정보를 가져오기 실패:', err);
    res.status(500).json({ error: '유저 정보 가져오기 실패'});
  }
});

app.get('/', (req: Request ,res: Response) => {
  res.send('running test');
  console.log('<http://localhost>: ${port}');
});

