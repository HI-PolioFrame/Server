import { oriHackathons } from "../domain/startProgram";
import Hackathon from "../domain/Hackathon";
import { appendStringToFile, removeFromFileEnd } from "./signUpDeveloper";

// const filePath = "/src/components/commmon/dummydata/hackathonInfo.jsx";

export const saveHackathon = async (hackName, startDate, endDate, link, memNumber, description, video=null, pictures=null, coverImage=null, logo=null, ownerId,ownerEmail ) => {

    if (!hackName || !startDate || !endDate || !link || !memNumber || !description) {
        console.log(hackName,startDate,endDate,link,memNumber,description);
        console.log("필수 정보가 누락됨");
        return;
    }

    const filePath = "src/components/commmon/dummydata/hackathonInfo.jsx";

    let hackIds = Array.from(oriHackathons.keys());
    const hackId = hackIds.length > 0 ? hackIds[hackIds.length - 1] + 1 : 1;
    
    let hackathon = new Hackathon(hackId, hackName, startDate, endDate, link, memNumber, description, video, pictures, coverImage, logo,ownerId,ownerEmail);
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
        logo: "${logo || ""}",
        ownerId: "${ownerId}",
        ownerEmail: "${ownerEmail}",
    }`;

        await removeFromFileEnd(filePath, 2);
    
        console.log('removeFromFileEnd에서 오류 발생하지 않음');
    
        await appendStringToFile(filePath, `,${string}\n];`);
    
        console.log('appendStringToFile에서 오류 발생하지 않음');

};

export const updateHackathon = async (hackId, field, newValue) => {
    const idField = "hackId";
    const hackathon = oriHackathons.get(hackId);
    
    // 같은 값으로 업데이트하려는 경우 방지
    if (hackathon[field] == newValue) {
        console.log("기존과 같은 값이 입력됨");
        return;
    }

    try {
        // memNumber는 숫자형이어야 하므로 이를 숫자형으로 변환
        if (field === "memNumber") {
            newValue = Number(newValue); // 숫자로 변환
        }

        const filePath = "src/components/commmon/dummydata/hackathonInfo.jsx";
        
        // 필드를 업데이트하는 API 호출
        await fetch('http://localhost:3000/update-field', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath,
                idField,
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
        const idField = "hackId";
        
        await fetch('http://localhost:3000/delete-object', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath,
                idField,
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

// // 해커톤 지원
export const updateParticipant = async (hackId, userId) => {
    const hackathon = oriHackathons.get(Number(hackId));

    // hackathon이 undefined인 경우 처리
    if (!hackathon) {
        console.error(`Hackathon with id ${hackId} not found.`);
        return;
    }

    // hackathon이 존재하면 memNumber를 증가시키는 로직
    const newMemNumber = hackathon["memNumber"] + 1;

    if (hackathon["maxMemNumber"] < newMemNumber) {
        alert("모집 인원을 초과하여 지원할 수 없습니다.");
        return;
    }

    try {
        const filePath = "src/components/commmon/dummydata/hackathonInfo.jsx";

        // 필드를 업데이트하는 API 호출
        await fetch('http://localhost:3000/patch-participant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath,
                hackId: Number(hackId),
                userId: String(userId),
                newMemNumber
            }),
        });

        // Map 객체도 업데이트
        hackathon["participant"] = hackathon["participant"] || []; // participant가 없으면 빈 배열로 초기화
        hackathon["participant"].push(userId); // userId 추가
        hackathon["memNumber"] = newMemNumber;
        oriHackathons.set(hackId, hackathon);

        console.log(`${hackathon["participant"]} 필드가 성공적으로 업데이트되었습니다.`);
    } catch (error) {
        console.error('필드 업데이트 중 오류가 발생했습니다:', error);
    }
};




// export const updateParticipant = async (hackId, userId) => {
//     const hackathon = oriHackathons.get(hackId);
//         console.log(hackId);

//     const newMemNumber = hackathon["memNumber"] + 1;

//     try {

//         const filePath = "src/components/commmon/dummydata/hackathonInfo.jsx";
        
//         // 필드를 업데이트하는 API 호출
//         await fetch('http://localhost:3000/patch-participant', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 filePath,
//                 hackId,
//                 userId,
//                 newMemNumber
//             }),
//         });

//         // Map 객체도 업데이트
//         if (hackathon) {
//             hackathon["participant"] = hackathon["participant"].push(userId);
//             hackathon["memNumber"] = newMemNumber;
//             oriHackathons.set(hackId, hackathon);
//         }

//         console.log(`${hackathon["participant"]} 필드가 성공적으로 업데이트되었습니다.`);
//     } catch (error) {
//         console.error('필드 업데이트 중 오류가 발생했습니다:', error);
//     }

// }