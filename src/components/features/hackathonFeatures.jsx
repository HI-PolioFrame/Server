import { oriHackathons } from "../domain/startProgram";
import Hackathon from "../domain/Hackathon";
import { appendStringToFile, removeFromFileEnd } from "./signUpDeveloper";

export const saveHackathon = async (hackName, startDate, endDate, link, memNumber, description, video=null, pictures=null, coverImage=null, logo=null) => {

    if (!hackName || !startDate || !endDate || !link || !memNumber || !description) {
        console.log(hackName,startDate,endDate,link,memNumber,description);
        console.log("필수 정보가 누락됨");
        return;
    }

    const filePath = "src/components/commmon/dummydata/hackathonInfo.jsx";

    let hackIds = Array.from(oriHackathons.keys());
    const hackId = hackIds.length > 0 ? hackIds[hackIds.length - 1] + 1 : 1;
    
    let hackathon = new Hackathon(hackId, hackName, startDate, endDate, link, memNumber, description, video, pictures, coverImage, logo);
    oriHackathons.set(hackId, hackathon);

    const string = `    {
        hackId: ${hackId},
        hackName: "${hackName}",
        startDate: "${startDate}",
        endDate: "${endDate}",
        link: "${link}",
        memNumber: ${memNumber},
        description: "${description}",
        video: "${video || ""}",
        pictures: "${pictures || ""}",
        coverImage: "${coverImage || ""}",
        logo: "${logo || ""}"
    }`;

        await removeFromFileEnd(filePath, 2);
    
        console.log('removeFromFileEnd에서 오류 발생하지 않음');
    
        await appendStringToFile(filePath, `,${string}\n];`);
    
        console.log('appendStringToFile에서 오류 발생하지 않음');

}

export const updateHackathon = async (hackId, field, newValue) => {
    const hackathon = oriHackathons.get(hackId);
    if (hackathon[field] == newValue) {
        console.log("기존과 같은 값이 입력됨");
        return;
    }

    try {
        const filePath = "src/components/commmon/dummydata/hackathonInfo.jsx";
        
        await fetch('http://localhost:3000/update-field', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath,
                hackId,
                field,
                newValue
            }),
        });

        // Map 객체도 업데이트
        if (hackathon) {
            hackathon[field] = newValue;
            oriHackathons.set(hackId, hackathon);
        }

        console.log(`${field} 필드가 성공적으로 업데이트되었습니다.`);
    } catch (error) {
        console.error('필드 업데이트 중 오류가 발생했습니다:', error);
    }
};

export const deleteHackathon = async (hackId) => {
    try {
        const filePath = "src/components/commmon/dummydata/hackathonInfo.jsx";
        
        await fetch('http://localhost:3000/delete-hackathon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath,
                hackId
            }),
        });

        // Map 객체에서도 제거
        oriHackathons.delete(hackId);

        console.log(`해커톤 ID ${hackId}가 성공적으로 삭제되었습니다.`);
    } catch (error) {
        console.error('해커톤 삭제 중 오류가 발생했습니다:', error);
    }
};