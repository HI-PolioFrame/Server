import {oriUsers} from '../domain/startProgram.js'; // 여기 수정함

// 로그인 세션 (서버 API 호출)
export const loginSession = async (userId) => {
    try {
        await fetch('http://localhost:3000/login', {  // 서버의 /login API 호출
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),  // userId를 서버로 전달
        });
    } catch (error) {
        console.error('로그인 중 오류가 발생했습니다.', error);
    }
};

const login = async (inputId, inputPwd) => {

    inputId = parseInt(inputId);
    inputPwd = parseInt(inputPwd);

    if (!inputId || !inputPwd) {
        console.log("아이디 또는 패스워드가 입력되지 않음");
        return;
    }

    const user = oriUsers.get(inputId);
    
    if (!user || user.password !== inputPwd) {
        console.log("아이디 또는 패스워드가 일치하지 않습니다.");
        return;
    }
    else {
        console.log("login session에 id를 등록합니다.");
        const meg = await loginSession(inputId);
        console.log(`${msg}`);
        return user;
    }
}

export default login;