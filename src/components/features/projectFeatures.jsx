import { oriProjects } from "../domain/startProgram.js";

export const updateProject = async (projectId, field, newValue) => {

    const idField = "projectId";
    let project = oriProjects.get(projectId);

    if (project[field] == newValue) {
        console.log("기존과 같은 값이 입력됨");
        return;
    }

    if (!newValue) {
        console.log("입력된 값이 없음");
        return;
    }

    try {
        // usedTemplate은 숫자형이어야 하므로 이를 숫자형으로 변환
        if (field === "usedTemplate") {
            newValue = Number(newValue); // 숫자로 변환
        }

        const filePath = "src/components/commmon/dummydata/projectInfo.jsx";
        
        // 필드를 업데이트하는 API 호출
        await fetch('http://localhost:3000/update-field', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath,
                idField,
                id: Number(projectId),
                field,
                newValue
            }),
        });

        // Map 객체도 업데이트
        if (project) {
            project[field] = newValue;
            oriProjects.set(projectId, project);
        }

        console.log(`${field} 필드가 성공적으로 업데이트되었습니다.`);
    } catch (error) {
        console.error('필드 업데이트 중 오류가 발생했습니다:', error);
    }
}

export const deleteProject = async (projectId) => {
    try {
        const filePath = "src/components/commmon/dummydata/projectInfo.jsx";
        const idField = "projectId";
        
        await fetch('http://localhost:3000/delete-object', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath,
                idField,
                id: Number(projectId)
            }),
        });

        // Map 객체에서도 제거
        oriProjects.delete(projectId);

        console.log(`프로젝트 ID ${projectId}가 성공적으로 삭제되었습니다.`);
    } catch (error) {
        console.error('삭제 중 오류가 발생했습니다:', error);
    }
}