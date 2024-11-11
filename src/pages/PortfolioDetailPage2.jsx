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
import Notepad3 from "../assets/images/PortfolioDetailPage2/Notepad3.png";
import Notepad5 from "../assets/images/PortfolioDetailPage2/Notepad5.png";
import Notepad12 from "../assets/images/PortfolioDetailPage2/Notepad12.png";

const PortfolioDetailPage2 = () => {
  const { portfolioId } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [comments, setComments] = useState([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    // portfolioId가 10일 때만 데이터를 가져오기
    console.log("portfolioId:", portfolioId);  
    if (Number(portfolioId) === 8) {
      const portfolio = oriProjects.get(8);
      setPortfolioData(portfolio);
      console.log(portfolio);
    
      // 댓글 필터링
      const filteredComments = Array.from(oriComments.values()).filter(
        (comment) => comment.portfolioId === 10
      );
      setComments(filteredComments);
    }
  }, [portfolioId]);
  

  const addComment = (newCommentObj) => {
    const newComment = {
      commentId: Date.now(),
      portfolioId: Number(portfolioId),
      userId: currentUser.id,
      text: newCommentObj.text,
      date: new Date().toISOString(),
    };

    // 클라이언트 측 상태 업데이트
    //oriComments.set(newComment.commentId, newComment);
    setComments((prevComments) => [newComment, ...prevComments]);

    // 파일에 댓글 저장
    saveComment(newComment.portfolioId, newComment.userId, newComment.text);
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

    <Wrapper1>
        <Label1Wrapper>
          {/* 참여기간 */}
          <PeriodText>참여기간</PeriodText>
          <Image3 src={Notepad3} alt="Notepad3"/>
          <Bar>참여기간</Bar>
        </Label1Wrapper>  
        {/* 사용한 언어 */}
        <Label1Wrapper>
          <PeriodText>사용한 언어</PeriodText>
          <Image3 src={Notepad3} alt="Notepad3"/>
          <Bar>사용한 언어</Bar>
        </Label1Wrapper>  
          {/* 프로젝트 링크 */}
        <Label1Wrapper>
          <PeriodText>프로젝트 링크</PeriodText>
          <Image3 src={Notepad3} alt="Notepad3"/>
          <Bar>프로젝트 링크</Bar>
        </Label1Wrapper>  
    </Wrapper1>

    <Wrapper2>
      {/* 배운점 */}
      <LearnedWrapper>
        <LearnedText>배운점</LearnedText>
        <Image5 src={Notepad5} alt="Notepad5"/>
     </LearnedWrapper>
      {/* 문제설명 */}
      <ProblemWrapper>
          <ProblemText>배운점</ProblemText>
          <Image5 src={Notepad5} alt="Notepad5"/>
      </ProblemWrapper>
    </Wrapper2>
    <Label1Wrapper>
          {/* 사진 */}
          <PhotoWrappeer>
            <PhotoText>사진</PhotoText>
            <Image3 src={Notepad12} alt="Notepad12" />
            <ImageContainer>
              {portfolioData.images && portfolioData.images.length > 0 ? (
                portfolioData.images.slice(0, 4).map((image, index) => ( 
                  <ImageBox key={index}>
                    <img src={image} alt={`프로젝트 이미지 ${index + 1}`} />
                  </ImageBox>
                ))
              ) : (
                <ImageBox>사진 없음</ImageBox>
              )}
            </ImageContainer>
          </PhotoWrappeer>
          {/* 로고 */}
          <LogoWrappeer>
            <LogoText>로고</LogoText>
            <Image3 src={Notepad12} alt="Notepad12" />
            <LogoContainer>
              {portfolioData.images && portfolioData.images.length > 0 ? (
                portfolioData.images.map((image, index) => (
                  <ImageBox key={index}>
                    <img src={image} alt={`프로젝트 이미지 ${index + 1}`} />
                  </ImageBox>
                ))
              ) : (
                <ImageBox>로고 없음</ImageBox>
              )}
            </LogoContainer>
          </LogoWrappeer>
     </Label1Wrapper>  
      {/* 데모 비디오 */}
      <VideoWrappeer>
            <VideoText>데모 비디오</VideoText>
            <Image3 src={Notepad12} alt="Notepad12" />
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
      </VideoWrappeer>
    </MainWrapper>


    {/* 댓글 */}
    <CommentsSection>
        <CommentsTitle>댓글</CommentsTitle>
        <WritingBox addComment={addComment} />
        <CommentList
          comments={comments}
          setComments={setComments}
          portfolioId={portfolioId}
        />
    </CommentsSection>
  </>
  );
};

export default PortfolioDetailPage2;

//css Wrapper
const MainWrapper = styled.div`
  width: 80%;
  padding: 40px 40px;
  margin: 0 auto;

  border : 5px solid #000;
  border-radius : 2em;
  height : 80em;
  
  display: flex;
  flex-direction: column;
  align-items: center;
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
  display : flex;
  flex-direction: row;
  gap : 1em;
  position: relative;
`;
const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
`;
const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom : 1em;
  gap : 2em;
`;
const LearnedWrapper = styled.div`
  width : 50%;
  height : 20em;
  border : 3px solid #000;
  border-radius : 2em;
  position: relative;
`;
const ProblemWrapper = styled.div`
  width : 50%;
  height : 20em;
  border : 3px solid #000;
  border-radius : 2em;
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
  grid-template-columns: repeat(4, 1fr);  
  gap: 1em;  
  width: 100%;
`;
const PhotoWrappeer = styled.div`
  display : flex;
  flex-direction: column;
`;
const LogoWrappeer = styled.div`
  display : flex;
  flex-direction: column;
`;
const VideoWrappeer = styled.div`
  display : flex;
  flex-direction: column;
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
  margin-top : 2em;
  font-family: "OTF R";

  &::after {
    content: "";
    display: block;
    width : 10em;    
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
  border-radius : 1em;
`;
const VideoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  border: 2px solid #000;
  border-radius:1em;
  font-size: 1vw;
  width : 40em;
  height : 20em;
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
  margin-left: 10em;  
`;

//css text
const ProjectTitle = styled.h1`
  font-weight: bold;
  font-family: "OTF B";
`;

const ProjectDescription = styled.p`
  font-weight: bold;
  font-family: "OTF B";
  margin-top : -0.5em;
`;

const PeriodText = styled.p`
  position: absolute; 
  top: 0px; 
  font-size: 1em;
  font-weight: bold;
  color: #fff;
  margin-left : 3.6em;
  margin-top : 1.6em;
  font-family: "OTF R";
`;

const LearnedText = styled.p`
  position: absolute; 
  top: 0px; 
  font-size: 1em;
  font-weight: bold;
  color: #000;
  margin-top : 0em;
  margin-left : 14em;
  font-family: "OTF R";
`;

const ProblemText = styled.p`
  position: absolute; 
  top: 0px; 
  font-size: 1em;
  font-weight: bold;
  color: #000;
  margin-top : 0em;
  margin-left : 14em;
  font-family: "OTF R";
`;

const PhotoText = styled.p`
  position: absolute; 
  top: 0px; 
  font-size: 1.5em;
  font-weight: bold;
  color: #000;
  margin-left : 2.5em;
  margin-top : 0.7em;
  font-family: "OTF R";
`;
const LogoText = styled.p`
  position: absolute; 
  top: 0px; 
  font-size: 1.5em;
  font-weight: bold;
  color: #000;
  margin-left : 2.5em;
  margin-top : 0.7em;
  font-family: "OTF R";
`;
const VideoText = styled.p`
  position: absolute; 
  top: 0px; 
  font-size: 1.2em;
  font-weight: bold;
  color: #000;
  margin-left : 1.2em;
  margin-top : 70.8em;
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

