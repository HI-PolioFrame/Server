import React from "react";
import styled from "styled-components";
import PageHeader from "../components/commmon/PageHeader";


const CreatePortfolioPage = () => {
    return(
    <>
      <PageHeader
        pageTitle="Portfolio"
      /> 

      <MainWrapper>
      <ColumnWrapper1>
       <NameWrapper>
            <MainText>포트폴리오 이름</MainText>
            <NameInput type="text"></NameInput>
        </NameWrapper>
       
        <NameWrapper>
            <MainText>참여 기간</MainText>
            <NameInput type="text"></NameInput>
        </NameWrapper>
      </ColumnWrapper1>
       
      <ColumnWrapper1>
        <NameWrapper>
              <MainText>문제해결</MainText>
              <NameInput type="text"></NameInput>
          </NameWrapper>

          <NameWrapper>
              <MainText>사용한 언어</MainText>
              <NameInput type="text"></NameInput>
          </NameWrapper>
      </ColumnWrapper1>
        
      <ColumnWrapper1>
        <NameWrapper>
              <MainText>배운점</MainText>
              <NameInput type="text"></NameInput>
          </NameWrapper>

          <NameWrapper>
              <MainText>링크</MainText>
              <NameInput type="text"></NameInput>
          </NameWrapper>
      </ColumnWrapper1>


        <NameWrapper>
            <MainText>데모 비디오</MainText>
            <NameInput type="text"></NameInput>
        </NameWrapper>
      </MainWrapper>
    </>
    );
};

export default CreatePortfolioPage;

//css Wrapper
const PageCategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const MainWrapper = styled.div`
    width : 85%;
    padding: 40px 40px;
    margin: 0 auto; 
`;
const NameWrapper = styled.div`
    display : flex;
    flex-direction : column;
`;
const ColumnWrapper1 = styled.div`
    display : flex;
    gap : 30em;
`;

//css input
const NameInput = styled.input`

  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #d0d1d9; 

    outline : none;
    height : 2em;
    margin-top : -1em;
`;

//css Image
const LogoImage = styled.img`
  widht: 5em;
  height: 5em;
  margin-bottom: -2em;
`;


//css Text
const HeaderText = styled.p`
  color: #0a27a6;
  font-size: 2em;
  font-weight: 800;
  font-family: "OTF B";
`;

const MainText = styled.p`
    font-size : 1.5em;
    font-weight : 800;
    color : #0A27A6;
    display : flex;
`;