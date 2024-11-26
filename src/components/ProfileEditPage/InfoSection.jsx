import React, { useState } from "react";
import styled from "styled-components";

const InfoSection = ({ label, value, isButton = true, button, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isModified, setIsModified] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsModified(false); // 편집 시작 시 상태 초기화
  };

  const handleCancelClick = () => {
    setInputValue(value);
    setIsEditing(false);
    setIsModified(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsModified(e.target.value !== value); // 기존 값과 다른 경우에만 수정 상태 활성화
  };

  const handleSaveClick = () => {
    if (isModified && inputValue.trim()) {
      onSave(inputValue.trim()); // 부모 컴포넌트로 변경된 값 전달
    }
    setIsEditing(false);
    setIsModified(false);
  };

  return (
    <>
      <InfoWrapper>
        <LabelWrapper>
          <Label>{label}</Label>
        </LabelWrapper>
        <ValueContainer>
          <ValueWrapper>
            {isEditing ? (
              <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
            ) : (
              <Value>{value}</Value>
            )}
          </ValueWrapper>
          {isButton && (
            <ButtonContainer>
              <ButtonWrapper>
                {isEditing ? (
                  <>
                    <Button onClick={handleCancelClick}>취소</Button>
                    <Button
                      onClick={handleSaveClick}
                      disabled={!isModified} // 변경 사항이 없을 경우 비활성화
                    >
                      저장
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleEditClick}>{button}</Button>
                )}
              </ButtonWrapper>
            </ButtonContainer>
          )}
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
