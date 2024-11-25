import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SelectBox from "../components/commmon/SelectBox";
import SearchBarMini from "../components/MyPage/SearchBarMini";
import TemplateCard from "../components/commmon/TemplateCard";
import Section from "../components/MyPage/Section";

import StyledButton from "../components/commmon/StyledButton";
import { dummydata } from "../components/commmon/dummydata/dummydata"; // dummydata 파일을 import합니다.
import { Navigate, useNavigate } from "react-router-dom";
import {
  oriProjects,
  searchSortManager,
} from "../components/domain/startProgram";
import { getCurrentUser } from "../components/features/currentUser";

function RecruiterPage() {
  const [myPortfolioList, setMyPortfolioList] = useState([]); // 상태로 관리되는 포트폴리오 리스트
  const { userId } = useParams();
  const currentUser = getCurrentUser();

  useEffect(() => {
    console.log("Recruiter userId:", userId);

    const updateCurrentUser = getCurrentUser();
    if (updateCurrentUser) {
      console.log("Current User:", updateCurrentUser);

      const userPortfolios = Array.from(oriProjects.values()).filter(
        (project) =>
          project.contacts.some(
            (contact) =>
              contact === updateCurrentUser.id ||
              contact === updateCurrentUser.email
          )
      );

      console.log("User Portfolios:", userPortfolios);
      setMyPortfolioList(userPortfolios);
    }
  }, [userId, oriProjects]);

  // 템플릿카드 렌더링
  const renderTemplateCard = (item) => (
    <TemplateCard
      key={item.projectId}
      portfolioId={item.projectId}
      templateButton={"보기"}
    />
  );

  return (
    <MyPageContainer className="MyPageContainer">
      <Section
        title={"내가 연락한 포트폴리오"}
        data={myPortfolioList}
        renderItem={renderTemplateCard}
        button={false}
      />

      <Section title={"내가 찜한 포트폴리오"} button={false} />
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
