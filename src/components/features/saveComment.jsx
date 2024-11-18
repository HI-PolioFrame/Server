import { oriComments } from "../domain/startProgram.js";
import Comment from "../domain/Comment.js";

export const removeFromFileEnd = async (filePath, numCharsToRemove) => {
  try {
    await fetch("http://localhost:3000/remove-from-file-end", {
      // 서버의 /remove-from-file-end API 호출
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePath, numCharsToRemove }), // filePath와 numCharsToRemove를 서버로 전달
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
      // 서버의 /append-string API 호출
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePath, string }), // filePath와 string을 서버로 전달
    });
  } catch (error) {
    console.error("파일에 문자열을 추가하는 중 오류가 발생했습니다.", error);
  }
};

export const saveComment = async (portfolioId, userId, text) => {
  if (!text || !userId) {
    console.log("필수 정보가 누락됨");
    return;
  }

  // 새 댓글 ID 생성
  let commentIds = Array.from(oriComments.keys());
  const commentId =
    commentIds.length > 0 ? commentIds[commentIds.length - 1] + 1 : 1;

  const newComment = new Comment(
    commentId,
    portfolioId,
    userId,
    text,
    new Date().toString()
  );
  oriComments.set(commentId, newComment);
  console.log(newComment);

  // 파일에 저장할 문자열 형식
  const string = `
  {
    commentId: ${commentId},
    portfolioId: ${portfolioId},
    userId: ${userId},
    text: "${text}",
    date: "${newComment.date}"
  }`;

  // 파일 경로 (데이터를 저장할 파일)
  let filePath = "src/components/commmon/dummydata/commentInfo.jsx";

  // 파일의 끝에서 '];'를 제거하고 새 데이터를 추가
  await removeFromFileEnd(filePath, 3);
  await appendStringToFile(filePath, `,${string}\n];`);

  console.log("FileIO server API를 통해 댓글 달기 완료");
};

export default saveComment;
