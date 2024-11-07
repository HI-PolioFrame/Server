import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { oriPortfolios } from "../domain/startProgram";

import Logo from "../../assets/icons/Logo.png";

const TemplateCard = ({ portfolioId, templateButton }) => {
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    //프롭스로 받은 포트폴리오 ID 사용해서 oriPortfolios에서 포트폴리오 데이터 가져오기
    const portfolio = oriPortfolios.get(portfolioId);
    if (portfolio) {
      setPortfolioData(portfolio);
    }
  }, [portfolioId]);

  if (!portfolioData) {
    return <Loading>로딩 중...</Loading>;
  }

  return (
    <Card>
      <ImageContainer>
        <Image src={portfolioData.thumnail || Logo} alt="Template" />
      </ImageContainer>
      <TemplateName>{portfolioData.title || "빈 제목"}</TemplateName>
      <Description>{portfolioData.explanation || "빈 설명"}</Description>
      <Button
        onClick={() => {
          console.log("보기 버튼 클릭");
          navigate(`/PortfolioDetailPage/${portfolioId}`);
        }}
      >
        {templateButton}
      </Button>
    </Card>
  );
};

// TemplateCard의 프롭타입
TemplateCard.propTypes = {
  templateName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  templateThumnail: PropTypes.string.isRequired,
};

export default TemplateCard;

const Loading = styled.div`
  display: flex;
  justify-content: center;

  font-size: 1vw;
  font-weight: bold;
`;

const Card = styled.div`
  position: relative;
  width: 20vw;
  height: 35vh; // 원래 17.625em
  background-color: #ffffff;
  border: 0.125em solid #d0d1d9;
  border-radius: 0.3125em;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  display: grid;
  grid-template-rows: 6fr 1.5fr 3fr 1.5fr;
  padding: 1em;
  box-sizing: border-box;
`;

const ImageContainer = styled.div`
  position: relative;
  //width: 18vw;
  //height: 26vh; // 원래 8.855em
  background-color: #f9f9f9;
  border: 0.0625em solid #d0d1d9;
  border-radius: 0.625em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%; // 원래 3.36em
  height: 2.58em;
  object-fit: contain;
`;

const TemplateName = styled.h3`
  margin-top: 0.5em; // 원래 1.25em
  margin-bottom: 0.5em;
  font-family: "Inria Sans", sans-serif;
  font-weight: 700;
  font-size: 1.2vw;
  line-height: 1.1875em;
  text-align: center;
  color: #000000;
`;

const Description = styled.div`
  font-family: "Inria Sans", sans-serif;
  font-weight: 300;
  font-size: 0.9vw;
  line-height: 1.0625em;
  text-align: center;
  color: #d0d1d9;
  width: 18vw;
  overflow: scroll;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button`
  margin-top: 1vh;
  //width: 11.523em;
  //height: 4.5vh;
  background-color: #0a27a6;
  border-radius: 62.5em;
  border: none;
  color: #ffffff;
  font-family: "Inria Sans", sans-serif;
  font-weight: 700;
  font-size: 1em;
  line-height: 1.1875em;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #092091;
  }
`;
