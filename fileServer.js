import express from 'express';
import fs from 'fs-extra';
import path from 'path';
import { createServer } from 'vite';
import cors from 'cors';
import { fileURLToPath } from 'url';



// session=========================================================================
import session from 'express-session';


// __dirname 설정 (ES 모듈 호환)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());



// session==========================================================================
app.use(session({
    secret: 'your-secret-key', // 세션을 암호화하기 위한 키
    resave: false,             // 세션을 항상 저장할지 여부
    saveUninitialized: true,   // 초기화되지 않은 세션도 저장할지 여부
    cookie: { secure: false }  // 개발 환경에서는 false, 배포 시에는 true로 설정
}));

app.post('/login', (req, res) => {
    const { userId, password } = req.body; // 클라이언트로부터 userId, password를 받아옴
    console.log(req.body);
    // userId와 password가 없으면 오류 메시지 반환
    if (!userId || !password) {
        return res.status(400).send('아이디와 비밀번호를 입력해주세요.');
    }

    // oriUsers 배열에서 해당 userId를 찾음
    let user = oriUsers.find(user => user.id === userId);
    
    // userId가 일치하는 사용자가 없으면 오류 메시지 반환
    if (!user) {
        return res.status(404).send('해당 아이디를 찾을 수 없습니다.');
    }

    // 비밀번호가 일치하는지 확인
    if (user.password !== password) {
        return res.status(401).send('비밀번호가 일치하지 않습니다.');
    }

    // 세션에 사용자 정보 저장
    req.session.user = { userId: userId };

    // 로그인 성공 메시지 반환
    res.send(`로그인 되었습니다! 사용자 아이디: ${userId}`);
});


app.get('/check-login', (req, res) => {
    // 세션에 사용자 정보가 있는지 확인하여 로그인 여부 판단
    if (req.session.user) {
        res.send(`로그인된 사용자: ${req.session.user.userId}`);
    } else {
        res.send('로그인되지 않았습니다.');
    }
});


// app.post('/login', (req, res) => {
//     console.log("로그인 요청 들어옴:", req.body);
//     const { emailOrId, password } = req.body;

//     if (!emailOrId || !password) {
//         return res.status(400).json({ message: '아이디 또는 비밀번호가 입력되지 않았습니다.' });
//     }

//     let user;
//     if (emailOrId.includes('@')) {
//         user = oriUsers.find(user => user.email === emailOrId);
//     } else {
//         user = oriUsers.find(user => user.id === emailOrId);
//     }

//     if (!user) {
//         return res.status(404).json({ message: '아이디 또는 이메일이 존재하지 않습니다.' });
//     }

//     if (user.password !== password) {
//         return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
//     }

//     // 로그인 성공 시
//     req.session.user = {user };
//     res.send(`로그인 성공`);
// });



// app.get('/check-login', (req, res) => {
//     // 세션에 사용자 정보가 있는지 확인하여 로그인 여부 판단
//     if (req.session.user) {
//         res.send(`로그인된 사용자: ${req.session.user.userId}`);
//     } else {
//         res.send('로그인되지 않았습니다.');
//     }
// });

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

app.post('/patch-hits', async (req, res) => {
    try {
        const { filePath, projectId, newHits } = req.body;

        // 파일 읽기
        const data = await fs.readFile(filePath, 'utf8');
        
        // JavaScript 객체 문자열을 JSON으로 변환하기 위한 전처리
        let contentWithoutExport = data.replace('export const projectInfo = ', '');
        contentWithoutExport = contentWithoutExport.replace(/;\s*$/, ''); // 끝에 있는 세미콜론 제거
        
        // JavaScript 객체를 JSON으로 변환하기 위한 함수
        function convertToValidJSON(jsString) {
            try {
                // eval을 안전하게 사용하기 위한 Function 생성
                return Function(`"use strict"; return (${jsString})`)();
            } catch (error) {
                console.error('JavaScript 객체 파싱 에러:', error);
                throw error;
            }
        }

        // JavaScript 객체 문자열을 실제 객체로 변환
        const projectsObj = convertToValidJSON(contentWithoutExport);
        
        // hits 업데이트
        const updatedProjects = projectsObj.map(project => {
            if (project.projectId === projectId) {
                return { ...project, hits: newHits };
            }
            return project;
        });

        // 다시 파일에 쓸 때는 원래 형식으로 변환
        const updatedContent = 'export const projectInfo = ' + 
            JSON.stringify(updatedProjects, null, 2)
                .replace(/"([^"]+)":/g, '$1:') // 속성 이름의 따옴표 제거
                .replace(/}]/g, '}\n]') + 
            ';\n';
        
        // 파일 쓰기
        await fs.writeFile(filePath, updatedContent, 'utf8');
        res.json({ success: true, hits: newHits });

    } catch (error) {
        console.error('서버 에러:', error);
        res.status(500).json({ 
            error: '파일 처리 중 오류가 발생했습니다.',
            details: error.message 
        });
    }
});

app.post('/patch-contacts', async (req, res) => {
    try {
        const { filePath1, filePath2, projectId, newContact } = req.body;

        // 파일 읽기
        const data1 = await fs.readFile(filePath1, 'utf8');
        const data2 = await fs.readFile(filePath2, 'utf8');
        
        // JavaScript 객체 문자열을 실제 객체로 변환
        let contentWithoutExport1 = data1.replace('export const projectInfo = ', '');
        contentWithoutExport1 = contentWithoutExport1.replace(/;\s*$/, '');
        let contentWithoutExport2 = data2.replace('export const userInfo = ', '');
        contentWithoutExport2 = contentWithoutExport2.replace(/;\s*$/, '');
        
        function convertToValidJSON(jsString) {
            try {
                return Function(`"use strict"; return (${jsString})`)();
            } catch (error) {
                console.error('JavaScript 객체 파싱 에러:', error);
                throw error;
            }
        }
        
        const projectInfo = convertToValidJSON(contentWithoutExport1);
        const userInfo = convertToValidJSON(contentWithoutExport2); // 수정됨
        
        // 해당 projectId의 project 객체 찾기
        const project = projectInfo.find(p => p.projectId === projectId);
        // 해당 newContact의 user 객체 찾기
        const recruiter = userInfo.find(u => u.id === newContact);

        // 프로젝트의 contacts 필드 업데이트
        if (!project.contacts) {
            project.contacts = [];
        }
        if (!project.contacts.includes(newContact)) {
            project.contacts.push(newContact);
        }

        // 채용자의 contacts 필드 업데이트
        if (!recruiter.contacts) {
            recruiter.contacts = [];
        }
        if (!recruiter.contacts.includes(projectId)) {
            recruiter.contacts.push(projectId);
        }

        // 두 파일 모두 업데이트
        const updatedContent1 = 'export const projectInfo = ' + 
            JSON.stringify(projectInfo, null, 2)
                .replace(/"([^"]+)":/g, '$1:')
                .replace(/}]/g, '}\n]') + 
            ';\n';

        const updatedContent2 = 'export const userInfo = ' + 
            JSON.stringify(userInfo, null, 2)
                .replace(/"([^"]+)":/g, '$1:')
                .replace(/}]/g, '}\n]') + 
            ';\n';

        // 두 파일 모두 저장
        await fs.writeFile(filePath1, updatedContent1, 'utf8');
        await fs.writeFile(filePath2, updatedContent2, 'utf8');

    } catch (error) {
        console.error('서버 에러:', error);
        res.status(500).json({ 
            success: false,
            error: '파일 처리 중 오류가 발생했습니다.',
            details: error.message 
        });
    }
});

app.post('/patch-likes', async (req, res) => {
    try {
        const { filePath, projectId, userId } = req.body;

        // 파일 읽기
        const data = await fs.readFile(filePath, 'utf8');
        
        // JavaScript 객체 문자열을 실제 객체로 변환
        let contentWithoutExport = data.replace('export const projectInfo = ', '');
        contentWithoutExport = contentWithoutExport.replace(/;\s*$/, '');
        
        function convertToValidJSON(jsString) {
            try {
                return Function(`"use strict"; return (${jsString})`)();
            } catch (error) {
                console.error('JavaScript 객체 파싱 에러:', error);
                throw error;
            }
        }
        
        const projectInfo = convertToValidJSON(contentWithoutExport);
        
        // 해당 projectId의 project 객체 찾기
        const project = projectInfo.find(p => p.projectId === projectId);

        // 프로젝트의 likes 필드 업데이트
        if (!project.likes) {
            project.likes = [];
        }
        if (!project.likes.includes(userId)) {
            project.likes.push(userId);
        }
        else {
            project.likes = project.likes.filter((element => element != userId));
        }

        const updatedContent = 'export const projectInfo = ' + 
            JSON.stringify(projectInfo, null, 2)
                .replace(/"([^"]+)":/g, '$1:')
                .replace(/}]/g, '}\n]') + 
            ';\n';

        await fs.writeFile(filePath, updatedContent, 'utf8');

    } catch (error) {
        console.error('서버 에러:', error);
        res.status(500).json({ 
            success: false,
            error: '파일 처리 중 오류가 발생했습니다.',
            details: error.message 
        });
    }
});

app.post('/update-field', (req, res) => {
    const { filePath, hackId, field, newValue } = req.body;
    const absolutePath = path.resolve(__dirname, filePath);
    
    fs.readFile(absolutePath, 'utf8', (err, data) => {
        if (err) {
            console.error('파일을 읽는 중 오류가 발생했습니다:', err);
            return res.status(500).json({ error: '파일을 읽는 중 오류가 발생했습니다.' });
        }

        // hackId로 해당 객체를 찾고, 그 안에서 특정 필드를 찾아 수정
        let pattern;
        if (typeof newValue === 'string') {
            // 문자열 값인 경우 (따옴표로 감싸진 값을 찾음)
            pattern = new RegExp(`(hackId: ${hackId}[^}]*${field}: )['"](.*?)['"]`, 'g');
            data = data.replace(pattern, `$1"${newValue}"`);
        } else {
            // 숫자 값인 경우 (따옴표 없는 값을 찾음)
            pattern = new RegExp(`(hackId: ${hackId}[^}]*${field}: )(\\d+)`, 'g');
            data = data.replace(pattern, `$1${newValue}`);
        }

        fs.writeFile(absolutePath, data, 'utf8', (err) => {
            if (err) {
                console.error('파일을 저장하는 중 오류가 발생했습니다:', err);
                return res.status(500).json({ error: '파일을 저장하는 중 오류가 발생했습니다.' });
            }
            res.json({ success: true });
        });
    });
});

app.post('/delete-hackathon', (req, res) => {
    const { filePath, hackId } = req.body;
    const absolutePath = path.resolve(__dirname, filePath);
    
    fs.readFile(absolutePath, 'utf8', (err, data) => {
        if (err) {
            console.error('파일을 읽는 중 오류가 발생했습니다:', err);
            return res.status(500).json({ error: '파일을 읽는 중 오류가 발생했습니다.' });
        }

        // 해당 hackId를 가진 객체를 찾아서 제거
        const pattern = new RegExp(`\\s*\\{\\s*hackId:\\s*${hackId}[^}]*\\},?`, 'g');
        let newData = data.replace(pattern, '');
        
        // 만약 삭제된 객체가 마지막이 아니었다면 남은 쉼표 처리
        newData = newData.replace(/,(\s*\])/g, '$1');
        // 만약 삭제된 객체가 마지막이었다면 마지막 쉼표 추가
        newData = newData.replace(/}(\s*\])/g, '},\n$1');

        fs.writeFile(absolutePath, newData, 'utf8', (err) => {
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