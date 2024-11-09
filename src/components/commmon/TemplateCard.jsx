import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Logo from "../../assets/icons/Logo.png";
// 템플릿 카드 1개
//templateName, description, templateThumnail, templateButton을 props로!
const TemplateCard = ({
  templateName,
  description,
  templateThumnail,
  templateButton,
}) => {
  return (
    <Card>
      <ImageContainer>
        <Image src={Logo} alt="Template" />
      </ImageContainer>
      <TemplateName>{templateName}</TemplateName>
      <Description>{description}</Description>
      <Button
        onClick={() => {
          console.log("보기 버튼 클릭");
        }}
      >
        {templateButton}
      </Button>
    </Card>
  );
};

// TemplateCard의 프롭타입
TemplateCard.propTypes = {
  templateName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  templateThumnail: PropTypes.string.isRequired,
};

export default TemplateCard;

const Card = styled.div`
  position: relative;
  width: 20vw;
  height: 35vh; // 원래 17.625em
  background-color: #ffffff;
  border: 0.125em solid #d0d1d9;
  border-radius: 0.3125em;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  display: grid;
  grid-template-rows: 6fr 1.5fr 3fr 1.5fr;
  padding: 1em;
  box-sizing: border-box;
`;

const ImageContainer = styled.div`
  position: relative;
  //width: 18vw;
  //height: 26vh; // 원래 8.855em
  background-color: #f9f9f9;
  border: 0.0625em solid #d0d1d9;
  border-radius: 0.625em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%; // 원래 3.36em
  height: 2.58em;
  object-fit: contain;
`;

const TemplateName = styled.h3`
  margin-top: 0.5em; // 원래 1.25em
  margin-bottom: 0.5em;
  font-family: "Inria Sans", sans-serif;
  font-weight: 700;
  font-size: 1.2vw;
  line-height: 1.1875em;
  text-align: center;
  color: #000000;
`;

const Description = styled.div`
  font-family: "Inria Sans", sans-serif;
  font-weight: 300;
  font-size: 0.9vw;
  line-height: 1.0625em;
  text-align: center;
  color: #d0d1d9;
  width: 18vw;
  overflow: scroll;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button`
  margin-top: 1vh;
  //width: 11.523em;
  height: 4.5vh;
  background-color: #0a27a6;
  border-radius: 62.5em;
  border: none;
  color: #ffffff;
  font-family: "Inria Sans", sans-serif;
  font-weight: 700;
  font-size: 1em;
  line-height: 1.1875em;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #092091;
  }
`;
