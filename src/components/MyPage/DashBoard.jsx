import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import defaultProfilePicture from "../../assets/icons/profileIcon.svg"; // 기본 이미지
import { useNavigate } from "react-router-dom";

const DashBoard = ({ name, nickname }) => {
  const navigate = useNavigate();

  return (
    <DashboardContainer className="DashBoardContainer">
      <DashboardTitle>대시보드</DashboardTitle>
      <DashboardCard className="DashBoardCard">
        <InfoContainer>
          <Info className="Info">
            <Name className="Name">이름</Name>
            <UserName className="UserName">{name}</UserName>
          </Info>
          <Info>
            <Nickname className="Nickname">닉네임</Nickname>
            <UserNickname className="UserNickname">{nickname}</UserNickname>
          </Info>
        </InfoContainer>
        <Button className="Button">
          <ProfileButton onClick={() => navigate("../ProfileEditPage")}>
            프로필 편집
          </ProfileButton>
        </Button>
      </DashboardCard>
    </DashboardContainer>
  );
};

export default DashBoard;

DashBoard.propTypes = {
  profilePicture: PropTypes.string.isRequired,
};
// 기본 프로필 사진
DashBoard.defaultProps = {
  profilePicture: defaultProfilePicture,
};

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const DashboardTitle = styled.div`
  width: 45%;
  top: 11.375em;
  font-family: "OTF B";
  font-style: normal;
  font-weight: 700;
  font-size: 1.875em;
  line-height: 2.25em;

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.025em;
  color: #000000;
`;

const DashboardCard = styled.div`
  display: flex;
  flex-direction: column;

  border: 0.0625em solid #d9d9d9;
  box-shadow: 0em 0.25em 0.25em rgba(0, 0, 0, 0.25);
  border-radius: 0.625em;
  padding: 1.5em;
  margin-top: 0.625em;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1vw;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.p`
  font-family: "OTF R";
  font-style: normal;
  font-weight: 700;

  margin: 0;
  color: #919194;
`;

const UserName = styled.div`
  height: 1.5625em;
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.5625em;
  line-height: 1.625em;
  display: flex;
  align-items: center;
  margin-bottom: 0.625em;
`;

const Nickname = styled.p`
  font-family: "OTF R";
  font-style: normal;
  font-weight: 700;

  margin: 0;
  color: #919194;
`;

const UserNickname = styled.div`
  height: 1.5625em;
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1em;
  line-height: 1.5em;
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-top: 1vh;

  width: 100%;
`;

const ProfileButton = styled.button`
  width: 30%;
  height: 2.3775em;
  float: right;
  background: #0a27a6;
  border: 0.0625em solid #d0d1d9;
  border-radius: 0.625em;
  color: #ffffff;
  font-family: "OTF R";
  font-style: normal;
  font-weight: 700;
  font-size: 0.9375em;
  line-height: 1.125em;
`;
