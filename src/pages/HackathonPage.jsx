import React from "react";
import styled from "styled-components";

import PageHeader from "../components/commmon/PageHeader.jsx";
import TemplateCard from "../components/commmon/TemplateCard.jsx";
import { dummydata } from "../components/commmon/dummydata/dummydata";
import SelectBox from "../components/commmon/SelectBox.jsx";
import SearchBar from "../components/commmon/SearchBar";
import StyledButton from "../components/commmon/StyledButton";

const HackathonPage = () => {
  return (
    <>
      <PageHeader pageTitle="Hackathon" />
      <MainWrapper>
        <MyTemplateMenuWrapper>
          <SelectBox />
        </MyTemplateMenuWrapper>
        <Line></Line>

        {/* 12개의 카드를 그리드 형태로 출력 */}
        <HackathonGridWrapper>
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
        </HackathonGridWrapper>
      </MainWrapper>
    </>
  );
};

export default HackathonPage;

//css Wrapper

const MainWrapper = styled.div`
  width: 85%; //수정중...
  margin: 0 auto;
`;
const PageCategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const MyTemplateMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10vh;
`;

const HackathonGridWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
//css element
const SearchInput = styled.input`
  border-radius: 2em;
  border: 1px solid #d0d1d9;
  height: 3em;
  width: 50%;
  text-indent: 1em;
  outline: none;
  &::placeholder {
    text-indent: 1em;
  }
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
//css Text
const HeaderText = styled.p`
  color: #0a27a6;
  font-size: 2em;
  font-weight: 800;
  font-family: "OTF B";
`;