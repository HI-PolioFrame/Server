



// 정상작동하는지 확인되지 않음
// 프론트와 연결 후 확인 필요






import { oriUsers, oriRecruiters } from "../domain/startProgram";
import { User } from "../domain/User";
import { appendStringToFile, removeFromFileEnd } from "../features/fileIO";
import { userInfo } from '../commmon/dummydata/userInfo';

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

// const setId = (id) => {
//     // 유저 DB에 이미 해당 아이디가 존재하면 true 반환, 없으면 false
//     oriUsers.forEach((value, key) => {
//         if (key === id) {
//             alert('이미 사용 중인 아이디입니다.');
//             return;
//         }
//     });

//     // 아이디 설정 조건에 들어맞는가
//     // 영소문, 숫자, _, . 으로 이루어진 6자 이상 20자 이하
//     const idPattern = /^[a-z0-9_.]{6,20}$/;
//     const idMatcher = id.match(idPattern);
//     if (!idMatcher) {
//         alert('아이디는 영소문, 숫자, _, .만을 이용하여 6자 이상, 20자 이하로 입력하세요.');
//         return;
//     }

//     idCheck = true;
// }

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
}

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