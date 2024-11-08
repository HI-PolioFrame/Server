import React from "react";
import styled from "styled-components";

const CommentList = ({ comments }) => {
  return (
    <CommentListWrapper>
      {comments.map((comment, index) => (
        <Comment key={index}>
          <CommentHeader>
            <CommentUser>{comment.user}</CommentUser>
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
`;

const CommentText = styled.p`
  margin: 10px 0;
`;
