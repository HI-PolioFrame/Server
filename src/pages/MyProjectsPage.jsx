import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { oriProjects } from "../components/domain/startProgram";
import { getCurrentUser } from "../components/features/currentUser";
import TemplateCard from "../components/commmon/TemplateCard";

const MyProjectsPage = () => {
  const [myProjects, setMyProjects] = useState([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      // 현재 사용자의 ID와 일치하는 프로젝트 필터링
      const userProjects = Array.from(oriProjects.values()).filter(
        (project) => project.ownerId === currentUser.id
      );
      setMyProjects(userProjects);
    }
  }, [currentUser]);

  return (
    <PageContainer>
      <Title>내 프로젝트</Title>
      {/* <CardGrid>
        {myProjects.map((project) => (
          <TemplateCard
            key={project.projectId}
            portfolioId={project.projectId}
            templateButton="자세히 보기"
          />
        ))}
      </CardGrid> */}
      <TemplateGridWrapper>
        <TemplateGrid>
          {myProjects.map((project) => (
            <TemplateCard
              key={project.projectId}
              portfolioId={project.projectId}
              templateButton="자세히 보기"
            />
          ))}
        </TemplateGrid>
      </TemplateGridWrapper>
    </PageContainer>
  );
};

export default MyProjectsPage;

const PageContainer = styled.div`
  width: 85%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2vw;
  text-align: center;
  margin-bottom: 2vh;
  font-family: "OTF B";

  font-style: normal;
  font-weight: 700;

  //   height: 2.625em;
  //   top: 11.375em;
  //   font-family: "OTF B";

  //   font-style: normal;
  //   font-weight: 700;
  //   font-size: 1.875em;
  //   line-height: 2.25em;
  //   display: flex;
  //   align-items: center;
  //   text-align: center;
  //   letter-spacing: -0.025em;
  //   color: #000000;
`;

const TemplateGridWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  //place-content: center center;
  //justify-content: center;
  gap: 3vw 1vw;

  margin-top: 2em;
  width: 100%;
`;
