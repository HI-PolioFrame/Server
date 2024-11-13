import { oriProjects } from "../domain/startProgram.js";
import Project from "../domain/Project.js";
import { removeFromFileEnd, appendStringToFile } from "./fileIO.jsx";

const saveProject = (
  projectOwnerName, // 포폴 만든 사람 이름
  projectOwnerId, // 포폴 만든 사람 아이디
  projectOwnerNickname,
  projectOwnerEmail, // 포폴 만든 사람 이메일
  projectTemplate = null, //포폴 템플릿
  projectTitle, //포폴 이름
  description, //포폴 설명
  startDate = null,
  endDate = null,
  category,
  usedLanguage,
  projectLink = null,
  solving,
  challenge,
  video = null,
  coverImage = null,
  images = null,
  logo = null,
  share = false // 공유 여부
) => {
  if (
    !projectOwnerName ||
    !projectOwnerId ||
    !projectOwnerNickname ||
    !projectOwnerEmail ||
    !projectTitle ||
    !description ||
    !solving ||
    !challenge ||
    !usedLanguage
  ) {
    console.log(
      projectOwnerName,
      projectOwnerId,
      projectOwnerNickname,
      projectOwnerEmail,
      projectTitle,
      description,
      solving,
      challenge,
      usedLanguage
    );
    console.log("필수 정보가 누락됨");
    return;
  }

  let projectIds = Array.from(oriProjects.keys());
  const projectId =
    projectIds.length > 0 ? projectIds[projectIds.length - 1] + 1 : 1;

  // if (projectIds.includes(projectId)) {
  //   while (!projectIds.includes(projectId)) {
  //     projectId += 1;
  //   }
  // }

  const newProject = new Project(
    projectOwnerName,
    projectOwnerId,
    projectOwnerNickname,
    projectOwnerEmail,
    projectTemplate,
    projectId,
    projectTitle,
    description,
    startDate,
    endDate,
    category,
    usedLanguage,
    projectLink,
    solving,
    challenge,
    video,
    coverImage,
    images,
    logo,
    (share = false)
  );
  oriProjects.set(projectId, newProject);
  console.log(newProject);

  const string = `
    {
        projectId: ${projectId},
        projectTitle: ${projectTitle},
        projectOwnerName: ${projectOwnerName},
        description: ${description || "''"},
        category: ${category},
        usedLanguage: ${usedLanguage},
        projectLink: ${projectLink},
        solving: ${solving},
        challenge: ${challenge},
        video: ${video || "비디오 없음."},
        coverImage: ${coverImage || "없음."},
        images: ${images || "''"},
        logo: ${logo || "없음."},
        share: ${share}
    }
    `;

  let filePath = "../components/dummydata/projectInfo.jsx";

  removeFromFileEnd(filePath, 3);
  appendStringToFile(filePath, `,${string}\n];`);
};

export default saveProject;
