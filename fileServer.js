import express from 'express';
import fs from 'fs-extra';
import path from 'path';
import { createServer } from 'vite';
import cors from 'cors';
import { fileURLToPath } from 'url';

// __dirname 설정 (ES 모듈 호환)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 파일 읽기
app.post('/read-number', (req, res) => {
    const { filePath } = req.body;
    const absolutePath = path.resolve(__dirname, filePath); // 절대 경로로 변환
    fs.readFile(absolutePath, 'utf8', (err, data) => {
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
    const absolutePath = path.resolve(__dirname, filePath); // 절대 경로로 변환
    fs.truncate(absolutePath, 0, (err) => {
        if (err) {
            console.error('파일을 비우는 중 오류가 발생했습니다:', err);
            return res.status(500).json({ error: '파일을 비우는 중 오류가 발생했습니다.' });
        }
        res.json({ success: true });
    });
});

// 뒤에서 n개의 문자 지우기
app.post('/remove-from-file-end', (req, res) => {
    const { filePath, numCharsToRemove } = req.body;
    const absolutePath = path.resolve(__dirname, filePath); // 절대 경로로 변환
    fs.stat(absolutePath, (err, stats) => {
        if (err) {
            console.error('파일 정보를 읽는 중 오류가 발생했습니다:', err);
            return res.status(500).json({ error: '파일 정보를 읽는 중 오류가 발생했습니다.' });
        }
        const newLength = Math.max(0, stats.size - numCharsToRemove); // 새로운 파일 크기 계산
        fs.truncate(absolutePath, newLength, (err) => {
            if (err) {
                console.error('파일을 비우는 중 오류가 발생했습니다:', err);
                return res.status(500).json({ error: '파일을 비우는 중 오류가 발생했습니다.' });
            }
            res.json({ success: true });
        });
    });
});


// 파일에 글 추가
app.post('/append-string', (req, res) => {
    const { filePath, string } = req.body;
    const absolutePath = path.resolve(__dirname, filePath); // 절대 경로로 변환
    fs.readFile(absolutePath, 'utf8', (err, data) => {
        if (err) {
            console.error('파일을 읽는 중 오류가 발생했습니다:', err);
            return res.status(500).json({ error: '파일을 읽는 중 오류가 발생했습니다.' });
        }
        const newData = data + string;  // 기존 데이터에 추가
        fs.writeFile(absolutePath, newData, 'utf8', (err) => {
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
    const absolutePath = path.resolve(__dirname, filePath); // 절대 경로로 변환
    fs.stat(absolutePath, (err, stats) => {
        if (err) {
            console.error('파일 크기를 가져오는 중 오류가 발생했습니다:', err);
            return res.status(500).json({ error: '파일 크기를 가져오는 중 오류가 발생했습니다.' });
            
        }
        const size = stats.size;
        let fileSize = '';
        if (size < 1024) {
            fileSize = `${size} bytes`;
        } else if (size < 1048576) {
            fileSize = `${(size / 1024).toFixed(1)} KB`;
        } else {
            fileSize = `${(size / 1048576).toFixed(1)} MB`;
        }
        res.json({ fileSize });
    });
});

app.post('/patch-hits', (req, res) => {
    const { filePath, projectId,newHits } = req.body;
    const absolutePath = path.resolve(__dirname, filePath); // 절대 경로로 변환

    fs.readFile(absolutePath, 'utf8', (err, data) => {
        console.log("fileContent: ", data);
        if (err) {
            console.error('파일을 읽는 중 오류가 발생했습니다:', err);
            return res.status(500).json({ error: '파일 정보를 수정하는 중 오류가 발생했습니다.' });
        }

        let contentWithoutExport = '';
        if (data) {
            contentWithoutExport = data.replace('export const userInfo = ', '');
          } else {
            console.error('Error: fileContent is undefined');
          }
        const projects = JSON.parse(contentWithoutExport.slice(0, -1));
        
        // hits 업데이트
        const updatedProjects = projects.map(project => {
            if (project.projectId === projectId) {
                return { ...project, hits: newHits };
            }
            return project;
        });

        const updatedContent = 'export const projectInfo = ' + 
            JSON.stringify(updatedProjects, null, 2).replace(/}]/g, '}\n]') + 
            ';\n';
        
        // 파일 쓰기
        fs.writeFile(absolutePath, updatedContent, 'utf8', (err) => {
            if (err) {
                console.error('파일을 저장하는 중 오류가 발생했습니다:', err);
                return res.status(500).json({ error: '파일을 저장하는 중 오류가 발생했습니다.' });
            }
            res.json({ success: true });
        });
    });
});

// Vite 개발 서버 시작
async function startVite() {
    const vite = await createServer({
        server: { middlewareMode: 'ssr' } // Vite를 미들웨어 모드로 실행
    });

    // Vite의 미들웨어를 Express 앱에 연결
    app.use(vite.middlewares);

    // 서버 시작
    app.listen(port, () => {
        console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
    });
}

startVite();