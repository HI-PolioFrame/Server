import { oriProjects } from "../domain/startProgram.js";
import { removeFromFileEnd, appendStringToFile } from "./fileIO.jsx";
import fs from 'fs';

const FILE_PATH = './projectInfo.jsx';

export const countHits = async (filePath, userId, projectId) => {
    // userId : 프로젝트를 누른 유저의 Id를 가져옴
    // projectId: 해당 유저가 누른 프로젝트의 Id를 가져옴

    let project = oriProjects.get(projectId);

    if (userId == project.ownerId) {
        return; // 자신의 프로젝트를 누른 경우 증가하지 않고 종료
    }
    else {
        let newHits = project.hits + 1;
        try {
            await fetch('http://localhost:3000/patch-hits', {  // 서버의 /patch-hits API 호출
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filePath, projectId, newHits }),
            });
        } catch (error) {
            console.error('파일에 문자열을 추가하는 중 오류가 발생했습니다.', error);
        }
    }
}
