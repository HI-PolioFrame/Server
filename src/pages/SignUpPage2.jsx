import React, {useState} from "react";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import Consent from "../components/Consent/Consent.jsx";
import Eye from "../assets/icons/Login/Eye.png";
import Eyeoff from "../assets/icons/Login/Eyeoff.png";
import { userInfo } from "../components/commmon/dummydata/userInfo.jsx";

//서버 연결
import {setId} from "../components/features/signUpDeveloper.jsx";
import {changedId} from "../components/features/signUpRecruiter.jsx";
import {setPhoneNumber} from "../components/features/signUpDeveloper.jsx";
import { setEmail } from "../components/features/signUpDeveloper.jsx";
import {isPassword} from "../components/features/signUpDeveloper.jsx";

const SignUpPage2 = () => {
    const navigate = useNavigate();
    
    //아이디 중복 확인
    const [idInput, setIdInput] = useState(''); // 입력된 아이디 상태
    const [idChecked, setIdChecked] = useState(false);
    //전화번호 중복 확인
    const [phone, setPhone] = useState('');
    const [phoneChecked, setPhoneChecked] = useState(false); 
    //비밀번호 확인
    const [eyeVisible, setEyeVisible] = useState(false);

    const toggleEyeVisible = () => {
        setEyeVisible(!eyeVisible);
    };

    const handleCheckBoxClick = () => {
        setIsModalOpen(true); // 체크박스 클릭 시 팝업 열기
    };
    const autoHyphen = (value) => {
        // 숫자만 남기고 하이픈 추가
        const cleanedValue = value.replace(/[^0-9]/g, '');
        const formattedValue = cleanedValue
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
            .replace(/(\-{1,2})$/, ''); // 연속된 하이픈 제거
        return formattedValue;
    };
    
    //아이디 중복 부분
    const handleIdInputChange = (e) => {
        setIdInput(e.target.value);
        changedId(); 
    };

    const handleIdCheck = () => {
        const isValid = setId(idInput);
        if (isValid) {
            setIdChecked(true); 
        } else {
            changedId(); 
        }
    };
   
    // 전화번호 인증 부분
    const handlePhoneChange = (event) => {
        const { value } = event.target;
        setPhone(autoHyphen(value));
        changedPhoneNumber();
        // setPhoneChecked(false); 
    };
    const handlePhoneCheck = () => {
        const isValid = setPhoneNumber(phone);
        // setPhoneChecked(isValid);
        if (isValid) {
            setPhoneChecked(true); 
        } else {
            changedPhoneNumber(); 
        }
    };


    return (
        <LoginWrapper>
            <MainText onClick={() => navigate("/")}>FolioFrame</MainText>
            <JoinWrapper>
                <ColumnWrapper1>
                    <NameInput placeholder="이름" type="text"></NameInput>
                    <ColumnWrapper2>
                        <CalendarText>생년월일</CalendarText>
                        <CalendarInput type="date"></CalendarInput>
                    </ColumnWrapper2>
                </ColumnWrapper1>
                <RowWrapper>
                    <IdInput 
                         placeholder="아이디 : 영소문, 숫자, _, .로 이루어진 6~20자" 
                         type="text" 
                         value={idInput} 
                         onChange={handleIdInputChange} 
                    />
                    <IDcheckWrapper>
                        <IDcheckInput 
                             type="checkbox" 
                             id="IDcheck" 
                             onClick={handleIdCheck}
                             checked={idChecked} 
                        />
                        <label htmlFor="IDcheck">중복확인</label>
                    </IDcheckWrapper>
                </RowWrapper>   
                <PassWrapper>
                    <PassInput
                        type={eyeVisible ? "text" : "password"}
                        placeholder="비밀번호"
                    />
                    <EyeIcon
                        src={eyeVisible ? Eyeoff : Eye}
                        alt="eye"
                        onClick={toggleEyeVisible}
                    />
                </PassWrapper>
                <PassWrapper>
                    <PassInput
                        type={eyeVisible ? "text" : "password"}
                        placeholder="비밀번호 확인"
                    />
                    <EyeIcon
                        src={eyeVisible ? Eyeoff : Eye}
                        alt="eye"
                        onClick={toggleEyeVisible}
                    />
                </PassWrapper>
                <RowWrapper>
                    <TelInput 
                            type="tel"
                            maxLength="13"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="휴대폰 번호"
                            id="tel"
                            autoComplete="off"
                            name="users_phone"
                    />
                    <PhonecheckWrapper>
                        <PhonecheckInput 
                                type="checkbox" 
                                id="Phonecheck" 
                                onClick={handlePhoneCheck} 
                                checked={phoneChecked} 
                            />
                            <label htmlFor="Phonecheck">중복확인</label>
                        </PhonecheckWrapper>
                </RowWrapper>                
            </JoinWrapper>
            <LoginButton>시작하기</LoginButton>
            <MemberWrapper>
                <Text>이미 회원이신가요? |</Text>
                <JoinButton onClick={() => navigate("../LoginPage")}>로그인</JoinButton>
            </MemberWrapper>

        </LoginWrapper>
    );
};

export default SignUpPage2;

//css Wrapper
const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width : 85%;
    padding: 40px 40px;
    margin: 0 auto; 
`;

const JoinWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap : 1em;
`;

const MemberWrapper = styled.div`
    display: flex;
    gap : 1em;
    margin-top : -2em;
`;

const ColumnWrapper1 = styled.div`
    display : flex;
    gap : 1em;
`;

const ColumnWrapper2 = styled.div`
    display : flex;
    gap : 0.5em;
`;

const IDcheckWrapper = styled.div`
  display: flex;
  align-items: center;

`;
const PhonecheckWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const PassWrapper = styled.div`
    position: relative;
    width: 100%;
   
`;
const RowWrapper = styled.div`
    display: flex;
    flex-direction: column;  
    width : 100%;
    gap: 0.5em;   
`;
//css input
const NameInput = styled.input`
    border-radius : 2em;
    border : 1px solid #D0D1D9;
    height : 3em;
    width : 40%;
    text-indent: 1em; 
    outline : none;
    &::placeholder {
        text-indent: 1em; 
        color : #D0D1D9;
    }

`;

const TelInput = styled.input`
    border-radius : 2em;
    border : 1px solid #D0D1D9;
    height : 3em;
    width : 100%;
    text-indent: 1em; 
    outline : none;
    &::placeholder {
    text-indent: 1em; 
    color : #D0D1D9;
    }

`;

const CalendarInput = styled.input`
    border: none;
    outline: none;
    height: 2em;
    padding: 0.5em;
    font-size: 1em;
    color: #D0D1D9;
    border: 1px solid #D0D1D9;
    border-radius: 4px;
    margin-right : -2em;
`;
const PassInput = styled.input`
    border-radius : 2em;
    border : 1px solid #D0D1D9;
    height : 3em;
    width : 90%;  
    text-indent: 1em; 
    padding-right: 2.5em; 
    outline : none;
    &::placeholder {
        text-indent: 1em; 
        color : #D0D1D9;
    }
    &::-ms-reveal {
        display: none;
    }

`;
const IdInput = styled.input`
    border-radius : 2em;
    border : 1px solid #D0D1D9;
    height : 3em;
    width : 100%;
    text-indent: 1em; 
    outline : none;
    &::placeholder {
    text-indent: 1em;
    color : #D0D1D9;
    }

`;
const IDcheckInput = styled.input`
    border: 1px solid #D0D1D9;
`;
const PhonecheckInput = styled.input`
    border: 1px solid #D0D1D9;
`;
//css button
const LoginButton = styled.button`
    color : #fff;
    font-size : 1em;
    font-weight : 800;

    border-radius : 2em;
    border : none;
    background-color : #0A27A6;
    height : 3em;
    width : 20%;

    margin : 2em 0;
`;

const JoinButton = styled.button`
    color : #D0D1D9;
    font-size: 1em;
    font-weight: 500;
    border : none;
    background-color : transparent;
`;


//css text
const MainText = styled.p`
    color : #0A27A6;
    font-size: 3em;
    font-weight: 700;
    font-family: "OTF B";
    cursor : pointer;
`;

const Text = styled.p`
    color : #D0D1D9;
    font-size: 1em;
    font-weight: 500;
`;

const CalendarText =  styled.p`
    color : #D0D1D9;
    font-size: .8em;
    font-weight: 500;
    margin-top : 1em;
`;


const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 2em;
    border-radius: 8px;
    text-align: center;
    width: 80%;
    max-width: 500px;
`;


const EyeIcon = styled.img`
    position: absolute;
    right: 1em; 
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width : 1.2em;
    height : 1.2em;
`;