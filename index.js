"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const user_table_1 = __importDefault(require("./router/user_table"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 8000;
;
const pool = mysql_1.default.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'HYeok!02584',
    database: 'user_data', // 사용할 데이터베이스 이름
});
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log('Server is running on port', port);
});
pool.connect((err) => {
    if (err) {
        console.error('DB연결 안됨 ㅠㅠ ', err);
        return;
    }
    console.log('DB연결 성공ㅋㅋㅋ쉽노ㅋㅋ');
});
app.use('/user_table', user_table_1.default);
app.get('/', (req, res) => {
    res.send('running test');
    console.log('<http://localhost>:', port);
});
exports.default = pool;
