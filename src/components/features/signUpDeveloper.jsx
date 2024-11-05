



// 정상작동하는지 확인되지 않음
// 프론트와 연결 후 확인 필요






import { oriUsers } from "../domain/startProgram";
import { User } from "../domain/User";
import { appendStringToFile, truncateFile, readNumberFromFile, removeFromFileEnd } from "../features/fileIO";
import { userInfo } from '../commmon/dummydata/userInfo';

let idCheck = false;
let emailCheck = false;
let phoneNumCheck = false;

export const idSignUpDeveloper = (name, birthday, id, password, rePassword, phoneNumber) => {
    if (name === null || birthday === null || phoneNumber.length === 0){
        alert('모든 항목을 입력하세요.');
    }
    if (!isIdChecked()) return;
    if (!isPhoneNumberChecked()) return;
    if (!isPassword(password, rePassword)) return;

    // oriUsers 링크드 리스트와 userInfo.jsx에 유저 추가
    let filePath = '../commmon/dummydata/nextPageId.jsx';
    const pageId = readNumberFromFile(filePath);
    truncateFile(filePath);
    appendStringToFile(String(pageId+1));
    const user = new User(id, pageId, password, name, phoneNumber, birthday);
    oriUsers.set(id, user);

    // userInfo.jsx에 해당 유저를 추가한다.
    filePath = '../commmon/dummydata/userInfo.jsx';
    const string = `
        {
            id: "${id}",
            pageId: ${pageId},
            password: "${password}",
            name: "${name}",
            phoneNumber: "${phoneNumber}",
            birthday: "${birthday[0]}-${birthday[1]}-${birthday[2]}",
            recruiter: false,
            email: "",
            nickname: "",
            link: "",
            career: "없음",
            education: ""
        }`;
    removeFromFileEnd(filePath, 3);
    appendStringToFile(filePath, `,${string}\n];`);
}

export const emailSignUpDeveloper = (name, birthday, email, password, rePassword, phoneNumber) => {
    if (name === null || birthday === null || phoneNumber.length === 0){
        alert('모든 항목을 입력하세요.');
    }
    if (!isEmailChecked()) return;
    if (!isPhoneNumberChecked()) return;
    if (!isPassword(password, rePassword)) return;

    // oriUsers 링크드 리스트와 userInfo.jsx에 유저 추가
    let filePath = '../commmon/dummydata/nextPageId.jsx';
    const pageId = readNumberFromFile(filePath);
    truncateFile(filePath);
    appendStringToFile(String(pageId+1));

    // 아이디를 생성하지 않았으므로 랜덤 문자열 생성
    // 기존 아이디와 비교하여 존재하지 않는 경우에만 설정
    let randomId = getRandomId();
    while (isIdExists(randomId)) randomId = getRandomId();

    const user = new User(randomId, pageId, password, name, phoneNumber, birthday, email);
    oriUsers.set(randomId, user);

    // userInfo.jsx에 해당 유저를 추가한다.
    filePath = '../commmon/dummydata/userInfo.jsx';
    const string = `
        {
            id: "${randomId}",
            pageId: ${pageId},
            password: "${password}",
            name: "${name}",
            phoneNumber: "${phoneNumber}",
            birthday: "${birthday[0]}-${birthday[1]}-${birthday[2]}",
            recruiter: false,
            email: "${email}",
            nickname: "",
            link: "",
            career: "없음",
            education: ""
        }`;
    removeFromFileEnd(filePath, 3);
    appendStringToFile(filePath, `,${string}\n];`);
}

export const setId = (id) => {
    const idPattern = /^[a-z0-9_.]{6,20}$/;
    if (!id.match(idPattern)) {
        alert('아이디는 영소문, 숫자, _, .만을 이용하여 6자 이상, 20자 이하로 입력하세요.');
        return false;
    }

    let isIdValid = true;
    userInfo.forEach((user) => {  
        if (user.id === id) {
            alert('이미 사용 중인 아이디입니다.');
            isIdValid = false;
            return;
        }
    });

    return isIdValid;
};
// export default setId;

export const setEmail = (email) => {
    // 유저 DB에 이미 해당 이메일이 존재하면 true 반환, 없으면 false
    oriUsers.forEach((value, key) => {
        if (value.email === email) {
            alert('이미 계정이 존재합니다.');
            return;
        }
    });

    // 임의처리한다.
    emailCheck = true;
}

export const setPhoneNumber = (phoneNumber) => {
    for (let value of userInfo) {
        if (value.phoneNumber === phoneNumber) {
            alert('이미 계정이 존재합니다.');
            return false; 
        }
    }
    const phonePattern = /^010-\d{4}-\d{4}$/; 
    if (!phonePattern.test(phoneNumber)) {
        alert('올바른 전화번호를 입력하세요.'); 
        return false; 
    }

    return true; 
};


export  const isIdExists = (id) => {
    oriUsers.forEach((value, key) => {
        if (key === id) {
            return true;
        }
    });
    return false;
}


// 아이디나 이메일, 전화번호 중복 체크 후에 입력값이 변하면 다시 체크해야 하므로
export const changedId = () => idCheck = false;
export const changedEmail = () => emailCheck = false;
export const changedPhoneNumber = () => phoneNumCheck = false;

// 중복 체크가 되어 있지 않으면 실행지 않는다
export  const isIdChecked = () => {
    if (idCheck === false) {
        alert('아이디 중복 체크를 해야합니다.');
        return 0
    }
    return 1;
}

export  const isEmailChecked = () => {
    if (emailCheck === false) {
        alert('이메일 중복 체크를 해야 합니다.');
        return 0;
    }
    return 1;
}

export  const isPhoneNumberChecked = () => {
    if (phoneNumCheck === false) {
        alert('전화번호 중복 체크를 해야 합니다.');
        return 0;
    }
    return 1;
}

export  const isPassword = (password, rePassword) => {
    // 비밀번호와 비밀번호 확인란이 동일한가
    if (password !== rePassword) {
        alert('비밀번호와 재입력한 비밀번호가 일치하지 않습니다');
        return 0;
    }

    // 비밀번호가 조건에 들어맞는가
    // 영문+특문+숫자로 12자 이상, 20자 이하
    const passPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{12,20}$/;
    const passMatcher = password.match(passPattern);
    if (!passMatcher) {
        alert('비밀번호는 영문+특수문자+숫자로 12자 이상, 20자 이하로 입력하세요.');
        return 0;
    }
    return 1;
}

export  const generateRandomString = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_.';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

export  const getRandomId = () => {
    // 길이를 6에서 20 사이로 랜덤하게 설정
    const length = Math.floor(Math.random() * (20 - 6 + 1)) + 6;
    return generateRandomString(length);
}


// 아이디로 회원가입 버튼 눌렀을 때: idSignUpDeveloper
//      아이디 중복확인 눌렀을 때: setId
// 이메일로 회원가입 버튼 눌렀을 때: emailSignUpDeveloper
//      이메일 중복확인 눌렀을 때: setEmail
// 공통 전화번호 중복확인 눌렀을 때: setPhoneNumber
//
// 아이디 변경됐을 때: changedId
// 전화번호 변경됐을 때: changedPhoneNumber
export default { idSignUpDeveloper, emailSignUpDeveloper,setId, setEmail, setPhoneNumber, changedId, changedEmail, changedPhoneNumber };