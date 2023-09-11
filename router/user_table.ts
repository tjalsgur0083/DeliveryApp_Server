import express, {Express, Request, Response, Router} from 'express';
import pool from '../index';

const router: Router = express.Router();

router.post('/user_login', (req: Request, res: Response) => {
    const { EMAIL, PASSWORD } = req.body;
      console.log("connect request");
      console.log("EMAIL : " + EMAIL);
      console.log("PASSWORD : " + PASSWORD)
    // 데이터베이스에서 사용자 정보를 조회하여 인증 수행

    pool.query(
      'SELECT * FROM user_table WHERE EMAIL = ?',
      [EMAIL],
      (err, results) => {
        if (err) {
          console.error('데이터베이스 오류:',err);
          res.status(500).json({message: '서버 오류'});
          return;
        }

        if (results.length === 1) {
          if (results[0].PASSWORD === PASSWORD) {
            res.status(200).json({message: 'login success'});
          } else {  
            res.status(401).json({message : '로그인 실패'});
          }
        }
      }
    )
});

export default router;