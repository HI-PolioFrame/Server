import React from "react";
import styled from "styled-components";
import SelectBox from "../commmon/SelectBox";
import SearchBarMini from "../../components/MyPage/SearchBarMini";
import TemplateCard from "../commmon/TemplateCard";
import StyledButton from "../commmon/StyledButton";

import { Navigate, useNavigate } from "react-router-dom";
import { oriProjects, searchSortManager } from "../domain/startProgram";

const Section = ({ title, data = [], renderItem }) => {
  // LinkedList를 배열로 변환하는 유틸리티 함수
  const linkedListToArray = (linkedList) => {
    const array = [];
    let currentNode = linkedList.head; // LinkedList의 시작점
    while (currentNode) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  };

  // 검색어로 검색 시 호출되는 함수
  const handleSearchApply = (searchTerm) => {
    const searchedLinkedList = searchSortManager.search(searchTerm);
    setmyPortfolioList(linkedListToArray(searchedLinkedList)); // 배열로 변환하여 상태 업데이트
  };

  // 정렬/필터 적용 시 호출되는 함수
  const handleSortApply = (category, sortOption, filterOption) => {
    const sortedLinkedList = searchSortManager.sort(
      category,
      sortOption,
      filterOption
    );
    setmyPortfolioList(linkedListToArray(sortedLinkedList));
  };

  // 템플릿카드 렌더링
  const renderTemplateCard = (item) => (
    <TemplateCard
      key={item.projectId}
      portfolioId={item.projectId}
      templateButton={"보기"}
    />
  );

  return (
    <>
      <MyContainer>
        <MyTitle>{title}</MyTitle>
        <MyProtFolioMenuBarWrapper>
          <SelectBox onSort={handleSortApply} />
          <SearchBarMini
            onChange={(e) => console.log(e.target.value)}
            onClick={() => onSearchClick}
            onSearch={handleSearchApply}
          />
        </MyProtFolioMenuBarWrapper>

        <Line></Line>

        <TemplateGridWrapper>
          <TemplateGrid>
            {data.length > 0 ? (
              data.map((item) => renderItem(item))
            ) : (
              <EmptyGridItem>
                <Text>프로젝트가 없습니다.</Text>
              </EmptyGridItem>
            )}
          </TemplateGrid>
        </TemplateGridWrapper>
      </MyContainer>
      <Line></Line>
      <StyledButtonWrapper>
        <StyledButton
          text={"추가"}
          onClick={() => console.log("추가 버튼 클릭")} //navigate 넣으면 된다요
        />
      </StyledButtonWrapper>
    </>
  );
};
export default Section;

const MyContainer = styled.div`
  margin-top: 10vh;
`;

const MyTitle = styled.div`
  height: 2.625em;
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

const MyProtFolioMenuBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MyTemplateMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const TemplateGridWrapper = styled.div`
  //display: flex;
  //justify-content: flex-start;
  //align-items: center;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1vw;
`;

const Line = styled.hr`
  margin: 1.5vh 0;
  border: 1px solid #d0d1d9;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const EmptyGridItem = styled.div`
  grid-column: 1 / -1; /* 그리드 전체 열을 차지 */
  display: grid; /* Flex 대신 Grid 사용 */
  place-content: center; /* Grid로 중앙 정렬 */
`;

const Text = styled.div`
  font-size: 1.5vw;
  font-family: "OTF R";
  align-items: center;
  width: 100%;
  height: 100%;
`;
