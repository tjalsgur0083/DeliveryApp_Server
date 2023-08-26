"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promise_1 = __importDefault(require("mysql2/promise"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
;
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'HYeok!02584',
    database: process.env.DB_NAME || 'user_data',
    connectionLimit: 10,
});
app.listen(port, () => {
    console.log('Server is running on port ${port}');
});
app.get('/user_table', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield pool.getConnection();
        const query = "SELECT * FROM user_table";
        const [results] = yield connection.query(query);
        console.log('<http://localhost:3000/user_table>');
        connection.release();
        res.json(results);
    }
    catch (err) {
        console.error('유저 정보를 가져오기 실패:', err);
        res.status(500).json({ error: '유저 정보 가져오기 실패' });
    }
}));
app.get('/', (req, res) => {
    res.send('running test');
    console.log('<http://localhost>: ${port}');
});
