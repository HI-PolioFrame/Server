import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DashBoard from "../components/MyPage/DashBoard";
import Section from "../components/MyPage/Section";

import {
  oriProjects,
  searchSortManager,
} from "../components/domain/startProgram";
import currentUser, {
  getCurrentUser,
} from "../components/features/currentUser";

function MyPage() {
  const [myPortfolioList, setmyPortfolioList] = useState([]); // 상태로 관리되는 포트폴리오 리스트
  const currentUser = getCurrentUser();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      console.log("Current User:", currentUser);
      // console.log(oriProjects);
      const userPortfolios = Array.from(oriProjects.values()).filter(
        (portfolio) =>
          portfolio.ownerId === currentUser.id ||
          portfolio.ownerEmail === currentUser.email
      );
      console.log("User Portfolios:", userPortfolios);
      setmyPortfolioList(userPortfolios);
    }
  }, []);

  return (
    <MyPageContainer className="MyPageContainer">
      <DashBoardContainer>
        <DashBoard name={currentUser.name} nickname={currentUser.nickname} />
      </DashBoardContainer>
      {!currentUser.recruiter && (
        <>
          <Section
            title={"내가 만든 프로젝트"}
            data={myPortfolioList}
            renderItem={renderTemplateCard}
            button={true}
          />

          <Section title={"내가 만든 포트폴리오"} button={true} />
          <Section title={"내가 만든 템플릿"} button={true} />
        </>
      )}
    </MyPageContainer>
  );
}

export default MyPage;

const MyPageContainer = styled.div`
  width: 85%; //수정중...
  margin: 0 auto;
`;

const DashBoardContainer = styled.div`
  display: flex;
`;
