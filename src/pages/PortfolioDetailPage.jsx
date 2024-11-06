import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WritingBox from "../components/commmon/PortfolioDetailPage/WritingBox";
import StyledButton from "../components/commmon/StyledButton";

const PortfolioDetailPage = () => {
  return (
    <DetailContainer>
      <TitleSection>
        <ProjectTitle>프로젝트 이름</ProjectTitle>
        <ProjectDescription>
          설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명
        </ProjectDescription>
        <InfoButtons>
          <Button>조회수 0</Button>
          <Button>기업 연락 0</Button>
          <Button>좋아요 0</Button>
        </InfoButtons>
      </TitleSection>

      <ContentSection>
        <ProjectLinkField>
          <Label>프로젝트 링크</Label>
          <TextBox />
        </ProjectLinkField>

        <DeveloperField>
          <Label>개발자</Label>
          <DevContainer>
            <DevInput placeholder="이름" />
            <DevInput placeholder="이메일" />
          </DevContainer>
        </DeveloperField>

        <ParticipationPeriodField>
          <Label>참여 기간</Label>
          <TextBox />
        </ParticipationPeriodField>

        <ProblemSolvingField>
          <Label>문제 해결</Label>
          <TextArea />
        </ProblemSolvingField>

        <LearnedField>
          <Label>배운 점</Label>
          <TextArea />
        </LearnedField>

        <LanguagesUsedField>
          <Label>사용한 언어</Label>
          <TextBox />
        </LanguagesUsedField>

        <DemoVideoField>
          <Label>데모 비디오</Label>
          <VideoBox></VideoBox>
        </DemoVideoField>

        <ImagesField>
          <Label>사진</Label>
          <ImageContainer>
            <ImageBox></ImageBox>
            <ImageBox></ImageBox>
            <ImageBox></ImageBox>
          </ImageContainer>
        </ImagesField>
      </ContentSection>

      <CommentsSection>
        <Comment>
          <CommentsTitle>댓글</CommentsTitle>
          <WritingBox />
        </Comment>

        <Comment>
          <CommentHeader>
            <CommentUser>KimYeEun</CommentUser>
            <CommentTime>less than a minute ago</CommentTime>
          </CommentHeader>
          <CommentText>Good~!</CommentText>
          <CommentActions>
            <CommentButton>👍 0</CommentButton>
            <CommentButton>👎 0</CommentButton>
            <CommentButton>Reply</CommentButton>
          </CommentActions>
        </Comment>
      </CommentsSection>
    </DetailContainer>
  );
};

export default PortfolioDetailPage;

// Styled Components
const DetailContainer = styled.div`
  width: 85%;
  margin: 0 auto;
`;

const TitleSection = styled.div`
  margin-bottom: 2.5vw;
`;

const ProjectTitle = styled.h1`
  font-weight: bold;
`;

const ProjectDescription = styled.p``;

const InfoButtons = styled.div`
  display: flex;
  gap: 1vw;
`;

const Button = styled.button`
  background-color: #0a27a6;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1vw;
  margin-bottom: 15vh;

  grid-template-areas:
    "projectLink participationPeriod"
    "developer   problemSolving"
    "    .       learned"
    "    .       languagesUsed"
    "    .       demoVideo"
    "    .       images";
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const ProjectLinkField = styled(Field)`
  grid-area: projectLink;
`;

const DeveloperField = styled(Field)`
  grid-area: developer;
`;

const ParticipationPeriodField = styled(Field)`
  grid-area: participationPeriod;
`;

const ProblemSolvingField = styled(Field)`
  grid-area: problemSolving;
`;

const LearnedField = styled(Field)`
  grid-area: learned;
`;

const LanguagesUsedField = styled(Field)`
  grid-area: languagesUsed;
`;

const DemoVideoField = styled(Field)`
  grid-area: demoVideo;
`;

const ImagesField = styled(Field)`
  grid-area: images;
`;

const TextBox = styled.input`
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 100px;
`;

const DevContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const DevInput = styled.input`
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const VideoBox = styled.div`
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  border: 1px dashed #ccc;
  font-size: 24px;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ImageBox = styled.div`
  background-color: #f0f0f0;
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const CommentsSection = styled.div`
  margin-top: 6vh;
`;

const CommentsTitle = styled.h2`
  font-weight: bold;
  //margin-bottom: 20px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CommentButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #0a27a6;
  color: white;
  cursor: pointer;
  margin-top: 5px;
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

const CommentTime = styled.span`
  color: gray;
`;

const CommentText = styled.p`
  margin: 10px 0;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 10px;
`;
