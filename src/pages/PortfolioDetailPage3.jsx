import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { oriProjects, oriComments } from "../components/domain/startProgram";
import { getCurrentUser } from "../components/features/currentUser";
import Comment from "../components/domain/Comment";
import saveComment from "../components/features/saveComment";

import WritingBox from "../components/commmon/PortfolioDetailPage/WritingBox";
import CommentList from "../components/commmon/PortfolioDetailPage/CommentList";

//arrow 이미지
import greaterThanSign from "../assets/images/PortfolioDetailPage3/greaterThanSign.svg";
import lessThanSign from "../assets/images/PortfolioDetailPage3/lessThanSign.svg";

//sample 이미지
import sample from "../assets/images/PortfolioDetailPage3/sample.png";
//sample 비디오
import sampleVideo from "../assets/images/PortfolioDetailPage3/sampleVideo.mp4";

const PortfolioDetailPage3 = () => {
  const { portfolioId } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [comments, setComments] = useState([]);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const mediaRef = useRef(null); //비디오, 사진 부분 스크롤
  const currentUser = getCurrentUser();

  useEffect(() => {
    const portfolio = oriProjects.get(Number(portfolioId));
    if (portfolio) {
      setPortfolioData(portfolio);
    }
    console.log(portfolio);

    const filteredComments = Array.from(oriComments.values()).filter(
      (comment) => comment.portfolioId === Number(portfolioId)
    );
    setComments(filteredComments);
  }, [portfolioId]);

  const scrollLeft = () => {
    if (mediaRef.current) {
      mediaRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (mediaRef.current) {
      const maxScrollLeft =
        mediaRef.current.scrollWidth - mediaRef.current.clientWidth;
      const currentScrollLeft = mediaRef.current.scrollLeft;

      console.log("현재 scrollLeft (이동 전):", currentScrollLeft);

      // 이동할 거리 설정
      const scrollAmount = 300;

      // 현재 위치에서 scrollAmount만큼 이동하지만, 남은 거리가 적으면 끝까지 이동
      const newScrollLeft = Math.min(
        currentScrollLeft + scrollAmount,
        maxScrollLeft
      );

      // 스크롤 이동
      mediaRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });

      setTimeout(() => {
        console.log("현재 scrollLeft (이동 후):", mediaRef.current.scrollLeft);
      }, 500);
    }
  };

  const addComment = (newCommentObj) => {
    setComments((prevComments) => [newCommentObj, ...prevComments]);
    saveComment(
      newCommentObj.portfolioId,
      newCommentObj.userId,
      newCommentObj.text
    );
  };

  if (!portfolioData) {
    return <Loading>로딩 중...</Loading>;
  }

  return (
    <PageContainer>
      <TitleSection>
        <ProjectTitle>{portfolioData.projectTitle}</ProjectTitle>
        <ProjectDescription>{portfolioData.description}</ProjectDescription>
      </TitleSection>

      <InfoButtons>
        <Button>조회수 {portfolioData.hits || 0}</Button>
        <Button>기업 연락 {portfolioData.contacts.length || 0}</Button>
        <Button>좋아요 0</Button>
      </InfoButtons>

      <DetailContainer>
        <InfoSection>
          <InfoWrapper>
            <InfoField>프로젝트 링크</InfoField>
            <Info>{portfolioData.projectLink || "링크 없음"}</Info>
          </InfoWrapper>
          <InfoWrapper>
            <InfoField>참여 기간</InfoField>
            <Info>
              {portfolioData.startDate} - {portfolioData.endDate}
            </Info>
          </InfoWrapper>
          <InfoWrapper>
            <InfoField>사용한 스택</InfoField>
            <Info>{portfolioData.usedLanguage || ""}</Info>
          </InfoWrapper>
        </InfoSection>

        <MediaContainer>
          <ArrowButton onClick={scrollLeft}>
            <Arrow src={lessThanSign} alt="Scroll Left" />
          </ArrowButton>
          <MediaSection ref={mediaRef}>
            {/* {(portfolioData.video || (portfolioData.images && portfolioData.images.length > 0)) && (
      <MediaSection ref={mediaRef}>
        {portfolioData.video && (
        <VideoContainer>
          <DemoVideo>
            <video width="100%" height="100%" controls>
              <source src={portfolioData.video} type="video/mp4" />
              비디오를 지원하지 않는 브라우저입니다.
            </video>
          </DemoVideo>
          </VideoContainer>
        )}
        {portfolioData.images && portfolioData.images.length > 0 && (
          <ImageContainer>
            {portfolioData.images.map((image, index) => (
              <ImageBox onClick={() => setEnlargedImage(sample)}>
                <img src={image} alt={`프로젝트 이미지 ${index + 1}`} />
              </ImageBox>
            ))}
          </ImageContainer>
        )}
      </MediaSection>
    )} */}
            <VideoContainer>
              <DemoVideo>
                <video width="100%" height="100%" controls>
                  <source src={sampleVideo} type="video/mp4" />
                </video>
              </DemoVideo>
            </VideoContainer>
            <ImageContainer>
              {/* {portfolioData.images && portfolioData.images.length > 0
            ? portfolioData.images.map((image, index) => (
                <ImageBox key={index} onClick={() => setEnlargedImage(image)}>
                  <img src={image} alt={`프로젝트 이미지 ${index + 1}`} />
                </ImageBox>
              ))
            : "사진 없음"} */}
              <ImageBox onClick={() => setEnlargedImage(sample)}>
                <img src={sample} alt="sample 이미지" />
              </ImageBox>
              <ImageBox onClick={() => setEnlargedImage(sample)}>
                <img src={sample} alt="sample 이미지" />
              </ImageBox>
              <ImageBox onClick={() => setEnlargedImage(sample)}>
                <img src={sample} alt="sample 이미지" />
              </ImageBox>
              <ImageBox onClick={() => setEnlargedImage(sample)}>
                <img src={sample} alt="sample 이미지" />
              </ImageBox>
            </ImageContainer>
          </MediaSection>
          <ArrowButton onClick={scrollRight}>
            <Arrow src={greaterThanSign} alt="Scroll Right" />
          </ArrowButton>
        </MediaContainer>

        {enlargedImage && (
          <Overlay onClick={() => setEnlargedImage(null)}>
            <EnlargedImage src={enlargedImage} alt="Enlarged project image" />
          </Overlay>
        )}

        <DescriptionSection>
          <Section>
            <Field>해결하는 문제</Field>
            <Text>{portfolioData.solving || "해결한 문제 없음"}</Text>
          </Section>
          <Section>
            <Field>내가 마주친 도전</Field>
            <Text>{portfolioData.challenge || "도전 내용 없음"}</Text>
          </Section>
        </DescriptionSection>
      </DetailContainer>

      <CommentsSection>
        <CommentsTitle>댓글</CommentsTitle>
        <WritingBox addComment={addComment} />
        <CommentList
          comments={comments}
          setComments={setComments}
          portfolioId={portfolioId}
        />
      </CommentsSection>
    </PageContainer>
  );
};

export default PortfolioDetailPage3;

// Styled Components
const PageContainer = styled.div`
  width: 85%;
  margin: 0 auto;
`;

const DetailContainer = styled.div`
  // padding: 20px;
  // max-width: 800px;
  padding: 2vh;
  margin-bottom: 4vh;

  background-color: rgb(245, 247, 247);
`;

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ProjectTitle = styled.h1`
  font-size: 5vw;
  //font-weight: bold;
  font-family: Impact;
`;

const ProjectDescription = styled.h3`
  font-size: 1.4vw;
  color: #666;
  margin-bottom: 5vh;
`;

const InfoButtons = styled.div`
  display: flex;
  gap: 1vw;
  margin-bottom: 3vh;
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

const InfoSection = styled.div`
  // display: flex;
  // justify-content: space-around;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 5vh;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: Impact;
`;
const InfoField = styled.div`
  font-size: 2vw;
  font-weight: bold;
`;

const Info = styled.div`
  border-radius: 0.3125em;

  background-color: white;

  padding: 1vw;
  margin: 1vw;
  min-width: 80%;
`;

const MediaContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MediaSection = styled.div`
  display: flex;
  // overflow-x: hidden;

  overflow-x: scroll;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-padding-left: var(--carousel-start-offset);
  scroll-padding-right: var(--carousel-end-offset);
  scrollbar-width: none;

  gap: 1vw;
  padding: 1vw;
  //background-color: rgba(207, 221, 251, 0.33);
  border-radius: 0.3125em;
  margin-bottom: 5vh;
  scroll-behavior: smooth;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  background: white;
  border: none;
  cursor: pointer;
  padding: 1vw;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  z-index: 10;

  &:hover {
    transform: translateY(-50%) scale(1.1);
  }

  &:first-child {
    left: -25px;
  }

  &:last-child {
    right: -25px;
  }
`;

const Arrow = styled.img`
  width: 1.5vw;
  height: 1.5vw;
`;

const VideoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1vw;
  padding: 1vw;
  flex-shrink: 0;
  overflow-x: auto;
  border-radius: 0.3125em;

  background-color: #0a27a6;
  color: white;
`;

const DemoVideo = styled.div`
  // max-width: 25vw;
  // max-height: 14vh;
  width: 25vw;
  height: 20vh;

  background-color: #0a27a6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.3125em;
  overflow: hidden;
  flex-shrink: 0;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1vw;
  padding: 1vw;
  flex-shrink: 0;
  overflow-x: auto;
  border-radius: 0.3125em;

  background-color: #0a27a6;
  color: white;
`;

const ImageBox = styled.div`
  border-radius: 0.3125em;
  // max-width: 25vw;
  // max-height: 20vh;
  width: 25vw;
  height: 20vh;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const EnlargedImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
`;

const DescriptionSection = styled.div`
  margin-bottom: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2vw 1vw;

  font-family: Impact;
`;

const Field = styled.div`
  font-size: 2vw;
  font-weight: bold;
`;

const Text = styled.div`
  border-radius: 0.3125em;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.1);

  background-color: white;

  padding: 1vw;
  margin-top: 2vw;

  min-width: 80%;
`;

const CommentsSection = styled.div`
  margin-top: 20px;
`;

const CommentsTitle = styled.h2`
  font-size: 18px;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  padding: 50px;
`;
