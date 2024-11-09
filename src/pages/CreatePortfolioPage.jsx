import React from "react";
import styled from "styled-components";
import Logo from "../assets/icons/Logo.png";
import CreatePortfolioInput from "../components/CreatePortfolioPage/CreatePortfolioInput";
import CreatePortfolioTemplate from "../components/CreatePortfolioPage/CreatePortfolioTemplate";

const CreatePortfolioPage = () => {
    return(
    <>
    <HeaderWrapper>
      <LogoImage src={Logo} alt="로고" />
      <PageHeaderTitle>Portfolio</PageHeaderTitle>
    </HeaderWrapper>
    
    <CreatePortfolioInput/>
    <CreatePortfolioTemplate/>

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
  height : 28em;
  
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const ChoiceWrapper = styled.div`
  width: 80%;
  padding: 40px 40px;
  margin: 2em auto;

  border : 1.5px solid #d0d1d9;
  border-radius : 2em;
  height : 28em;
  
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const InputWrapper = styled.div`
    display : flex;
    flex-direction : column;
    // gap : 0.8m;
`;
const ColumnWrapper = styled.div`
  display: flex;
  gap: 10em;
  // justify-content: space-between;
  width: 100%;
`;
const ImageWrapper = styled.div`
  display: flex;
  gap: 1em;
  justify-content: space-between;
  width: 100%;
`;
//css input
const VitalInput = styled.input`
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
const ChoiceInput = styled.input`
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
const VitalText = styled.p`
  color: black;
  font-size: 1.5em;
  font-weight: 800;
  font-family: "OTF B";

`;
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
const FileInput = styled.input`
  position: absolute;
  // width: 1em;
  // height: 1em;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip:rect(0,0,0,0);
  border: 0;
`;

const FileLabel = styled.label`
  display: inline-block;
  width: 5em;  
  height: 5em;
  color: #d0d1d9;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: #fdfdfd;
  cursor: pointer;
  border: 1px solid #d0d1d9;
  border-radius: 1em;  
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;