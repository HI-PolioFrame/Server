import { oriHackathons } from "../domain/startProgram";
import Hackathon from "../domain/Hackathon";
import { removeFromFileEnd, appendStringToFile } from "./fileIO.jsx";

export const saveHackathons = (hackName, startDate, endDate, description, picture) => {

    if (!hackName || !startDate || !endDate) {
        console.log("필수 정보가 누락됨");
        return;
    }

    let hackIds = Array.from(oriHackathons.keys());
    const hackId = hackIds.length > 0 ? projectIds[projectIds.length - 1] + 1 : 1;
    
    let hackathon = new Hackathon(hackId, hackName, startDate, endDate, description, picture);
    oriHackathons.set(hackId, hackathon);

    const string = `
        {
            hackId: ${hackId},
            hackName: ${hackName},
            startDate: ${startDate},
            endDate: ${endDate},
            description: ${description || "설명 없음"},
            picture: ${picture || "사진 없음"}
        }
        `;

    let filePath = "../components/dummydata/hackathonInfo.jsx";

    removeFromFileEnd(filePath, 3);
    appendStringToFile(filePath, `,${string}\n];`);

}