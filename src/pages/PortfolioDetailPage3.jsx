import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { oriProjects, oriComments } from "../components/domain/startProgram";
import { getCurrentUser } from "../components/features/currentUser";
import Comment from "../components/domain/Comment";
import saveComment from "../components/features/saveComment";

import WritingBox from "../components/commmon/PortfolioDetailPage/WritingBox";
import CommentList from "../components/commmon/PortfolioDetailPage/CommentList";

//image
import AboutMe from "../assets/images/PortfolioDetailPage3/AboutMe.png";
import name from "../assets/images/PortfolioDetailPage3/name.png";
import email from "../assets/images/PortfolioDetailPage3/email.png";

const PortfolioDetailPage3 = () => {
  const { portfolioId } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [comments, setComments] = useState([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    // portfolioId가 7일 때만 데이터를 가져오기
    console.log("portfolioId:", portfolioId);
    if (Number(portfolioId) === 7) {
      const portfolio = oriProjects.get(7);
      setPortfolioData(portfolio);
      console.log(portfolio);

      // 댓글 필터링
      const filteredComments = Array.from(oriComments.values()).filter(
        (comment) => comment.portfolioId === 7
      );
      setComments(filteredComments);
    }
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

  if (!portfolioData) {
    return <Loading>로딩 중...</Loading>;
  }
  return (
    <>
      <MainWrapper>
        <TitleWrapper>
          <InfoButtons>
            <Button>조회수 0</Button>
            <Button>기업 연락 0</Button>
            <Button>좋아요 0</Button>
          </InfoButtons>
          <ProjectTitle>{portfolioData.projectTitle}</ProjectTitle>
          <ProjectDescription>{portfolioData.description}</ProjectDescription>
        </TitleWrapper>

        {/* <DeveloperWrapper>
          <InfoWrapper>
            <Image16 src={Notepad16} alt="Notepad16" />
            <Bar>{portfolioData.ownerName} </Bar>
            <Bar>
              {portfolioData.ownerEmail
                ? portfolioData.ownerEmail
                : "이메일 없음."}{" "}
            </Bar>
          </InfoWrapper>
        </DeveloperWrapper> */}
      </MainWrapper>
    </>
  );
};

export default PortfolioDetailPage3;

//css Wrapper
const MainWrapper = styled.div`
  width: 80%;
  padding: 40px 40px;
  margin: 0 auto;

  border: 5px solid #000;
  border-radius: 2em;
  height: 75em;

  display: flex;
  flex-direction: column;
  // align-items: center;
`;
const Maincomponent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;

  font-size: 1vw;
  font-weight: bold;
`;
const TitleWrapper = styled.div`
  margin-bottom: 2.5vw;
`;
const Label1Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;
const Label2Wrapper = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Wrapper1 = styled.div`
  width: 60%;
  margin-right: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;
const Wrapper2 = styled.div`
  width: 80%;
  margin-top: 2em;
  gap: 5em;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;
const LearnedWrapper = styled.div`
  width: 100%;
  height: 20em;
  border: 3px solid #000;
  border-radius: 2em;
  position: relative;
`;
const ProblemWrapper = styled.div`
  width: 100%;
  height: 20em;
  border: 3px solid #000;
  border-radius: 2em;
  position: relative;
`;
const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1em;
  width: 100%;
`;
const LogoContainer = styled.div`
  display: grid;
  gap: 1em;
  width: 100%;
`;
const PhotoWrappeer = styled.div`
  display: flex;
  flex-direction: column;
`;
const LogoWrappeer = styled.div`
  display: flex;
  flex-direction: column;
`;
const VideoWrappeer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: -2em;
  margin-top: 6em;
`;
//css button
const InfoButtons = styled.div`
  display: flex;
  gap: 1vw;
`;
const Button = styled.button`
  background-color: #000;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: "OTF R";
`;

// css component
const Bar = styled.p`
  position: relative;
  font-size: 1em;
  margin: 0;
  margin-top: 2em;
  font-family: "OTF R";

  &::after {
    content: "";
    display: block;
    width: 10em;
    height: 0.08em;
    background-color: #000;
    position: absolute;
    left: 0;
  }
`;
const ImageBox = styled.div`
  width: 5em;
  height: 5em;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1vw;
  border-radius: 1em;
`;
const VideoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 3px solid #000;
  border-radius: 1em;
  font-size: 1vw;
  width: 40em;
  height: 16.5em;
`;

//css image
const Image3 = styled.img`
  width: 10em;
  height: auto;
  margin-right: 1em;
`;
const Image5 = styled.img`
  width: 10em;
  height: auto;
  margin-top: -2.3em;
  margin-left: 8em;
`;
const Image16 = styled.img`
  width: 4em;
  height: auto;
  margin-top: -2.3em;
`;

//css text
const ProjectTitle = styled.h1`
  font-weight: bold;
  font-family: "OTF B";
`;

const ProjectDescription = styled.p`
  font-weight: bold;
  font-family: "OTF B";
  margin-top: -0.5em;
`;

const PeriodText = styled.p`
  position: absolute;
  top: 0px;
  font-size: 1em;
  font-weight: bold;
  color: #fff;
  margin-left: 3.6em;
  margin-top: 1.6em;
  font-family: "OTF R";
`;

const LearnedText = styled.p`
  position: absolute;
  top: 0px;
  font-size: 1em;
  font-weight: bold;
  color: #000;
  margin-top: -0.2em;
  margin-left: 11.9em;
  font-family: "OTF R";
`;

const ProblemText = styled.p`
  position: absolute;
  top: 0px;
  font-size: 1em;
  font-weight: bold;
  color: #000;
  margin-top: -0.2em;
  margin-left: 11.5em;
  font-family: "OTF R";
`;

const PhotoText = styled.p`
  position: absolute;
  top: 0px;
  font-size: 1.5em;
  font-weight: bold;
  color: #000;
  margin-left: 2.5em;
  margin-top: 0.7em;
  font-family: "OTF R";
`;
const LogoText = styled.p`
  position: absolute;
  top: 0px;
  font-size: 1.5em;
  font-weight: bold;
  color: #000;
  margin-left: 2.5em;
  margin-top: 6em;
  font-family: "OTF R";
`;
const VideoText = styled.p`
  position: absolute;
  top: 0px;
  font-size: 1.2em;
  font-weight: bold;
  color: #000;
  margin-left: 1.5em;
  margin-top: 45.3em;
  font-family: "OTF R";
`;
// 댓글 css
const CommentsSection = styled.div`
  width: 85%;
  padding: 40px 40px;
  margin: 0 auto;

  margin-top: 6vh;
`;
const CommentsTitle = styled.h2`
  font-weight: bold;
  font-family: "OTF B";
  //margin-bottom: 20px;
`;
