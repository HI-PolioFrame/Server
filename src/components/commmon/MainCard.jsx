import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

// 템플릿 카드 1개
//templateName, description, templateThumnail을 props로!
const TemplateCard = () => {
  const navigate = useNavigate();
  const templateName = ["템플릿", "해커톤", "채용"];
  const description = ["나만의 포토폴리오 만들기", "함께 경험 쌓는 프로젝트", "나에게 맞는 채용 정보"];
  const pages = ["/PortfolioPage","/HackathonPage", "/MyPage"];
  const handleButtonClick = (index) => {
    navigate(pages[index]); // 해당 인덱스에 맞는 페이지로 이동
  };

  return (
    <CardContainer>
      {templateName.map((name, index) => (
        <Card key={index}>
          <TemplateName>{name}</TemplateName>
          <Description>{description[index]}</Description>
          <ParticiPateButton onClick={() => handleButtonClick(index)}>참여하기</ParticiPateButton>
        </Card>
      ))}
    </CardContainer>
  );
};

// TemplateCard의 프롭타입
TemplateCard.propTypes = {
  templateName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  templateThumnail: PropTypes.string.isRequired,
};

export default TemplateCard;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  gap : 2em;
`;

const Card = styled.div`
  width: 18em;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  &:hover{
    border : 1px solid #0A27A6;
    

   button {
      background-color: #0A27A6;
      color: #fff;
    }
  }
`;

const TemplateName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-family: "OTF B";
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;

  font-family: "OTF R";

`;

const ParticiPateButton = styled.button`
    color : #0A27A6;
    font-size : 1em;
    font-weight : 800;
    background-color: #fff;
    border : 1px solid #0A27A6;
    border-radius : 2em;
    height : 2em;
    width : 50%;
    margin-top : -3em;
`;