import { oriComments } from "../domain/startProgram.js";
import Comment from "../domain/Comment.js";
import { removeFromFileEnd, appendStringToFile } from "../features/fileIO.jsx";

const saveComment = (portfolioId, userId, text) => {
  if (!text || !portfolioId || !userId) {
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

  // 파일에 저장할 문자열 형식
  const string = `
    {
        commentId: ${commentId},
        portfolioId: ${portfolioId},
        userId: ${userId},
        text: \`${text}\`,
        date: \`${newComment.date}\`
    }
    `;

  // 파일 경로 (데이터를 저장할 파일)
  let filePath = "../components/dummydata/commentInfo.jsx";

  // 파일의 끝에서 '];'를 제거하고 새 데이터를 추가
  removeFromFileEnd(filePath, 3);
  appendStringToFile(filePath, `,${string}\n];`);

  console.log('FileIO를 통해 댓글 달기 완료');

};

export default saveComment;
