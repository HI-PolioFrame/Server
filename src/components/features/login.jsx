import oriUsers from '../domain/startProgram.js';

const login = (inputId, inputPwd) => {

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
        return user;
    }
}

export default login;