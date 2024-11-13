import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SelectBox from "../components/commmon/SelectBox";
import SearchBarMini from "../components/MyPage/SearchBarMini";
import TemplateCard from "../components/commmon/TemplateCard";
import StyledButton from "../components/commmon/StyledButton";
import { dummydata } from "../components/commmon/dummydata/dummydata"; // dummydata 파일을 import합니다.
import { Navigate, useNavigate } from "react-router-dom";
import {
  oriProjects,
  searchSortManager,
} from "../components/domain/startProgram";
import { getCurrentUser } from "../components/features/currentUser";

function RecruiterPage() {
  const [myPortfolioList, setmyPortfolioList] = useState([]); // 상태로 관리되는 포트폴리오 리스트
  const { userId } = useParams();
  //   useEffect(() => {
  //     const currentUser = getCurrentUser();
  //     if (currentUser) {
  //       console.log(currentUser);
  //       const userPortfolios = Array.from(oriProjects.values()).filter(
  //         (portfolio) => portfolio.ownerEmail === currentUser.email
  //       );
  //       console.log(userPortfolios);
  //       setmyPortfolioList(userPortfolios);
  //     }
  //   }, []);

  useEffect(() => {
    console.log("Recruiter userId:", userId);
  }, [userId]);

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

  return (
    <MyPageContainer className="MyPageContainer">
      <MyContainer>
        <MyTitle>내가 연락한 포트폴리오</MyTitle>
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
          {/* <TemplateGrid>
            {myPortfolioList.length > 0 ? (
              myPortfolioList.map((portfolio) => (
                <TemplateCard
                  key={portfolio.projectId}
                  portfolioId={portfolio.projectId}
                  templateButton={"보기"}
                />
              ))
            ) : (
              <Text>프로젝트가 없습니다.</Text>
            )}
          </TemplateGrid> */}
        </TemplateGridWrapper>
      </MyContainer>

      <Line></Line>
      {/* <StyledButtonWrapper>
        <StyledButton
          text={"추가"}
          onClick={() => console.log("추가 버튼 클릭")} //navigate 넣으면 된다요
        />
      </StyledButtonWrapper> */}

      <MyContainer>
        <MyTitle>내가 찜한 포트폴리오</MyTitle>
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
          <TemplateGrid>{/* 기능구현으로부터 함수 받아서 구현 */}</TemplateGrid>
        </TemplateGridWrapper>
      </MyContainer>

      <Line></Line>
      {/* <StyledButtonWrapper>
        <StyledButton
          text={"추가"}
          onClick={() => console.log("추가 버튼 클릭")} //navigate 넣으면 된다요
        />
      </StyledButtonWrapper> */}
    </MyPageContainer>
  );
}

export default RecruiterPage;

const MyPageContainer = styled.div`
  width: 85%; //수정중...
  margin: 0 auto;
`;

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

const Text = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5vw;
  font-family: "OTF R";
  align-items: center;
  width: 100%;
  height: 100%;
`;
