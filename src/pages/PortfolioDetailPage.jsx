import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { oriProjects, oriComments } from "../components/domain/startProgram";
import { getCurrentUser } from "../components/features/currentUser";
import { patchContacts } from "../components/features/recruiterFeatures";
import Comment from "../components/domain/Comment";
import saveComment from "../components/features/saveComment";

import WritingBox from "../components/commmon/PortfolioDetailPage/WritingBox";
import CommentList from "../components/commmon/PortfolioDetailPage/CommentList";

const PortfolioDetailPage = () => {
  const { portfolioId } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [comments, setComments] = useState([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    //project ID 사용해서 포트폴리오 데이터 가져오기
    const portfolio = oriProjects.get(Number(portfolioId));
    if (portfolio) {
      setPortfolioData(portfolio);
    }
    console.log(portfolio);

    // 로컬 스토리지에서 댓글 불러오기
    // const savedComments = localStorage.getItem(`comments-${portfolioId}`);
    // if (savedComments) {
    //   setComments(JSON.parse(savedComments));
    // }

    const filteredComments = Array.from(oriComments.values()).filter(
      (comment) => comment.portfolioId === Number(portfolioId)
    );
    setComments(filteredComments);
  }, [portfolioId]);

  const addComment = (newCommentObj) => {
    // const newComment = {
    //   commentId: Date.now(),
    //   portfolioId: Number(portfolioId),
    //   userId: currentUser.id,
    //   text: newCommentObj.text,
    //   date: new Date().toISOString(),
    // };

    // 클라이언트 측 상태 업데이트
    //oriComments.set(newComment.commentId, newComment);
    setComments((prevComments) => [newCommentObj, ...prevComments]);
    console.log(
      newCommentObj.portfolioId,
      newCommentObj.userId,
      newCommentObj.text
    );

    // 파일에 댓글 저장
    saveComment(
      newCommentObj.portfolioId,
      newCommentObj.userId,
      newCommentObj.text
    );
  };

  // const isPortfolioOwner =
  //   portfolioData && currentUser && portfolioData.owner === currentUser.id;

  //console.log(comments);

  const handleContactClick = () => {
    if (currentUser && currentUser.recruiter) {
      patchContacts(Number(portfolioId), currentUser.id); // 기업 연락 호출
      alert("기업 연락이 저장되었습니다.");
    } else {
      alert("기업 회원만 연락 버튼을 사용할 수 있습니다.");
    }
  };

  if (!portfolioData) {
    return <Loading>로딩 중...</Loading>;
  }

  return (
    <DetailContainer>
      <TitleSection>
        <ProjectTitle>{portfolioData.projectTitle}</ProjectTitle>
        <ProjectDescription>{portfolioData.description}</ProjectDescription>
        <InfoButtons>
          <Button>조회수 {portfolioData.hits || 0}</Button>
          <Button>{portfolioData.contacts.length || 0}</Button>
          <Button>좋아요 0</Button>
        </InfoButtons>
      </TitleSection>

      <ContentSection>
        <LinkDevelperSection>
          <ProjectLinkField>
            <Project>프로젝트 링크</Project>
            <ProjectLink>
              {portfolioData.projectLink
                ? portfolioData.projectLink
                : "프로젝트 링크 없음."}
            </ProjectLink>{" "}
            {/*portfolioInfo에 추가해야함 */}
          </ProjectLinkField>

          <DeveloperField>
            <Developer>개발자</Developer>
            <DevContainer>
              {/* {currentUser.recruiter ? } */}
              <DevInfo>{portfolioData.ownerName}</DevInfo>
              <DevInfo>
                {portfolioData.ownerEmail
                  ? portfolioData.ownerEmail
                  : "이메일 없음."}
              </DevInfo>
            </DevContainer>
          </DeveloperField>
        </LinkDevelperSection>

        <OtherInfoSection>
          {/* <ParticipationPeriodField>
            <Label>참여 기간</Label>
            <TextBox>
              {portfolioData.participationPeriod
                ? portfolioData.participationPeriod
                : "기간 정보 없음."}
            </TextBox>
          </ParticipationPeriodField> */}

          <PeriodField>
            <Label>참여 기간</Label>
            <TextBox>
              {portfolioData.startDate} - {portfolioData.endDate}
            </TextBox>
          </PeriodField>

          <ProblemSolvingField>
            <Label>해결하는 문제</Label>
            <TextBox>
              {portfolioData.solving
                ? portfolioData.solving
                : "문제 해결 내용 없음."}
            </TextBox>
            {/*portfolioInfo에 추가해야함*/}
          </ProblemSolvingField>

          <LearnedField>
            <Label>내가 마주친 도전</Label>
            <TextBox>
              {portfolioData.challenge
                ? portfolioData.challenge
                : "배운 점 없음."}
            </TextBox>
            {/*portfolioInfo에 추가해야함*/}
          </LearnedField>

          <LanguagesUsedField>
            <Label>사용한 프로그램</Label>
            <TextBox>
              {portfolioData.usedLanguage
                ? portfolioData.usedLanguage
                : "사용 언어 없음."}
            </TextBox>
            {/*portfolioInfo에 추가해야함*/}
          </LanguagesUsedField>

          <DemoVideoField>
            <Label>데모 비디오</Label>
            {portfolioData.video ? (
              <VideoBox>
                <video width="100%" height="100%" controls>
                  <source src={portfolioData.video} type="video/mp4" />
                  비디오를 지원하지 않는 브라우저입니다.
                </video>
              </VideoBox>
            ) : (
              <VideoBox>비디오 없음</VideoBox>
            )}
          </DemoVideoField>

          <ImagesField>
            <Label>사진</Label>
            <ImageContainer>
              {portfolioData.images && portfolioData.images.length > 0 ? (
                portfolioData.images.map((image, index) => (
                  <ImageBox key={index}>
                    <img src={image} alt={`프로젝트 이미지 ${index + 1}`} />
                  </ImageBox>
                ))
              ) : (
                <ImageBox>사진 없음</ImageBox>
              )}
            </ImageContainer>
          </ImagesField>
        </OtherInfoSection>
      </ContentSection>

      <CommentsSection>
        <CommentsTitle>댓글</CommentsTitle>
        <WritingBox addComment={addComment} />
        <CommentList
          comments={comments}
          setComments={setComments}
          portfolioId={portfolioId}
        />
      </CommentsSection>
    </DetailContainer>
  );
};

export default PortfolioDetailPage;

// Styled Components
const Loading = styled.div`
  display: flex;
  justify-content: center;

  font-size: 1vw;
  font-weight: bold;
`;

const DetailContainer = styled.div`
  width: 85%;
  margin: 0 auto;
`;

const TitleSection = styled.div`
  margin-bottom: 2.5vw;
`;

const ProjectTitle = styled.h1`
  font-weight: bold;
  font-family: "OTF B";
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
  font-family: "OTF B";
`;

const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2vw;
  margin-bottom: 15vh;

  // grid-template-areas:
  //   "projectLink participationPeriod"
  //   "developer   problemSolving"
  //   "    .       learned"
  //   "    .       languagesUsed"
  //   "    .       demoVideo"
  //   "    .       images";
`;

const LinkDevelperSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const OtherInfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 3vh;
`;

const Label = styled.label`
  font-weight: bolder;
  font-size: 1.6vw;
  margin-bottom: 8px;
`;

const ProjectLinkField = styled.div`
  margin-bottom: 4vh;

  border: 0.1vw solid #d0d1d9;
  border-radius: 0.3125em;
  box-shadow: 0em 0.25em 0.25em rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
`;

const DeveloperField = styled.div`
  border: 0.1vw solid #d0d1d9;
  border-radius: 0.3125em;
  box-shadow: 0em 0.25em 0.25em rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
`;

const PeriodField = styled(Field)`
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

const TextBox = styled.div`
  background-color: white;
  padding: 0.4vw;
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

const Project = styled.div`
  margin: 0.8vw;

  //font-family: "OTF B";
  font-weight: bold;
  font-size: 1.2vw;
`;

const ProjectLink = styled.div`
  background-color: #f0f0f0;
  margin: 0.8vw;
  padding: 0.4vw;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 80%;
`;

const Developer = styled.div`
  margin: 0.8vw;

  //font-family: "OTF B";
  font-weight: bold;
  font-size: 1.2vw;
`;
const DevContainer = styled.div``;

const DevInfo = styled.div`
  background-color: #f0f0f0;
  margin: 0.8vw;
  padding: 0.4vw;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 80%;
`;

const VideoBox = styled.div`
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  border: 1px dashed #ccc;
  font-size: 1vw;
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
  font-size: 1vw;
`;

const CommentsSection = styled.div`
  margin-top: 6vh;
`;

const CommentsTitle = styled.h2`
  font-weight: bold;
  font-family: "OTF B";
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

// const Comment = styled.div`
//   margin-top: 20px;
// `;

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
