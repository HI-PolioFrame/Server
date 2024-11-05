import React from "react";
import styled from "styled-components";
import SearchBar from "../components/commmon/SearchBar";
import SelectBox from "../components/commmon/SelectBox";
import TemplateCard from "../components/commmon/TemplateCard";
import StyledButton from "../components/commmon/StyledButton";
import { dummydata } from "../components/commmon/dummydata/dummydata"; // dummydata 파일을 import
import { Navigate, useNavigate } from "react-router-dom";

import PageHeader from "../components/commmon/PageHeader";

const PortfolioPage = () => {
  const navigate = useNavigate();

  return (
    <TemplatePageContainer>
      {/* 각 페이지별 상단 -> 나중에 쉽게 모든 페이지에 적용할 수 있는 방법으로 수정 */}
      <PageHeader pageTitle="Portfolio" />

      <SelectBoxWrapper>
        <SelectBox />
      </SelectBoxWrapper>
      <Line></Line>

      <TemplateGridWrapper>
        <TemplateGrid>
          {dummydata.map((data, index) => (
            <TemplateCard
              key={index}
              templateName={data.postTitle || "빈 제목"}
              description={data.postContent || "빈 설명"}
              templateThumnail={data.postBackgroundImg || "default-image.png"}
              templateButton={"보기"}
            />
          ))}
        </TemplateGrid>
      </TemplateGridWrapper>
      <ButtonWrapper>
        {/* 포트폴리오 제작 페이지로 넘어갈 수 있는 버튼 추가 */}
        <StartButton onClick={() => navigate("/CreatePortfolioPage")}>
          포트폴리오 제작하기
        </StartButton>
      </ButtonWrapper>
    </TemplatePageContainer>
  );
};

export default PortfolioPage;

const TemplatePageContainer = styled.div`
  width: 85%; //수정중...
  margin: 0 auto;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10vh;
`;

const TemplateGridWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2em;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-content: center center;
  gap: 3vw 1vw;
  margin-top: 2em;
  max-width: 80em;
`;

const Line = styled.hr`
  margin: 0.625em 0;
  border: 1px solid #d0d1d9;
`;

const StartButton = styled.button`
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

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
