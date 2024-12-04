import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { oriPortfolios, oriProjects } from "../components/domain/startProgram";
import { getCurrentUser } from "../components/features/currentUser";
import TemplateCard from "../components/commmon/TemplateCard";

const MyProjectsPage = () => {
  const { portfolioId } = useParams();
  const [userProjects, setUserProjects] = useState([]);
  const [userPortfolios, setUserPortfolios] = useState([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    // 현재 포트폴리오와 사용자 정보를 기반으로 데이터 필터링
    const portfolio = oriPortfolios.get(Number(portfolioId));
    setUserPortfolios(portfolio);
    if (portfolio) {
      // projects 배열에서 projectId를 추출
      const portfolioProjectIds = portfolio.projects;

      // projectId가 portfolio.projects에 포함된 프로젝트 필터링
      const filteredProjects = Array.from(oriProjects.values()).filter(
        (project) => portfolioProjectIds.includes(project.projectId)
      );

      setUserProjects(filteredProjects); // 필터링된 프로젝트 업데이트
    }
  }, [portfolioId]);

  return (
    <PageContainer>
      <Title>{userPortfolios.portfolioName}</Title>

      <DescriptionSection>
        <Section>
          <Field>사용한 스택</Field>
          <Text>{userPortfolios.usedLanguage || "해결한 문제 없음"}</Text>
        </Section>
      </DescriptionSection>

      <Section>
        <Field>프로젝트</Field>
        <TemplateGridWrapper>
          <TemplateGrid>
            {userProjects.map((project) => (
              <TemplateCard
                key={project.projectId}
                portfolioId={project.projectId}
                templateButton="자세히 보기"
              />
            ))}
          </TemplateGrid>
        </TemplateGridWrapper>
      </Section>
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

const DescriptionSection = styled.div`
  margin-bottom: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2vw 1vw;

  font-family: "OTF R";
`;

const Field = styled.div`
  font-size: 2vw;
  font-weight: bold;
`;

const Text = styled.div`
  border-radius: 0.3125em;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.1);

  background-color: white;

  padding: 1vw;
  margin-top: 2vw;

  min-width: 80%;
`;

const TemplateSection = styled.div``;

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
