// 메인 페이지가 작동(=서버에 시연자가 접속)하면
// 1. 모든 개발자 유저 정보를 hashmap 등에 등록한다.
// 2. 모든 채용자 유저 정보를 hashmap 등에 등록한다.
// 3. 모든 공유된 템플릿 정보를 hashmap에 등록한다.
// ... 수정할 때마다 업데이트 필요

// 이미 저장되어 있는 것을 읽어들이지 않는다면, 프로그램을 실행시킬 때마다 데이터를 추가해야 한다.
// 1. 프로그램을 실행하면 외부 파일에서 정보를 불러와 저장한다.
// 2. 추가되는 유저, 템플릿 등은 바로바로 '이미 있는 데이터' 파일에 추가한다.
// import Template from "../domain/Template";
import User from "./User.js";
import Portfolio from "./Portfolio.js";
import Project from "./Project.js";
// import { templateInfo } from "../commmon/dummydata/templateInfo"; // 저장된 모든 템플릿 정보
import { portfolioInfo } from "../commmon/dummydata/portfolioInfo.jsx"; // 저장된 모든 포트폴리오 정보
import { projectInfo } from "../commmon/dummydata/projectInfo.jsx";
import { userInfo } from "../commmon/dummydata/userInfo.jsx"; // 저장된 모든 유저 정보

import SearchSortManager from "../features/SearchSortManager.jsx";

export const oriUsers = new Map();
export const oriRecruiters = new Map();
export const oriPortfolios = new Map();
export const oriProjects = new Map();

// 유저에게 공유되는 템플릿들
/* let oriTemplates = new Map();
templateInfo.forEach((data) => {
    template = new Template(data.templateId);
    oriTemplates.set(data.templateId, template);
}); */

export const initializeData = () => {
  userInfo.forEach((data) => {
    let user = new User(
      data.id,
      data.pageId,
      data.password,
      data.name,
      data.phoneNumber,
      data.birthday,
      data.recruiter,
      data.email,
      data.nickname,
      data.link,
      data.career,
      data.education
    );
    oriUsers.set(data.id, user);
    if (user.recruiter === true) {
      oriRecruiters.set(data.id, user);
    }
  });

  portfolioInfo.forEach((data) => {
    let portfolio = new Portfolio(
      data.portfolioId,
      data.owner,
      data.setTemplate,
      data.title,
      data.explanation,
      data.share,
      data.projects,
      data.category,
      data.comments,
      data.likes
    );
    oriPortfolios.set(data.portfolioId, portfolio);
  });

  projectInfo.forEach((data) => {
    let project = new Project(
      data.projectId,
      null,
      null,
      null,
      null,
      data.stack
    );
    oriProjects.set(data.projectId, project);
  });
  /* oriUsers.forEach((value, key) => {
        console.log(value.id);
    });
    console.log("저장된 유저 아이디 확인 출력 끝");
    oriPortfolios.forEach((value, key) => {
        console.log(value.portfolioId);
    });
    console.log("저장된 포폴 아이디 확인 출력 끝");
    oriProjects.forEach((value, key) => {
        console.log(value.projectId);
    });
    console.log("저장된 프젝 아이디 확인 출력 끝"); */
};

export const searchSortManager = new SearchSortManager(oriProjects, oriUsers, oriPortfolios);
