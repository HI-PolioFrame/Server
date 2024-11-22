import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/icons/Logo.png";
import CreateHackathonInput from "../components/CreateHackathonPage/CreateHackathonInput";
import { getCurrentUser } from "../components/features/currentUser";
import { saveHackathon } from "../components/features/hackathonFeatures";
import { Navigate, useNavigate } from "react-router-dom";

const CreateHackathonPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hackName: "",
    startDate: null,
    endDate: null,
    link: "",
    memNumber: "",
    description: "",
    video: null,
    pictures: null,
    coverImage: null,
    logo: null,
    ownerId: "",
    ownerEmail: "",
  });

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setFormData((prevData) => ({
        ...prevData,
        ownerId: user.id,
        ownerEmail: user.email,
      }));
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

  const handleDateChange = (name, date) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const handleSaveHack = () => {
    saveHackathon(
      formData.hackName,
      formData.startDate,
      formData.endDate,
      formData.link,
      formData.memNumber,
      formData.description,
      formData.video,
      formData.pictures,
      formData.coverImage,
      formData.logo,
      formData.ownerId,
      formData.ownerEmail
    );
    console.log(formData.startDate, formData.endDate);
    navigate("/MyPage"); 
  };

  return (
    <>
      <HeaderWrapper>
        <LogoImage src={Logo} alt="로고" />
        <PageHeaderTitle>Hackathon</PageHeaderTitle>
      </HeaderWrapper>

      <ContentWrapper>
        <CreateHackathonInput 
          onInputChange={handleInputChange}
          formData={formData}
          onDateChange={handleDateChange}
        />
        <CreateButton onClick={handleSaveHack}>제작하기</CreateButton>
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
  margin-top: -6em;
  font-family: "OTF R";

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
