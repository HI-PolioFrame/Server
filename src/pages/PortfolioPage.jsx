import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/commmon/SearchBar";
import SelectBox from "../components/commmon/SelectBox";
import TemplateCard from "../components/commmon/TemplateCard";
import StyledButton from "../components/commmon/StyledButton";
import { dummydata } from "../components/commmon/dummydata/dummydata"; // dummydata 파일을 import
import { Navigate, useNavigate } from "react-router-dom";
import {
  oriPortfolios,
  searchSortManager,
} from "../components/domain/startProgram";
import { initializeData } from "../components/domain/startProgram";

import PageHeader from "../components/commmon/PageHeader";

const PortfolioPage = () => {
  const navigate = useNavigate();

  const [portfolioList, setPortfolioList] = useState([]);

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

  // 페이지 최초 로드 시 oriPortfolios를 순회하여 상태에 설정
  useEffect(() => {
    initializeData(); // 데이터를 초기화
    const initialPortfolios = Array.from(oriPortfolios.values()); // Map을 배열로 변환
    setPortfolioList(initialPortfolios); // 초기 포트폴리오 목록을 상태로 설정
  }, []);

  const handleSortApply = (category, sortOption, filterOption) => {
    const sortedLinkedList = searchSortManager.sort(
      category,
      sortOption,
      filterOption
    );
    setPortfolioList(linkedListToArray(sortedLinkedList));
  };

  const handleSearchApply = (searchTerm) => {
    const searchedLinkedList = searchSortManager.search(searchTerm);
    setPortfolioList(linkedListToArray(searchedLinkedList));
  };

  return (
    <TemplatePageContainer className="TemplatePageContainer">
      {/* 각 페이지별 상단 -> 나중에 쉽게 모든 페이지에 적용할 수 있는 방법으로 수정 */}
      <PageHeader pageTitle="Portfolio" onSearch={handleSearchApply} />

      <SelectBoxWrapper>
        <SelectBox onSort={handleSortApply} />
      </SelectBoxWrapper>
      <Line></Line>

      <TemplateGridWrapper>
        <TemplateGrid>
          {portfolioList.map((data, index) => (
            <TemplateCard
              key={index}
              templateName={data.title || "빈 제목"}
              description={data.description || "빈 설명"}
              templateThumbnail={data.thumbnail || "default-image.png"}
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
