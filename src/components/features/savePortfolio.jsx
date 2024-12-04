import { oriPortfolios } from "../domain/startProgram.js";
import Portfolio from "../domain/Portfolio.js";

export const removeFromFileEnd = async (filePath, numCharsToRemove) => {
  try {
    await fetch("http://localhost:3000/remove-from-file-end", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePath, numCharsToRemove }),
    });
  } catch (error) {
    console.error(
      "파일 끝에서 문자열을 제거하는 중 오류가 발생했습니다.",
      error
    );
  }
};

export const appendStringToFile = async (filePath, string) => {
  try {
    await fetch("http://localhost:3000/append-string", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePath, string }),
    });
  } catch (error) {
    console.error("파일에 문자열을 추가하는 중 오류가 발생했습니다.", error);
  }
};

export const savePortfolio = async (
  portfolioOwnerId, // 포트폴리오 소유자 ID
  portfolioOwnerEamil,
  portfolioName, // 포트폴리오 이름
  selectedProjects = [], // 포함된 프로젝트 ID들
  usedLanguage = "", // 사용 언어
  share = false // 공유 여부
) => {
  if (
    !portfolioOwnerId ||
    !portfolioName ||
    selectedProjects.length === 0 ||
    !usedLanguage
  ) {
    console.error("필수 정보가 누락되었습니다.");
    return;
  }

  // 새 포트폴리오 ID 생성
  let portfolioIds = Array.from(oriPortfolios.keys());
  const portfolioId =
    portfolioIds.length > 0 ? portfolioIds[portfolioIds.length - 1] + 1 : 1;

  // 포트폴리오 객체 생성
  const newPortfolio = new Portfolio(
    portfolioId, // 포트폴리오 ID
    portfolioOwnerId, // 소유자 ID
    portfolioOwnerEamil,
    portfolioName, // 포트폴리오 이름
    selectedProjects, // 포함된 프로젝트들
    usedLanguage, // 사용 언어
    share // 공유 여부
  );

  // 로컬 데이터에 추가
  oriPortfolios.set(portfolioId, newPortfolio);
  console.log("새로운 포트폴리오 생성:", newPortfolio);

  // 파일에 저장할 문자열 변환
  const string = `
  {
    portfolioId: ${portfolioId},
    portfolioName: "${portfolioName}",
    ownerId: "${portfolioOwnerId}",
    ownerEmail: "${portfolioOwnerEamil}",
    projects: ${JSON.stringify(selectedProjects)},
    usedLanguage: "${usedLanguage}",
    share: ${share}
  }`;

  // 파일 경로
  let filePath = "src/components/commmon/dummydata/portfolioInfo.jsx";

  // 기존 파일에서 끝부분 제거 후 새로운 포트폴리오 추가
  await removeFromFileEnd(filePath, 3);
  await appendStringToFile(filePath, `,${string}\n];`);
};

export default savePortfolio;
