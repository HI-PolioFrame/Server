import React from "react";
import styled from "styled-components";
import Logo from "../../assets/icons/Logo.png";
import { useState } from "react";

const CreatePortfolioInput = () => {
  // 업로드 이미지 미리보기 코드
  const [coverimagePreview, setCoverImagePreview] = useState(null);
  const [LogoPreview, setLogoPreview] = useState(null);
  const [photosPreview, setPhotosPreview] = useState([null, null, null, null, null]);

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setCoverImagePreview(imageURL);
    }
  };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setLogoPreview(imageURL);
    }
  };
  const handlePhotosChange = (index) => (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const newPhotosPreview = [...photosPreview];
      newPhotosPreview[index] = URL.createObjectURL(file);
      setPhotosPreview(newPhotosPreview);
    }
  };
  
  return(
    <>
     {/* 필수항목 */}
    <VitalWrapper> 
     <VitalText>필수 항목</VitalText>
      <ColumnWrapper>
        {/* 포트폴리오 이름 */}
          <InputWrapper>
              <MainText>포트폴리오 이름</MainText>
              <ExText>자신만의 포트폴리오 이름을 작성해주세요</ExText>
              <VitalInput type="text"></VitalInput>
          </InputWrapper>
        {/* 포트폴리오 설명 -> 글자수 제한해야한다.*/}
          <InputWrapper>
              <MainText>포트폴리오 설명</MainText>
              <ExText>짧게 포트폴리오를 설명해주세요</ExText>
              <VitalInput type="text"></VitalInput>
          </InputWrapper>
        </ColumnWrapper>

        <ColumnWrapper>
        {/* 사용한 프로그램 */}
          <InputWrapper>
              <MainText>사용한 프로그램</MainText>
              <ExText>사용한 언어/프로그램을 작성해주세요</ExText>
              <VitalInput type="text"></VitalInput>
          </InputWrapper>
          {/* 링크 */}
          <InputWrapper>
              <MainText>Links</MainText>
              <ExText>Github, 웹사이트, 앱 스토어 등 프로젝트를 테스트할 수 있는 곳의 링크를 추가하세요.</ExText>
              <VitalInput type="text"></VitalInput>
          </InputWrapper>
        </ColumnWrapper>

        <ColumnWrapper>
        {/* The problem it solves -> 해결하는 문제 */}
          <InputWrapper>
              <MainText>해결하는 문제</MainText>
              <ExText>무엇에 사용할 수 있는지, 그것이 어떻게 기존 작업을 더 쉽고 안전하게 만드는지 등을 설명합니다</ExText>
              <VitalInput2></VitalInput2>
          </InputWrapper>
          {/* Challenges I ran into -> 내가 마주친 도전 ex 트러블 슈팅 */}
          <InputWrapper>
              <MainText>내가 마주친 도전</MainText>
              <ExText>이 프로젝트를 구축하는 동안 발생한 특정 버그,장애물에 대해 알려주세요. 어떻게 극복하셨나요? </ExText>
              <VitalInput2></VitalInput2>
          </InputWrapper>
        </ColumnWrapper>

    </VitalWrapper>

    {/* 선택항목 */}
    <ChoiceWrapper> 
      <VitalText>선택 항목</VitalText>
      <ColumnWrapper>
        {/* 데모 비디오 */}
          <InputWrapper>
              <MainText>데모 비디오</MainText>
              <ExText>프로젝트 기능을 데모하는 비디오에 링크를 추가하세요</ExText>
              <ChoiceInput type="text"></ChoiceInput>
          </InputWrapper>
        {/* 커버 이미지*/}
          <InputWrapper>
              <MainText>커버 이미지</MainText>
              <ExText>프로젝트를 보여줄 표지 이미지를 업로드해주세요</ExText>
              <ImageWrapper>
                <FileInput
                  type="file"
                  id="coverphotos"
                  multiple
                  onChange={handleCoverImageChange} 
                />
                <FileLabel
                  htmlFor="coverphotos"
                  style={{
                    backgroundImage: coverimagePreview ? `url(${coverimagePreview})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                > {!coverimagePreview && "+"}
                </FileLabel>
              </ImageWrapper>
          </InputWrapper>
        </ColumnWrapper>

        <ColumnWrapper>
        {/* 사진 */}
          <InputWrapper>
              <MainText>사진</MainText>
              <ExText>최대 4장의 사진을 업로드하여 프로젝트를 소개해주세요</ExText>
              <ImageWrapper>
            {photosPreview.map((preview, index) => (
              <FileLabel
                key={index}
                htmlFor={`photos-${index}`}
                style={{
                  backgroundImage: preview ? `url(${preview})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <FileInput type="file" id={`photos-${index}`} onChange={handlePhotosChange(index)} />
                {!preview && "+"}
              </FileLabel>
            ))}
          </ImageWrapper>
              
              {/* <ChoiceInput type="file"></ChoiceInput> */}
          </InputWrapper>
          {/* 로고 */}
          <InputWrapper>
              <MainText>로고</MainText>
              <ExText>프로젝트를 나타내는 로고를 업로드해주세요</ExText>
              <ImageWrapper>
                <FileInput
                  type="file"
                  id="Logo"
                  multiple
                  onChange={handleLogoChange} 
                />
                <FileLabel
                  htmlFor="Logo"
                  style={{
                    backgroundImage: LogoPreview ? `url(${LogoPreview})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                > {!LogoPreview && "+"}
                </FileLabel>
              </ImageWrapper>
          </InputWrapper>
        </ColumnWrapper>
        
    </ChoiceWrapper>

    </>
    );
};

export default CreatePortfolioInput;

//css Wrapper
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
const VitalInput2 = styled.textarea`
  border: 1px solid #d0d1d9;
  border-radius: 1em;
  outline: none;
  height: 6em;
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