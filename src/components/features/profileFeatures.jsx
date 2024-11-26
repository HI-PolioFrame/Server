import { oriUsers } from "../domain/startProgram";
import { isEmailChecked, isIdChecked, isPhoneNumberChecked, isPassword } from "./signUpDeveloper";

export const updateName = async (userId, newValue) => {
    const idField = "id";
    const field = "name";
    const user = oriUsers.get(userId);

    // 같은 값으로 업데이트하려는 경우 방지
    if (user[field] == newValue) {
        console.log("기존과 같은 값이 입력됨");
        return;
    }

    if (!newValue) {
        console.log('입력된 값이 없음');
        return;
    }

    try {
        const filePath = "src/components/commmon/dummydata/userInfo.jsx";
        
        // 필드를 업데이트하는 API 호출
        await fetch('http://localhost:3000/update-field', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath,
                idField,
                id: String(userId),
                field,
                newValue
            }),
        });

        // Map 객체도 업데이트
        if (user) {
            user[field] = newValue;
            oriUsers.set(userId, user);
        }

        console.log(`${field} 필드가 성공적으로 업데이트되었습니다.`);
    } catch (error) {
        console.error('필드 업데이트 중 오류가 발생했습니다:', error);
    }
}

export const updateNickname = async (userId, newValue) => {
    const idField = "id";
    const field = "nickname";
    const user = oriUsers.get(userId);

    // 같은 값으로 업데이트하려는 경우 방지
    if (user[field] == newValue) {
        console.log("기존과 같은 값이 입력됨");
        return;
    }

    if (!newValue) {
        console.log('입력된 값이 없음');
        return;
    }

    try {
        const filePath = "src/components/commmon/dummydata/userInfo.jsx";
        
        // 필드를 업데이트하는 API 호출
        await fetch('http://localhost:3000/update-field', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath,
                idField,
                id: String(userId),
                field,
                newValue
            }),
        });

        // Map 객체도 업데이트
        if (user) {
            user[field] = newValue;
            oriHackathons.set(userId, user);
        }

        console.log(`${field} 필드가 성공적으로 업데이트되었습니다.`);
    } catch (error) {
        console.error('필드 업데이트 중 오류가 발생했습니다:', error);
    }
}

export const updateId = async (userId, newValue) => {
    const idField = "id";
    const field = "id";
    const user = oriUsers.get(userId);

    // 같은 값으로 업데이트하려는 경우 방지
    if (user[field] == newValue) {
        console.log("기존과 같은 값이 입력됨");
        return;
    }

    if (!newValue) {
        console.log('입력된 값이 없음');
        return;
    }

    // if (!isIdChecked()) return;

    try {
        const filePath = "src/components/commmon/dummydata/userInfo.jsx";
        
        // 필드를 업데이트하는 API 호출
        await fetch('http://localhost:3000/update-field', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath,
                idField,
                id: String(userId),
                field,
                newValue
            }),
        });

        // Map 객체도 업데이트
        if (user) {
            user[field] = newValue;
            oriUsers.delete(userId);
            oriUsers.set(newValue, user);
        }

        console.log(`${field} 필드가 성공적으로 업데이트되었습니다.`);
    } catch (error) {
        console.error('필드 업데이트 중 오류가 발생했습니다:', error);
    }
}

export const updateEmail = async (userId, newValue) => {
    const idField = "id";
    const field = "email";
    const user = oriUsers.get(userId);

    // 같은 값으로 업데이트하려는 경우 방지
    if (user[field] == newValue) {
        console.log("기존과 같은 값이 입력됨");
        return;
    }

    if (!newValue) {
        console.log('입력된 값이 없음');
        return;
    }

    // if (!isEmailChecked()) return;

    try {
        const filePath = "src/components/commmon/dummydata/userInfo.jsx";
        
        // 필드를 업데이트하는 API 호출
        await fetch('http://localhost:3000/update-field', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath,
                idField,
                id: String(userId),
                field,
                newValue
            }),
        });

        // Map 객체도 업데이트
        if (user) {
            user[field] = newValue;
            oriUsers.set(userId, user);
        }

        console.log(`${field} 필드가 성공적으로 업데이트되었습니다.`);
    } catch (error) {
        console.error('필드 업데이트 중 오류가 발생했습니다:', error);
    }
}

export const updatePassword = async (userId, newValue) => {
    const idField = "id";
    const field = "password";
    const user = oriUsers.get(userId);

    // 같은 값으로 업데이트하려는 경우 방지
    if (user[field] == newValue) {
        console.log("기존과 같은 값이 입력됨");
        return;
    }

    if (!newValue) {
        console.log('입력된 값이 없음');
        return;
    }

    // if (!isPassword(newValue, rePassword)) return;

    try {
        const filePath = "src/components/commmon/dummydata/userInfo.jsx";
        
        // 필드를 업데이트하는 API 호출
        await fetch('http://localhost:3000/update-field', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath,
                idField,
                id: String(userId),
                field,
                newValue
            }),
        });

        // Map 객체도 업데이트
        if (user) {
            user[field] = newValue;
            oriUsers.set(userId, user);
        }

        console.log(`${field} 필드가 성공적으로 업데이트되었습니다.`);
    } catch (error) {
        console.error('필드 업데이트 중 오류가 발생했습니다:', error);
    }
}

export const updatePhoneNumber = async (userId, newValue) => {
    const idField = "id";
    const field = "phoneNumber";
    const user = oriUsers.get(userId);

    // 같은 값으로 업데이트하려는 경우 방지
    if (user[field] == newValue) {
        console.log("기존과 같은 값이 입력됨");
        return;
    }

    if (!newValue) {
        console.log('입력된 값이 없음');
        return;
    }

    // if (!isPhoneNumberChecked()) return;

    try {
        const filePath = "src/components/commmon/dummydata/userInfo.jsx";
        
        // 필드를 업데이트하는 API 호출
        await fetch('http://localhost:3000/update-field', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath,
                idField,
                id: String(userId),
                field,
                newValue
            }),
        });

        // Map 객체도 업데이트
        if (user) {
            user[field] = newValue;
            oriUsers.set(userId, user);
        }

        console.log(`${field} 필드가 성공적으로 업데이트되었습니다.`);
    } catch (error) {
        console.error('필드 업데이트 중 오류가 발생했습니다:', error);
    }
}

export const deleteAccount = async (userId) => {
    try {
        const filePath = "src/components/commmon/dummydata/userInfo.jsx";
        const idField = "id";
        
        await fetch('http://localhost:3000/delete-object', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath,
                idField,
                id: String(userId),
            }),
        });

        // Map 객체에서도 제거
        oriUsers.delete(userId);

        console.log(`사용자 ID ${userId}가 성공적으로 삭제되었습니다.`);
    } catch (error) {
        console.error('사용자 삭제 중 오류가 발생했습니다:', error);
    }
}