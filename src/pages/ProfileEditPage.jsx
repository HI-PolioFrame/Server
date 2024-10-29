import React, { useState } from "react";
import styled from "styled-components";
import StyledButton from "../components/commmon/StyledButton";
//기능구현에서 만든 저장, 변경, 삭제 함수 import 하기.

const ProfileEditUI = ({}) => {
  const [name, setName] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [email, setEmail] = useState(null);
  const [deleteChecked, setDeleteChecked] = useState(false);

  return (
    <ProfileEditContainer>
      <Section>
        <LabelWrapper>
          <Label>계정 정보</Label>
        </LabelWrapper>

        <InputButtonContainer>
          <NameInputContainer>
            <TextInputWrapper>
              <Text>닉네임</Text>
              <InputWrapper>
                <Input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </InputWrapper>
            </TextInputWrapper>

            <TextInputWrapper>
              <Text>이름</Text>
              <InputWrapper>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputWrapper>
            </TextInputWrapper>
          </NameInputContainer>

          <StyledButtonContainer>
            <StyledButton
              text={"저장"}
              onClick={() => console.log(name, nickname)}
              // handleSave(name, nickname) <-- 기능구현에서 만들어줄 함수!! 이름과 닉네임을 변경하는 함수. 필요한 파라메터는 알려주면 수정 예정
            />
          </StyledButtonContainer>
        </InputButtonContainer>
      </Section>

      <Line></Line>

      <Section>
        <LabelWrapper>
          <Label>이메일</Label>
        </LabelWrapper>

        <InputButtonContainer>
          <EmailInputContainer>
            <Text>이메일</Text>
            <InputWrapper>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputWrapper>
          </EmailInputContainer>

          <StyledButtonContainer>
            <StyledButton
              text={"변경"}
              onClick={() => console.log(email)}
              //handleEmailChange(email) <-- 기능구현에서 만들어줄 함수!! 이메일을 변경하는 함수. 필요한 파라메터는 알려주면 수정 예정
            />
          </StyledButtonContainer>
        </InputButtonContainer>
      </Section>

      <Line></Line>

      <Section>
        <LabelWrapper>
          <DeleteLabel>계정 삭제</DeleteLabel>
        </LabelWrapper>

        <InputButtonContainer>
          <DiscriptionWrapper>
            <DeleteDiscription>
              이는 영구적인 조치이며 되돌릴 수 없습니다. <br /> 계정을 삭제한
              후에는 계정을 복구할 수 없습니다.
            </DeleteDiscription>
          </DiscriptionWrapper>
          <DeleteAgreeWrapper>
            <Checkbox
              type="checkbox"
              checked={deleteChecked} // deleteChecked가 true이면 체크가 되어 있고, false이면 체크가 해제
              onChange={() => setDeleteChecked(!deleteChecked)} // 체크박스 클릭 시, 원래 상태의 반대로 토글. true -> false, false -> true
            />
            <DeleteDiscription>이에 동의합니다.</DeleteDiscription>
            <DeleteButtonWrapper>
              <DeleteButton
                disabled={!deleteChecked} // deleteChecked가 false일 때 버튼은 눌리지 않도록 설정
                onClick={() => console.log(deleteChecked)}
                //handleDeleteAccount <-- 기능구현에서 만들어줄 함수!! 계정을 삭제하는 함수. 필요한 파라메터는 알려주면 수정 예정
              >
                계정 삭제
              </DeleteButton>
            </DeleteButtonWrapper>
          </DeleteAgreeWrapper>
        </InputButtonContainer>
      </Section>
    </ProfileEditContainer>
  );
};

export default ProfileEditUI;

// Styled Components
const ProfileEditContainer = styled.div`
  width: 85%; //수정중...
  margin: 0 auto;

  // display: grid;
  // grid-template-rows: repeat(5, 1fr);
`;

const Section = styled.div`
  //height: 20vh;

  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const LabelWrapper = styled.div``;

const Label = styled.h3`
  font-size: 24px;
`;

const InputButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1vw;

  border: 1px solid #c8c8c8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.4em;
`;

const NameInputContainer = styled.div`
  display: grid;
  //flex-direction: column;
  grid-template-columns: 1fr 1fr;
  margin: 1vw 0;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1vw;
`;

const TextInputWrapper = styled.div`
  display: grid;
  //flex-direction: column;
  grid-template-rows: 1fr 1fr;

  margin-left: 0.5vw;
`;

const Text = styled.div`
  display: flex;
  align-items: center;

  font-family: "Inria Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 1.3vw;
  margin: 0;
  color: #919194;
`;

const Input = styled.input`
  margin-right: 0.5vw;
  padding: 5px;
  width: 22vw;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const EmailInputContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;

  margin-left: 0.5vw;
`;

const DeleteLabel = styled(Label)`
  color: #e72525;
`;

const DiscriptionWrapper = styled.div`
  display: flex;
  align-items: center;

  //margin-left: 0.5vw;
`;

const DeleteAgreeWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-left: 0.5vw;
  margin-right: 0.5vw;
`;

const Checkbox = styled.input``;

const DeleteDiscription = styled.p`
  flex: 1;
  margin-left: 0.5vw;
  font-size: 1vw;
`;

const DeleteButtonWrapper = styled.div`
  display: inline-block;
  width: 5vw;
`;

const DeleteButton = styled.button`
  padding: 0.625em 0em;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#e72525")};
  color: white;
  border: none;
  border-radius: 0.4em;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 100%;

  font-size: 1vw;
`;

const Line = styled.hr`
  margin: 2vw 0;
  border: 1px solid #d0d1d9;
`;