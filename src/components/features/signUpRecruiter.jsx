import { oriUsers, oriRecruiters } from "../domain/startProgram";
import { User } from "../domain/User";

// 파일에서 데이터를 가져오는 함수 (서버 API 호출)
export const fetchFileData = async (filePath) => {
    try {
        const response = await fetch('http://localhost:3000/read-number', {  // 서버의 /read-number API 호출
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filePath }),  // filePath를 서버로 전달
        });
        if (!response.ok) {
            throw new Error('네트워크 응답이 좋지 않습니다.');
        }
        const data = await response.json();
        return data.number;  // 서버에서 반환된 숫자 값
    } catch (error) {
        console.error('파일을 읽는 중 오류가 발생했습니다.', error);
        return null;
    }
};

// 파일에 문자열 추가하는 함수 (서버 API 호출)
export const appendStringToFile = async (filePath, string) => {
    try {
        await fetch('http://localhost:3000/append-string', {  // 서버의 /append-string API 호출
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filePath, string }),  // filePath와 string을 서버로 전달
        });
    } catch (error) {
        console.error('파일에 문자열을 추가하는 중 오류가 발생했습니다.', error);
    }
};

// 파일 비우는 함수 (서버 API 호출)
export const truncateFile = async (filePath) => {
    try {
        await fetch('http://localhost:3000/truncate-file', {  // 서버의 /truncate-file API 호출
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filePath }),  // filePath를 서버로 전달
        });
    } catch (error) {
        console.error('파일을 비우는 중 오류가 발생했습니다.', error);
    }
};

// 파일 끝에서 문자열을 제거하는 함수 (서버 API 호출)
export const removeFromFileEnd = async (filePath, numCharsToRemove) => {
    try {
        await fetch('http://localhost:3000/remove-from-file-end', {  // 서버의 /remove-from-file-end API 호출
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filePath, numCharsToRemove }),  // filePath와 numCharsToRemove를 서버로 전달
        });
    } catch (error) {
        console.error('파일 끝에서 문자열을 제거하는 중 오류가 발생했습니다.', error);
    }
};

let idCheck = false;
let emailCheck = false;
let phoneNumCheck = false;
let companyCheck = false;

export const idSignUpRecruiter = (name, birthday, id, password, rePassword, phoneNumber) => {
    if (name === null || birthday === null || phoneNumber.length === 0){
        alert('모든 항목을 입력하세요.');
    }
    if (!isIdChecked()) return;
    if (!isPhoneNumberChecked()) return;
    if (!isCompanyChecked()) return;
    if (!isPassword(password, rePassword)) return;

    // oriUsers, oriRecruiters 링크드 리스트와 userInfo.jsx에 유저(기업회원) 추가
    const user = new User(id, null, password, name, phoneNumber, birthday, true);
    oriUsers.set(id, user);
    oriRecruiters.set(id, user);

    // userInfo.jsx에 해당 유저를 추가한다.
    const filePath = '../commmon/dummydata/userInfo.jsx';
    const string = `
        {
            id: "${id}",
            pageId: null,
            password: "${password}",
            name: "${name}",
            phoneNumber: "${phoneNumber}",
            birthday: "${birthday[0]}-${birthday[1]}-${birthday[2]}",
            recruiter: true,
            email: "",
            nickname: "",
            link: "",
            career: "없음",
            education: ""
        }`;
    removeFromFileEnd(filePath, 3);
    appendStringToFile(filePath, `,${string}\n];`);
}

export const emailSignUpRecruiter = (name, birthday, email, password, rePassword, phoneNumber) => {
    if (name === null || birthday === null || phoneNumber.length === 0){
        alert('모든 항목을 입력하세요.');
    }
    if (!isEmailChecked()) return;
    if (!isPhoneNumberChecked()) return;
    if (!isCompanyChecked()) return;
    if (!isPassword(password, rePassword)) return;

    // oriUsers, oriRecruiters 링크드 리스트와 userInfo.jsx에 유저(기업회원) 추가

    // 아이디를 생성하지 않았으므로 랜덤 문자열 생성
    // 기존 아이디와 비교하여 존재하지 않는 경우에만 설정
    let randomId = getRandomId();
    while (isIdExists(randomId)) randomId = getRandomId();

    const user = new User(randomId, null, password, name, phoneNumber, birthday, true, email);
    oriUsers.set(randomId, user);
    oriRecruiters.set(randomId, user);

    // userInfo.jsx에 해당 유저를 추가한다.
    const filePath = '../commmon/dummydata/userInfo.jsx';
    const string = `
        {
            id: "${randomId}",
            pageId: null,
            password: "${password}",
            name: "${name}",
            phoneNumber: "${phoneNumber}",
            birthday: "${birthday[0]}-${birthday[1]}-${birthday[2]}",
            recruiter: true,
            email: "${email}",
            nickname: "",
            link: "",
            career: "없음",
            education: ""
        }`;
    removeFromFileEnd(filePath, 3);
    appendStringToFile(filePath, `,${string}\n];`);
}

//현혜찡 코드
export const setId = (id) => {
   
    idCheck = false;

    const idPattern = /^[a-z0-9_.]{6,20}$/;
    if (!id.match(idPattern)) {
        alert('아이디는 영소문, 숫자, _, .만을 이용하여 6자 이상, 20자 이하로 입력하세요.');
        return idCheck;
    }

    for (const [key, user] of oriUsers){
        if (key === id){
            alert('이미 사용 중인 아이디입니다.');
            return idCheck;
        }
    }

    idCheck = true;
    return idCheck;
};

// const setEmail = (email) => {
//     // 유저 DB에 이미 해당 이메일이 존재하면 true 반환, 없으면 false
//     oriUsers.forEach((value, key) => {
//         if (value.email === email) {
//             alert('이미 계정이 존재합니다.');
//             return;
//         }
//     });

//     // 임의처리한다.
//     emailCheck = true;
// }
export const setEmail = (email) => {
    // 이메일 형식 확인
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('유효한 이메일 형식이 아닙니다.');
        return false;
    }
    for (const [key, value] of oriUsers.entries()) {
        if (value.email === email) {
            alert('이미 계정이 존재합니다.');
            return false;
        }
    }
    return true;
};

export const setPhoneNumber = (phoneNumber) => {
    console.log("oriUsers 데이터:", oriUsers);

    // 1. 전화번호 형식 검증
     const phonePattern = /^010-\d{4}-\d{4}$/; // 전화번호 형식: 010-xxxx-xxxx
    if (!phonePattern.test(phoneNumber.trim())) {
        alert('올바른 전화번호를 입력하세요. 형식: 010-xxxx-xxxx');
        return false;
    }

    // 2. Map 객체에서 중복 확인
    for (const [key, user] of oriUsers.entries()) {
        if (user.phoneNumber === phoneNumber) {
            alert('이미 사용 중인 전화번호입니다.');
            return false;
        }
    }

    // 중복되지 않으면 true 반환
    return true;
};


export const isIdExists = (id) => {
    oriUsers.forEach((value, key) => {
        if (key === id) {
            return true;
        }
    });
    return false;
}

// 회사인증
// 임의로 처리한다.
export const setCompany = () => {

    companyCheck = true;
}

// 아이디나 이메일, 전화번호 중복 체크 후에 입력값이 변하면 다시 체크해야 하므로
export const changedId = () => idCheck = false;  
export const changedEmail = () => emailCheck = false;
export const changedPhoneNumber = () => phoneNumCheck = false;
export const changedCompany = () => companyCheck = false;

// 중복 체크가 되어 있지 않으면 실행지 않는다
export const isIdChecked = () => {
    if (idCheck === false) {
        alert('아이디 중복 체크를 해야합니다.');
        return 0
    }
    return 1;
}

export const isEmailChecked = () => {
    if (emailCheck === false) {
        alert('이메일 중복 체크를 해야 합니다.');
        return 0;
    }
    return 1;
}

export const isPhoneNumberChecked = () => {
    if (phoneNumCheck === false) {
        alert('전화번호 중복 체크를 해야 합니다.');
        return 0;
    }
    return 1;
}

export const isCompanyChecked = () => {
    if (companyCheck === false) {
        alert('회사 인증을 해야 합니다.');
        return 0;
    }
    return 1;
}

export const isPassword = (password, rePassword) => {
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

export const generateRandomString = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_.';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

export const getRandomId = () => {
    // 길이를 6에서 20 사이로 랜덤하게 설정
    const length = Math.floor(Math.random() * (20 - 6 + 1)) + 6;
    return generateRandomString(length);
}


// 아이디로 회원가입 버튼 눌렀을 때: idSignUpRecruiter
//      아이디 중복확인 눌렀을 때: setId
// 이메일로 회원가입 버튼 눌렀을 때: emailSignUpRecruiter
//      이메일 중복확인 눌렀을 때: setEmail
// 공통 전화번호 중복확인 눌렀을 때: setPhoneNumber
// 공통 회사 인증하기 눌렀을 때: setCompany
//
// 아이디 변경됐을 때: changedId
// 전화번호 변경됐을 때: changedPhoneNumber
// 회사 변경됐을 때: changedCompany
// export { idSignUpRecruiter, emailSignUpRecruiter, setId, setEmail, setPhoneNumber, setCompany, changedId, changedEmail, changedPhoneNumber, changedCompany };