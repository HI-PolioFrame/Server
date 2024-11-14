import { oriProjects } from "../domain/startProgram.js";
import { removeFromFileEnd, appendStringToFile } from "./fileIO.jsx";
import fs from 'fs';

const FILE_PATH = './projectInfo.jsx';

export const countHits = (userId, projectId) => {
    // userId : 프로젝트를 누른 유저의 Id를 가져옴
    // projectId: 해당 유저가 누른 프로젝트의 Id를 가져옴

    let project = oriProjects.get(projectId);

    if (userId == project.ownerId) {
        return; // 자신의 프로젝트를 누른 경우 증가하지 않고 종료
    }
    else {
        let newHits = project.hits + 1;
        try {
            // 파일 읽기
            const fileContent = fs.readFile(FILE_PATH, 'utf8');
            
            // 문자열을 JavaScript 코드로 변환하기 위해 export const 부분 제거
            const contentWithoutExport = fileContent.replace('export const projectInfo = ', '');
            
            // 배열로 파싱
            const projects = JSON.parse(contentWithoutExport.slice(0, -1)); // 마지막 세미콜론 제거
            
            // projectId로 프로젝트 찾아서 hits 업데이트
            const updatedProjects = { ...project, hits: newHits };


            // 다시 문자열로 변환하고 export 구문 추가
            const updatedContent = 'export const projectInfo = ' + 
                JSON.stringify(updatedProjects, null, 2).replace(/}]/g, '}\n]') + ';\n';
            
            // 파일 쓰기
            fs.writeFile(FILE_PATH, updatedContent, 'utf8');
            
            console.log(`프로젝트 ID ${projectId}의 hits가 ${newHits}로 업데이트되었습니다.`);
        } catch (error) {
            console.error('hits 업데이트 중 오류가 발생했습니다:', error);
            throw error;
        }
    }
}
