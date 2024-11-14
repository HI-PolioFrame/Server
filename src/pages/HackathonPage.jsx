import React, { useEffect, useState } from "react";
import styled from "styled-components";

import PageHeader from "../components/commmon/PageHeader.jsx";
import TemplateCard from "../components/commmon/TemplateCard.jsx";
import { dummydata } from "../components/commmon/dummydata/dummydata";
import SelectBox from "../components/commmon/SelectBox.jsx";
import SearchBar from "../components/commmon/SearchBar";
import StyledButton from "../components/commmon/StyledButton";
import HackathonPageSlide from "../components/HackathonPage/HackathonPageSlide.jsx";
import { Navigate, useNavigate } from "react-router-dom";

import {
  oriProjects,
  searchSortManager,
  initializeData,
} from "../components/domain/startProgram";

const HackathonPage = () => {
  const navigate = useNavigate();

  const [sharedPortfolioList, setsharedPortfolioList] = useState([]);

  //LinkedList를 배열로 바꾸는 함수
  const linkedListToArray = (linkedList) => {
    const array = [];
    let currentNode = linkedList.head;
    while (currentNode) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  };

  // 페이지 최초 로드 시 oriProjects를 순회하여 상태에 설정
  useEffect(() => {
    initializeData(); // 데이터를 초기화
    const sharedPortfolios = Array.from(oriProjects.values()).filter(
      (portfolio) => portfolio.share === true
    ); // Map을 배열로 변환
    setsharedPortfolioList(sharedPortfolios); // 초기 포트폴리오 목록을 상태로 설정
  }, []);

  const handleSortApply = (category, sortOption, filterOption) => {
    const sortedLinkedList = searchSortManager.sort(
      category,
      sortOption,
      filterOption
    );
    setsharedPortfolioList(linkedListToArray(sortedLinkedList));
  };

  const handleSearchApply = (searchTerm) => {
    const searchedLinkedList = searchSortManager.search(searchTerm);
    setsharedPortfolioList(linkedListToArray(searchedLinkedList));
  };

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
          {/* <TemplateGrid>
            {dummydata.map((data, index) => (
              <TemplateCard
                key={index}
                templateName={data.postTitle || "빈 제목"}
                description={data.postContent || "빈 설명"}
                templateThumnail={data.postBackgroundImg || "default-image.png"}
                templateButton={"보기"}
              />
            ))}
          </TemplateGrid> */}
          <TemplateGridWrapper>
            <TemplateGrid>
              {sharedPortfolioList.map((portfolio) => (
                <TemplateCard
                  key={portfolio.projectId}
                  portfolioId={portfolio.projectId}
                  templateButton={"보기"}
                />
              ))}
            </TemplateGrid>
          </TemplateGridWrapper>
        </HackathonGridWrapper>
        {/* 기존 해커톤 */}
        <Line2></Line2>

        <HackathonPageSlide/>

        <ButtonWrapper>
        {/* 포트폴리오 제작 페이지로 넘어갈 수 있는 버튼 추가 */}
        <StartButton onClick={() => navigate("/CreateHackathonPage")}>
          해커톤 제작하기
        </StartButton>
      </ButtonWrapper>

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
const TemplateGridWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
//css buttom
const StartButton = styled.button`
  color: #fff;
  font-size: 1em;
  font-weight: 800;
  border-radius: 2em;
  border: none;
  background-color: #0a27a6;
  height: 3em;
  width: 20%;
  font-family: "OTF R";

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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
const Line2 = styled.hr`
  margin: 5em 0 0 0;
  border: 1px solid #d0d1d9;
`;
//css Text
const HeaderText = styled.p`
  color: #0a27a6;
  font-size: 2em;
  font-weight: 800;
  font-family: "OTF B";
`;
