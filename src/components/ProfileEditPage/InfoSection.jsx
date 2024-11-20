import React from "react";
import styled from "styled-components";

const InfoSection = ({ label, value, button }) => {
  return (
    <>
      <InfoWrapper>
        <LabelWrapper>
          <Label>{label}</Label>
        </LabelWrapper>
        <ValueContainer>
          <ValueWrapper>
            <Value>{value}</Value>
          </ValueWrapper>
          <ButtonContainer>
            <ButtonWrapper>
              <Button>{button}</Button>
            </ButtonWrapper>
          </ButtonContainer>
        </ValueContainer>
      </InfoWrapper>
    </>
  );
};

export default InfoSection;

const ValueContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  min-width: 0px;
`;

const ButtonContainer = styled.button`
  position: relative;
  display: inline-block;
  width: auto;
  padding: 0px 1.125rem;
  appearance: none;
  text-align: left;
  text-decoration: none;
  line-height: 1;
  box-sizing: border-box;
  height: 2.25rem;

  border-radius: 0.5rem;
  font-family: "OTF R";
  font-weight: 600;

  font-size: 0.875rem;
  user-select: none;
  cursor: pointer;
  border: 0.0625rem solid rgb(206, 212, 218);
  background-color: rgb(255, 255, 255);
  color: rgb(33, 37, 41);
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  -webkit-box-align: center;
  align-items: center;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex: 0 0 140px;
  gap: 0.5rem;
  -webkit-box-align: center;
  align-items: center;
`;

const ValueWrapper = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 100%;
  overflow: visible;
  pointer-events: none;
`;

const Label = styled.div`
  flex: 0 0 auto;
`;

const Value = styled.p`
  //font-family: "OTF R";
  -webkit-tap-highlight-color: transparent;
  font-size: 1rem;
  text-decoration: none;
  color: rgb(33, 37, 41);
  font-weight: 600;
  line-height: 1.5;
  text-underline-position: under;
`;

const Button = styled.span`
  white-space: nowrap;
  height: 100%;
  overflow: hidden;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;
