import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  oriHackathons,
  oriComments,
  initializeData,
} from "../components/domain/startProgram";
import { getCurrentUser } from "../components/features/currentUser";
import { patchContacts } from "../components/features/recruiterFeatures";
import Comment from "../components/domain/Comment";
import saveComment from "../components/features/saveComment";

import WritingBox from "../components/commmon/PortfolioDetailPage/WritingBox";
import CommentList from "../components/commmon/PortfolioDetailPage/CommentList";

//logo 이미지
import logo from "../assets/icons/Logo.png";
//heart 이미지
import heart_none from "../assets/images/PortfolioDetailPage3/heart-none.svg";
import heart_fill from "../assets/images/PortfolioDetailPage3/heart-fill.svg";

import Calendar from "../assets/icons/Calendar.png";

const HackathonDetailPage = () => {
  const { hackId } = useParams(); // URL에서 hackId를 추출
  const [HackathonData, setHackathonData] = useState(null);
  const [comments, setComments] = useState([]);
  const [coverimagePreview, setCoverImagePreview] = useState(null);
  const [LogoPreview, setLogoPreview] = useState(null);
  const [photosPreview, setPhotosPreview] = useState([null, null, null, null, null]);
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    // hackId를 사용하여 해당 해커톤 데이터를 가져오기
    const Hackathon = oriHackathons.get(Number(hackId)); // hackId가 숫자로 저장되어 있다면 Number로 변환
    if (Hackathon) {
      setHackathonData(Hackathon);
    }
  }, [hackId]);

  console.log(hackId);
  if (!HackathonData) {
    return <Loading>로딩 중...</Loading>;
  }
  
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setCoverImagePreview(imageURL);
    }
  };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setLogoPreview(imageURL);
    }
  };
  const handlePhotosChange = (index) => (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const newPhotosPreview = [...photosPreview];
      newPhotosPreview[index] = URL.createObjectURL(file);
      setPhotosPreview(newPhotosPreview);
    }
  };

//   const { hackId } = useParams();
//   const [HackathonData, setHackathonData] = useState(null);
//   const [showContactInfo, setShowContactInfo] = useState(false);
//   const [showModal, setShowModal] = useState(false); // "연락" 버튼 눌렀을 때 true
//   const [modalMessage, setModalMessage] = useState(""); //"연락" 버튼 눌렀을 때 창에 띄워지는 메세지
//   const [isOwner, setIsOwner] = useState(false);
// console.log(hackId);
//   const currentUser = getCurrentUser();
//   const navigate = useNavigate();

//   useEffect(() => {
//     initializeData();
//     //hackId ID 사용해서 포트폴리오 데이터 가져오기
//     const Hackathon = oriHackathons.get(Number(hackId));
//     if (Hackathon) {
//       setPortfolioData(Hackathon);
//     }
//     console.log(Hackathon);

//     const filteredComments = Array.from(oriComments.values()).filter(
//       (comment) => comment.hackId === Number(hackId)
//     );
//     setComments(filteredComments);
//   }, [hackId, HackathonData?.contacts.length, HackathonData?.hits]);

  const addComment = (newCommentObj) => {
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


  if (!HackathonData) {
    return <Loading>로딩 중...</Loading>;
  }


  
  return (
    <>
    <MainWrapper>
      <ContentSection1>
      <Logo>
            <img src={logo} alt="projectLogo" />
      </Logo>
        <HackTitle>{HackathonData.hackName}</HackTitle>
      <RowWrapper>
        <TimeWrapper>
          <RowWrapper>
            <CalendarImage src={Calendar} alt="달력"></CalendarImage>
            <TimeTitle>모집기간 {HackathonData.startDate} - {HackathonData.endDate} </TimeTitle>
          </RowWrapper>
          <RowWrapper>
            <CalendarImage src={Calendar} alt="달력"></CalendarImage>
            <TimeTitle>활동기간 {HackathonData.startDate} - {HackathonData.endDate} </TimeTitle>
          </RowWrapper>
        </TimeWrapper>
      </RowWrapper>  
      </ContentSection1>
      
    <ContentSection1>

      <ColumnWrapper>
        <RowWrapper>
            <HackTitle>모집인원</HackTitle>
            <JoinTitle>{HackathonData.memNumber}명 </JoinTitle>
        </RowWrapper>

        <RowWrapper>
          <HackTitle>모집파트</HackTitle>
          <JoinTitle>{HackathonData.memNumber}</JoinTitle>
        </RowWrapper> 
      </ColumnWrapper>

      <HackTitle>자료링크</HackTitle>
      <LinkTitle>{HackathonData.link || "없습니다."}</LinkTitle>
        
      <HackTitle>해커톤 설명</HackTitle>
      <DesTitle>{HackathonData.description}</DesTitle>
              
    </ContentSection1>    
    


    </MainWrapper>

    </>



    //   {/* <CommentsSection>
    //     <CommentsTitle>댓글</CommentsTitle>
    //     <WritingBox addComment={addComment} />
    //     <CommentList
    //       comments={comments}
    //       setComments={setComments}
    //       portfolioId={portfolioId}
    //     />
    //   </CommentsSection> */}
    // </DetailContainer>
  );
};

export default HackathonDetailPage;

// css Wrapper
const MainWrapper = styled.div`
  width: 85%; //수정중...
  margin: 0 auto;
  display: flex;
  align-items: center; 
  justify-content: center; 

  display: flex;
  flex-direction: column;
  gap : 2em;
`;

const TimeWrapper = styled.div`
`;
const JoinWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap : 10em;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap : 1em;
`;
const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentSection1 = styled.div`
  width: 80%;
  height : 50vh;
  color: #ccc;
  border-radius: 2em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 

`;
const ContentSection2 = styled.div`
  width: 80%;
  height : 100vh;
  color: #ccc;
  border-radius: 2em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 

`;
const ContentSection3 = styled.div`
  width: 80%;
  height : 30vh;
  color: #ccc;
  border-radius: 2em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 

`;

const ContentSection4 = styled.div`
  width: 80%;
  height : 50vh;
  color: #ccc;
  border-radius: 2em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 

`;
const Loading = styled.div`
  display: flex;
  justify-content: center;

  font-size: 1vw;
  font-weight: bold;
`;

//css Input
const LinkInput = styled.input`
  border : 1.4px solid #0a27a6;
  border-radius : 0.5em;
  width : 60%;
  height : 2em;
  margin-top : -2em;
`;

//css image
const CalendarImage = styled.img`
  width : 1.5em;
  height : 1.5em;
  margin-top:0.4em;
`;
const Logo = styled.h1`
  width: 6vw;
  height: 6vw;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
//css Text
const HackTitle = styled.h1`
  color : #0a27a6;
  font-weight: bold;
  font-family: "OTF B";
  // color : #000;
  margin-top : -0.5em;
`;

const TimeTitle = styled.h1`
  font-weight: bold;
  font-family: "OTF R";
  font-size : 1em;
  color : #000;

`;
const JoinTitle = styled.h1`
  font-weight: bold;
  font-family: "OTF R";
  font-size : 1em;
  color : #000;
  margin-left : 3em;
  border : 1px solid #ccc;
`;
const LinkTitle = styled.p`
  font-weight: bold;
  font-family: "OTF R";
  font-size : 1em;
  color : #000;
`;
const DesTitle = styled.p`
  font-weight: bold;
  font-family: "OTF R";
  font-size : 1em;
  color : #000;

  border : 1px solid #ccc;
`;




const ChoiceWrapper = styled.div`
  width: 80%;
  padding: 40px 40px;
  margin: 8em auto;

  border : 1.5px solid #d0d1d9;
  border-radius : 2em;
  height : 28em;
  
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const InputWrapper = styled.div`
    display : flex;
    flex-direction : column;
    
`;
const ColumnWrapper = styled.div`
  display: flex;
  gap: 5%;
  justify-content: space-between;
  width: 100%;

`;
const ColumnWrapper2 = styled.div`
  display: flex;
  gap: 20%;
  // justify-content: space-between;
  width: 100%;
`;
const ColumnWrapper3 = styled.div`
  display: flex;
  gap: 1vw;
  justify-content: space-between;
  width: 100%;
`;
const ImageWrapper = styled.div`
  display: flex;
  gap: 1em;
  justify-content: space-between;
  width: 100%;
`;


//css input
const VitalInput = styled.input`
  border: 1px solid #d0d1d9;
  border-radius: 2em;
  outline: none;
  height: 2em;
  width: 35em; 
  text-indent: 1em;
  &::placeholder {
    text-indent: 1em;
  }
`;
const VitalInput2 = styled.textarea`
  border: 1px solid #d0d1d9;
  border-radius: 1em;
  outline: none;
  height: 23em;
  width: 35em; 
  text-indent: 1em;
  &::placeholder {
    text-indent: 1em;
  }
`;
const ChoiceInput = styled.input`
  border: 1px solid #d0d1d9;
  border-radius: 2em;
  outline: none;
  height: 2em;
  width: 35em; 
  text-indent: 1em;
  &::placeholder {
    text-indent: 1em;
  }
`;

//css Text
const VitalText = styled.p`
  color: black;
  font-size: 1.5em;
  font-weight: 800;
  font-family: "OTF B";

`;
const ExText = styled.p`
  color: black;
  font-size: 0.8em;
  font-weight: 800;
  font-family: "OTF R";
`;

const MainText = styled.p`
    font-size : 1.5em;
    font-weight : 800;
    color : #0A27A6;
    margin-bottom : -0.2em;
    // display : flex;
    font-family: "OTF B";
`;
const FileInput = styled.input`
  position: absolute;
  // width: 1em;
  // height: 1em;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip:rect(0,0,0,0);
  border: 0;
`;

const FileLabel = styled.label`
  display: inline-block;
  width: 5em;  
  height: 5em;
  color: #d0d1d9;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: #fdfdfd;
  cursor: pointer;
  border: 1px solid #d0d1d9;
  border-radius: 1em;  
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

