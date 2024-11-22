// 로그인 session 관리하는 express 서버
const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json()); // JSON 요청 바디 파싱
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));


// app.use(session({
//     secret: 'your-secret-key', // 세션을 암호화하기 위한 키
//     resave: false,             // 세션을 항상 저장할지 여부
//     saveUninitialized: true,   // 초기화되지 않은 세션도 저장할지 여부
//     cookie: { secure: false }  // 개발 환경에서는 false, 배포 시에는 true로 설정
// }));

// app.get('/login', (req, res) => {
//     // 로그인 시 세션에 사용자 정보를 저장
//     req.session.user = { username: 'exampleUser' };
//     res.send('로그인 되었습니다!');
// });

// app.get('/check-login', (req, res) => {
//     // 세션에 사용자 정보가 있는지 확인하여 로그인 여부 판단
//     if (req.session.user) {
//         res.send(`로그인된 사용자: ${req.session.user.username}`);
//     } else {
//         res.send('로그인되지 않았습니다.');
//     }
// });


app.post('/login', (req, res) => {
    console.log("요청 바디:", req.body);

    const { email, id, password } = req.body;
    const user = userInfo.find(
        (user) =>
            ((user.email && user.email.toLowerCase() === email.toLowerCase()) ||
            (user.id && user.id.toString() === id)) &&
            user.password.toString() === password
    );

    if (user) {
        req.session.user = { id: user.id, email: user.email }; // 필요한 정보만 저장
        res.json({ message: "로그인 성공", user }); // JSON 형식으로 성공 응답 -> 근데 안돼
    } else {
        res.status(401).json({ message: "로그인 실패" });
    }
});
app.get('/check-login', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("로그아웃 중 오류 발생");
        }
        res.send("로그아웃 성공");
    });
});

app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 실행 중입니다.');
});