"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../index"));
const router = express_1.default.Router();
router.post('/user_login', (req, res) => {
    const { EMAIL, PASSWORD } = req.body;
    console.log("connect request");
    console.log("EMAIL : " + EMAIL);
    console.log("PASSWORD : " + PASSWORD);
    // 데이터베이스에서 사용자 정보를 조회하여 인증 수행
    index_1.default.query('SELECT * FROM user_table WHERE EMAIL = ? AND PASSWORD = ?', [EMAIL, PASSWORD], (err, results) => {
        if (err) {
            console.error('데이터베이스 오류:', err);
            res.status(500).json({ message: '서버 오류' });
            return;
        }
        if (results.length === 1) {
            // 로그인 성공
            res.status(200).json({ message: '로그인 성공' });
        }
        else {
            // 로그인 실패
            res.status(401).json({ message: '로그인 실패' });
        }
    });
});
// router.post('/user_login', async (req: Request, res: Response) => {
//     const {EMAIL, PASSWORD} = req.body;
//     pool.query('SELECT * FROM user_table WHERE EMAIL = "${EMAIL}"', (error, result) => {
//         if (error) return console.log(error);
//         if(result.length) {
//             console.log(result);
//             if(result[0].PASSWORD === PASSWORD) {
//                 console.log('login success: '+ EMAIL);
//                 console.log('password '+ PASSWORD);
//             } else {
//                 console.log('retry');
//             }
//         }
//     });
// });
exports.default = router;
