import React from "react";
import styled from "styled-components";
import { getCurrentUser } from "../../features/currentUser";

const CommentList = ({ comments, setComments, portfolioId }) => {
  const handleDelete = (index) => {
    const currentUser = getCurrentUser();
    if (currentUser && comments[index].user === currentUser.nickname) {
      setComments((prevComments) => {
        const updatedComments = prevComments.filter((_, i) => i !== index);
        // 로컬 스토리지에 댓글 업데이트
        localStorage.setItem(
          `comments-${portfolioId}`,
          JSON.stringify(updatedComments)
        );
        return updatedComments;
      });
    } else {
      alert("본인이 작성한 댓글만 삭제할 수 있습니다.");
    }
  };

  return (
    <CommentListWrapper>
      {comments.map((comment, index) => (
        <Comment key={index}>
          <CommentHeader>
            <CommentUser>{comment.user}</CommentUser>
            {comment.user === getCurrentUser().nickname && (
              <DeleteButton onClick={() => handleDelete(index)}>
                삭제
              </DeleteButton>
            )}
          </CommentHeader>
          <CommentText>{comment.text}</CommentText>
        </Comment>
      ))}
    </CommentListWrapper>
  );
};

export default CommentList;

const CommentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  width: 100%;
  margin-bottom: 1em;
`;

const Comment = styled.div`
  margin-top: 20px;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
`;

const CommentUser = styled.span`
  font-weight: bold;
  font-family: "OTF B";
`;

const CommentText = styled.p`
  margin: 10px 0;
`;

const DeleteButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #0a27a6;
  color: white;
  cursor: pointer;
  margin-top: 5px;
  font-family: "OTF B";
`;
