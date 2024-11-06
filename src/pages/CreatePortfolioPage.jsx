import React from "react";
import styled from "styled-components";
import Logo from "../assets/icons/Logo.png";


const CreatePortfolioPage = () => {
    return(
    <>
    <HeaderWrapper>
      <LogoImage src={Logo} alt="로고" />
      <PageHeaderTitle>Portfolio</PageHeaderTitle>
    </HeaderWrapper>
     
    <VitalWrapper>
    <ColumnWrapper>
      {/* 포트폴리오 이름 */}
        <InputWrapper>
            <MainText>포트폴리오 이름</MainText>
            <ExText>자신만의 포트폴리오 이름을 작성해주세요</ExText>
            <NameInput type="text"></NameInput>
        </InputWrapper>
      {/* 포트폴리오 설명 -> 글자수 제한해야한다.*/}
        <InputWrapper>
            <MainText>포트폴리오 설명</MainText>
            <ExText>짧게 포트폴리오를 설명해주세요</ExText>
            <NameInput type="text"></NameInput>
        </InputWrapper>
      </ColumnWrapper>

      <ColumnWrapper>
      {/* 사용한 프로그램 */}
        <InputWrapper>
            <MainText>사용한 프로그램</MainText>
            <ExText>사용한 언어/프로그램을 작성해주세요</ExText>
            <NameInput type="text"></NameInput>
        </InputWrapper>
        {/* 링크 */}
        <InputWrapper>
            <MainText>Links</MainText>
            <ExText>Github, 웹사이트, 앱 스토어 등 프로젝트를 라이브로 테스트할 수 있는 곳에 링크를 추가하세요.</ExText>
            <NameInput type="text"></NameInput>
        </InputWrapper>
      </ColumnWrapper>

      <ColumnWrapper>
      {/* The problem it solves -> 해결하는 문제 */}
        <InputWrapper>
            <MainText>해결하는 문제</MainText>
            <ExText>사람들이 그것을 무엇에 사용할 수 있는지, 그것이 어떻게 기존 작업을 더 쉽고 안전하게 만드는지 등을 설명합니다</ExText>
            <NameInput type="text"></NameInput>
        </InputWrapper>
        {/* Challenges I ran into -> 내가 마주친 도전 ex 트러블 슈팅 */}
        <InputWrapper>
            <MainText>내가 마주친 도전</MainText>
            <ExText>이 프로젝트를 구축하는 동안 발생한 특정 버그나 장애물에 대해 알려주세요. 어떻게 극복하셨나요? </ExText>
            <NameInput type="text"></NameInput>
        </InputWrapper>
      </ColumnWrapper>

    </VitalWrapper>
    {/* 포트폴리오 제작하기 위해 필요한 입력 */}
    </>
    );
};

export default CreatePortfolioPage;

//css Wrapper
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap : 1.5em;
  margin-bottom : 5em;
`;
const VitalWrapper = styled.div`
  width: 80%;
  padding: 40px 40px;
  margin: 0 auto;

  border : 1.5px solid #d0d1d9;
  border-radius : 2em;
  height : 24em;
  
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const InputWrapper = styled.div`
    display : flex;
    flex-direction : column;
    gap : 0.2em;
`;
const ColumnWrapper = styled.div`
  display: flex;
  gap: 5em;
  justify-content: space-between;
  width: 100%;
`;

//css input
const NameInput = styled.input`
  border: 1px solid #d0d1d9;
  border-radius: 2em;
  outline: none;
  height: 2em;
  width: 35em; 
  text-indent: 1em;
  &::placeholder {
    text-indent: 1em;
  }
`;

//css Image
const LogoImage = styled.img`
  widht: 5em;
  height: 5em;
  margin-bottom: -2em;
`;


//css Text
const ExText = styled.p`
  color: black;
  font-size: 0.8em;
  font-weight: 800;
  font-family: "OTF R";
`;

const MainText = styled.p`
    font-size : 1.5em;
    font-weight : 800;
    color : #0A27A6;
    margin-bottom : -0.2em;
    // display : flex;
    font-family: "OTF B";
`;
const PageHeaderTitle = styled.div`
  color: #0a27a6;
  font-size: 2em;
  font-weight: 800;
  font-family: "OTF B";

  @media (max-width: 768px) {
    font-size: 1.25em;
    margin-top: 0.75em;
    margin-bottom: 1em;
  }
`;
