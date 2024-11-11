import { oriPortfolios } from "../domain/startProgram.js";
import Portfolio from "../domain/Portfolio.js";
import { removeFromFileEnd, appendStringToFile } from "./fileIO.jsx";

const savePortfolio = (
  portfolioId, // 포폴 아이디 = 포폴 만든 사람 아이디
  portfolioOwnerId, // 포폴 만든 사람 아이디
  portfolioOwnerEmail, // 포폴 만든 사람 이메일
  portfolioTemplate = null, //포폴 템플릿
  portfolioTitle, //포폴 이름
  explanation = null, //포폴 설명
  share = false, // 공유 여부
  picture = null,
  file
) => {
  if (!templateName || !file) {
    console.log("필수 정보가 누락됨");
    return;
  }

  let templateIds = Array.from(oriTemplates.keys());
  const templateId = templateIds[templateIds.length - 1] + 1;

  if (templateIds.includes(templateId)) {
    while (!templateIds.includes(templateId)) {
      templateId += 1;
    }
  }

  const template = new Template(
    templateId,
    templateName,
    templateOwner,
    description,
    picture,
    file
  );
  oriTemplates.set(templateId, template);

  const string = `
    {
        templateId: ${templateId},
        templateName: ${templateName},
        templateOwner: ${templateOwner},
        description: ${description || "''"},
        picture: ${picture || "''"},
        file: ${file}
    }
    `;

  let filePath = "../common/dummydata/templateInfo.jsx";

  removeFromFileEnd(filePath, 3);
  appendStringToFile(filePath, `,${string}\n];`);
};

export default savePortfolio;
