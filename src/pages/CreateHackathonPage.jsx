import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/icons/Logo.png";
import CreateHackathonInput from "../components/CreateHackathonPage/CreateHackathonInput";
import CreateHackathonTemplate from "../components/CreateHackathonPage/CreateHackathonTemplate";
import saveProject from "../components/features/saveProject";
import { getCurrentUser } from "../components/features/currentUser";

const CreateHackathonPage = () => {
  const [formData, setFormData] = useState({
    projectOwnerName: "", // 포폴 만든 사람 이름
    projectOwnerNickname: "",
    projectOwnerEmail: "", // 포폴 만든 사람 이메일
    projectTemplate: null, //포폴 템플릿
    projectTitle: "", //포폴 이름
    description: "", //포폴 설명
    startDate: null,
    endDate: null,
    solving: "",
    challenge: "",
    share: false, // 공유 여부
    usedLanguage: "",
    category: "",
    video: null,
    coverImage: null,
    images: [],
    logo: null,
  });

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      console.log(currentUser);
    } else {
      console.log("user 없음");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProject = () => {
    saveProject(
      currentUser.name, // 사용자 이름
      currentUser.nickname, // 사용자 닉네임
      currentUser.email, // 사용자 이메일
      null, // projectTemplate
      formData.projectTitle,
      formData.description,
      formData.startDate,
      formData.endDate,
      formData.solving,
      formData.challenge,
      formData.share,
      formData.usedLanguage,
      null, // 카테고리 입력에 따라 수정 필요
      formData.video,
      formData.coverImage,
      formData.images,
      formData.logo
    );
  };
  return (
    <>
      <HeaderWrapper>
        <LogoImage src={Logo} alt="로고" />
        <PageHeaderTitle>Hackathon</PageHeaderTitle>
      </HeaderWrapper>

      <ContentWrapper>
        <CreateHackathonInput onInputChange={handleInputChange} />
        {/* <CreateHackathonTemplate /> */}
        <CreateButton onClick={handleSaveProject}>제작하기</CreateButton>
      </ContentWrapper>
    </>
  );
};

export default CreateHackathonPage;

//css Wrapper
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5em;
  margin-bottom: 5em;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

//css Image
const LogoImage = styled.img`
  widht: 5em;
  height: 5em;
  margin-bottom: -2em;
`;

//css Text
const PageHeaderTitle = styled.div`
  color: #0a27a6;
  font-size: 2em;
  font-weight: 800;
  font-family: "OTF B";

  @media (max-width: 768px) {
    font-size: 1.25em;
    margin-top: 0.75em;
    margin-bottom: 1em;
  }
`;
//css button
const CreateButton = styled.button`
  color: #fff;
  font-size: 1em;
  font-weight: 800;
  border-radius: 2em;
  border: none;
  background-color: #0a27a6;
  height: 3em;
  width: 20%;
  margin-top: 2em;
  font-family: "OTF R";

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
