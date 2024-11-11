import React from "react";
import styled from "styled-components";

const StyledButton = ({ text, onClick }) => {
  return (
    <StyledButtonWrapper>
      <Button onClick={onClick}>{text}</Button>
    </StyledButtonWrapper>
  );
};

export default StyledButton;

const StyledButtonWrapper = styled.div`
  text-align: center;
  width: 5vw;
`;

const Button = styled.button`
  padding: 0.625em 0em;
  width: 100%;
  // 적용 버튼 높이 수정함 
  height : 2.4em;
  background-color: #0a27a6;
  color: white;
  border: none;
  border-radius: 0.4em;

  font-size: 1vw;
<<<<<<< HEAD
  
=======
  font-family: "OTF B";
  font-weight: 400;
>>>>>>> 68e514a0f7e4769f2900f6b30a8789ea0a6b2b81
  cursor: pointer;
  text-align: center;

  float: left;

  &:hover {
    background-color: #092091;
  }
`;
