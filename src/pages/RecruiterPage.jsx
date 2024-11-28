import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SelectBox from "../components/commmon/SelectBox";
import SearchBarMini from "../components/MyPage/SearchBarMini";
import TemplateCard from "../components/commmon/TemplateCard";
import RecruiterSection from "../components/RecruiterPage/RecruiterSection";

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
      <RecruiterSection
        title={"내가 연락한 포트폴리오"}
        data={myPortfolioList}
        renderItem={renderTemplateCard}
        button={false}
      />

      <RecruiterSection title={"내가 찜한 포트폴리오"} button={false} />
    </MyPageContainer>
  );
}

export default RecruiterPage;

const MyPageContainer = styled.div`
  width: 85%; //수정중...
  margin: 0 auto;
`;
