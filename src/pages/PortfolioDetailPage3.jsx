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
import language from "../assets/images/PortfolioDetailPage3/language.svg";
import category from "../assets/images/PortfolioDetailPage3/category.svg";

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

        <SectionContent>
          <SectionTitle>
            <SectionTitleText>ABOUT ME</SectionTitleText>
          </SectionTitle>
          <AboutMeBasicInfos>
            <AboutMeBasicInfoWrapper>
              <AboutMeBasicInfoItem>
                <ImageWrapper>
                  <Image2 src={name} alt="name" />
                </ImageWrapper>
                <DevInfoWrapper>
                  <DevLabel>이름</DevLabel>
                  <DevLabel>{portfolioData.ownerName}</DevLabel>
                </DevInfoWrapper>
              </AboutMeBasicInfoItem>
            </AboutMeBasicInfoWrapper>

            <AboutMeBasicInfoWrapper>
              <AboutMeBasicInfoItem>
                <ImageWrapper>
                  <Image2 src={email} alt="email" />
                </ImageWrapper>
                <DevInfoWrapper>
                  <DevLabel>이메일</DevLabel>
                  <DevLabel>{portfolioData.ownerEmail}</DevLabel>
                </DevInfoWrapper>
              </AboutMeBasicInfoItem>
            </AboutMeBasicInfoWrapper>
          </AboutMeBasicInfos>
        </SectionContent>

        <SectionContent>
          <SectionTitle>
            <SectionTitleText>SKILLS</SectionTitleText>
          </SectionTitle>
          <SkillInfos>
            <SkillInfoWrapper>
              <SkillsName>
                <Image3 src={language} alt="language" />
                언어
              </SkillsName>
              <SkillsList>
                <SkillsItem>{portfolioData.usedLanguage}</SkillsItem>
              </SkillsList>
            </SkillInfoWrapper>

            <SkillInfoWrapper>
              <SkillsName>
                <Image3 src={category} alt="category" />
                카테고리
              </SkillsName>
              <SkillsList>
                <SkillsItem>
                  {portfolioData.category
                    ? portfolioData.category
                    : "카테고리 없음"}
                </SkillsItem>
              </SkillsList>
            </SkillInfoWrapper>
          </SkillInfos>
        </SectionContent>

        <SectionContent>
          <SectionTitle>
            <SectionTitleText>PROJECT</SectionTitleText>
          </SectionTitle>
        </SectionContent>
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

  font-family: __Noto_Sans_KR_99422f, __Noto_Sans_KR_Fallback_99422f;
  font-style: normal;

  //   border: 5px solid #000;
  //   border-radius: 2em;
  //   height: 75em;

  display: flex;
  flex-direction: column;
  // align-items: center;
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

const SectionTitle = styled.div`
  position: relative;
  display: table;
  margin: 0 auto 3rem;
`;

const SectionTitleText = styled.h3`
  font-family: __Black_Han_Sans_27e777, __Black_Han_Sans_Fallback_27e777;
  //   font-weight: 400;
  font-style: normal;
  border-bottom-color: #cccccc;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  font-size: 3rem;
`;
const ImageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 1.5rem;
  height: 2rem;
  margin-top: 0.2rem;
`;

const SectionContent = styled.div`
  width: 100%;
  max-width: 71.25rem;
  padding: 4rem 1.5rem;
  margin: 0 auto;
`;

const AboutMeBasicInfos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SkillInfos = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  padding: 2rem;
  background-color: hsla(0, 0%, 100%, 0.8);
  box-shadow: 1rem 1rem 1rem 0 rgba(68, 68, 68, 0.2);
  border-radius: 1rem;
`;
const AboutMeBasicInfoWrapper = styled.div`
  width: 50%;
`;

const SkillInfoWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  column-gap: 2rem;
`;

const AboutMeBasicInfoItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
  column-gap: 2rem;
  width: 100%;
  max-width: 14rem;
  margin: 0 auto;
  opacity: 0.8;
`;

const DevInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DevLabel = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const SkillsName = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  flex-shrink: 0;
  width: 10rem;
  font-weight: 900;
`;

const SkillsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.5rem;

  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SkillsItem = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;

  background-color: #2f74c0;
  color: #ffffff;
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

//css image
const Image1 = styled.img``;

const Image2 = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  color: transparent;
`;

const Image3 = styled.img`
  height: 20%;
  width: 20%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  color: transparent;
`;

//css text
const ProjectTitle = styled.h1`
  font-family: __Black_Han_Sans_27e777, __Black_Han_Sans_Fallback_27e777;
  font-weight: 400;
  font-style: normal;
  font-size: 4rem;
  line-height: 1.25;
  word-break: keep-all;
`;

const ProjectDescription = styled.p`
  font-family: __Black_Han_Sans_27e777, __Black_Han_Sans_Fallback_27e777;
  font-weight: 400;
  font-style: normal;
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
