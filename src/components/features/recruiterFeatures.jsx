import {oriUsers} from "../domain/startProgram.js";

export const isRecruiter = (userId) => {
    let user = oriUsers.get(userId);
    return user.recruiter? true : false;
}

export const patchContactsByServer = async (filePath, projectId, newContact) => {

    try {
        await fetch('http://localhost:3000/patch-contacts', {  // 서버의 /patch-contacts API 호출
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filePath, projectId, newContact }),
        });
    } catch (error) {
        console.error('파일에 문자열을 추가하는 중 오류가 발생했습니다.', error);
    }

}

export const patchContacts = (projectId, userId) => {
    // projectId: 컨택 버튼이 눌린 프로젝트의 id
    // userId: 컨택을 하는 기업회원의 id

    const FILE_PATH = 'src/components/commmon/dummydata/projectInfo.jsx';

    if (!isRecruiter(userId)) {
        return; // 해당 사용자가 기업회원이 아닌 경우 종료
    }
    else {
        patchContactsByServer(FILE_PATH, projectId, userId);
    }
}