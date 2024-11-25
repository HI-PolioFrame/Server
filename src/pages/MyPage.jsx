import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DashBoard from "../components/MyPage/DashBoard";
import Section from "../components/commmon/Section";
import TemplateCard from "../components/commmon/TemplateCard";
import HackTemplateCard from "../components/commmon/HackTemplateCard";

import {
  oriProjects,
  oriHackathons,
  searchSortManager,
} from "../components/domain/startProgram";
import currentUser, {
  getCurrentUser,
} from "../components/features/currentUser";

function MyPage() {
  const [myPortfolioList, setmyPortfolioList] = useState([]); // 상태로 관리되는 포트폴리오 리스트
  const [myHackathonList, setmyHackathonList] = useState([]);

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

      const userHackathons = Array.from(oriHackathons.values()).filter(
        (hackathon) =>
          hackathon.ownerId === currentUser.id ||
          hackathon.ownerEmail === currentUser.email
      );

      console.log("User Hackathons:", userHackathons);
      setmyHackathonList(userHackathons);
    }
  }, []);

  // 템플릿카드 렌더링
  const renderTemplateCard = (item) => (
    <TemplateCard
      key={item.projectId}
      portfolioId={item.projectId}
      templateButton={"보기"}
    />
  );
  const renderHackTemplateCard = (item) => (
    <HackTemplateCard
      key={item.hackId}
      hackId={item.hackId}
      templateButton={"보기"}
    />
  );
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
          <Section
            title={"내가 만든 해커톤"}
            data={myHackathonList}
            renderItem={renderHackTemplateCard}
            button={true}
          />
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
