import express from 'express';
import fs from 'fs-extra';
import path from 'path';
import { createServer } from 'vite';

const app = express();
const port = 3000;

// Vite 개발 서버 시작
async function startVite() {
    const vite = await createServer({
        server: { middlewareMode: 'html' } // Vite를 미들웨어 모드로 실행
    });

    // Vite의 미들웨어를 Express 앱에 연결
    app.use(vite.middlewares);

    // Express에서 API 처리
    app.use(express.json());  // JSON 요청 처리

    // 파일 읽기
    app.post('/read-number', (req, res) => {
        const { filePath } = req.body;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('파일을 읽는 중 오류가 발생했습니다:', err);
                return res.status(500).json({ error: '파일을 읽는 중 오류가 발생했습니다.' });
            }
            const number = Number(data.trim()); // 숫자 변환
            res.json({ number });
        });
    });

    // 파일 내용 비우기
    app.post('/truncate-file', (req, res) => {
        const { filePath } = req.body;
        fs.truncate(filePath, 0, (err) => {
            if (err) {
                console.error('파일을 비우는 중 오류가 발생했습니다:', err);
                return res.status(500).json({ error: '파일을 비우는 중 오류가 발생했습니다.' });
            }
            res.json({ success: true });
        });
    });

    // 파일에 글 추가
    app.post('/append-string', (req, res) => {
        const { filePath, string } = req.body;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('파일을 읽는 중 오류가 발생했습니다:', err);
                return res.status(500).json({ error: '파일을 읽는 중 오류가 발생했습니다.' });
            }
            const newData = data + string;  // 기존 데이터에 추가
            fs.writeFile(filePath, newData, 'utf8', (err) => {
                if (err) {
                    console.error('파일을 저장하는 중 오류가 발생했습니다:', err);
                    return res.status(500).json({ error: '파일을 저장하는 중 오류가 발생했습니다.' });
                }
                res.json({ success: true });
            });
        });
    });

    // 파일 크기 가져오기
    app.post('/get-file-size', (req, res) => {
        const { filePath } = req.body;
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error('파일 크기를 가져오는 중 오류가 발생했습니다:', err);
                return res.status(500).json({ error: '파일 크기를 가져오는 중 오류가 발생했습니다.' });
            }
            const size = stats.size;
            let fileSize = '';
            if (size < 1024) {
                fileSize = `${size}bytes`;
            } else if (size < 1048576) {
                fileSize = `${(size / 1024).toFixed(1)}KB`;
            } else {
                fileSize = `${(size / 1048576).toFixed(1)}MB`;
            }
            res.json({ fileSize });
        });
    });

    // 서버 시작
    app.listen(port, () => {
        console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
    });
}

startVite();