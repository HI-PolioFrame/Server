import React, {useState} from "react";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import Consent from "../components/Consent/Consent.jsx";
import Eye from "../assets/icons/Login/Eye.png";
import Eyeoff from "../assets/icons/Login/Eyeoff.png";
import { userInfo } from "../components/commmon/dummydata/userInfo.jsx";

// 서버 연결
import {setEmail} from "../components/features/signUpRecruiter.jsx";
import {changedEmail} from "../components/features/signUpRecruiter.jsx";
import {setPhoneNumber} from "../components/features/signUpRecruiter.jsx";
import {changedPhoneNumber} from "../components/features/signUpRecruiter.jsx";

const SignUpRecruiterEmailPage= () => {
    const navigate = useNavigate();
    const [eyeVisible, setEyeVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 
     //이메일 중복 확인
     const [emailInput, setemailInput] = useState('');
     const [emailCheck, setemailCheck] = useState(false);
    //전화번호 중복 확인
    const [phone, setPhone] = useState('');
    const [phoneChecked, setPhoneChecked] = useState(false); 
    //회사인증
    const [company, setCompany] = useState('');
    const [companyChecked, setcompanyChecked] = useState(false);

    const toggleEyeVisible = () => {
        setEyeVisible(!eyeVisible);
    };
    const handleCheckBoxClick = () => {
        setIsModalOpen(true); // 체크박스 클릭 시 팝업 열기
    };
    const closeModal = () => {
        setIsModalOpen(false); // 팝업 닫기
    };

    const autoHyphen = (value) => {
        // 숫자만 남기고 하이픈 추가
        const cleanedValue = value.replace(/[^0-9]/g, '');
        const formattedValue = cleanedValue
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
            .replace(/(\-{1,2})$/, ''); // 연속된 하이픈 제거
        return formattedValue;
    };
    
     //이메일 중복 부분  
     const handleEmailInputChange = (e) => {
        setemailInput(e.target.value);
        setemailCheck(false);
        changedEmail(); 
    };
    
    const handleEmailCheck = () => {
        const isValid = setEmail(emailInput);
        if (isValid) {
            setemailCheck(true); 
        } else {
            setemailCheck(false);
            changedEmail(); 
        }
    };
    
   
    // 전화번호 인증 부분
    const handlePhoneChange = (event) => {
        const { value } = event.target;
        setPhone(autoHyphen(value));
        setPhoneChecked(false);
        changedPhoneNumber();
    };
    const handlePhoneCheck = () => {
        const isValid = setPhoneNumber(phone);
        // setPhoneChecked(isValid);
        if (isValid) {
            setPhoneChecked(true); 
        } else {
            setPhoneChecked(false);
            changedPhoneNumber(); 
        }
    };

    // 회사인증 부분
    const handleCompanyChange = (e) => {
        setCompany(e.target.value);
        setcompanyChecked(false); 
    };
    const handleCompanyCheck = () => {
        const isValid = setCompany(company);
        setcompanyChecked(isValid);
    };
    
    
    return (
        <LoginWrapper>
            <MainText onClick={() => navigate("/")}>FolioFrame</MainText>
            <JoinWrapper>
                {/* 이름, 생년월일 */}
                <ColumnWrapper1>
                    <NameInput placeholder="이름" type="text"></NameInput>
                    <ColumnWrapper2>
                        <CalendarText>생년월일</CalendarText>
                        <CalendarInput type="date"></CalendarInput>
                    </ColumnWrapper2>
                </ColumnWrapper1>

                {/* 아이디, 비밀번호, 비밀번호 확인 */}
                <RowWrapper>
                    <EmailInput 
                         placeholder="이메일을 입력해주세요" 
                         type="email" 
                         value={emailInput} 
                         onChange={handleEmailInputChange} 
                    />
                    <EmailcheckWrapper>
                        <EmailcheckInput 
                             type="checkbox" 
                             id="IDcheck" 
                             onClick={handleEmailCheck}
                             checked={emailCheck} 
                        />
                        <label htmlFor="IDcheck">중복확인</label>
                    </EmailcheckWrapper>
                </RowWrapper>
                    <PassWrapper>
                        <PassInput
                            type={eyeVisible ? "text" : "password"}
                            placeholder="비밀번호 : 영문, 숫자, 특수문자 포함 12~20자"
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
              
                {/* 전화번호  */}
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

                {/* 회사인증 */}
                <RowWrapper>
                    <CertificInput placeholder="회사인증" type="email" onChange={handleCompanyChange}></CertificInput>
                </RowWrapper>
                    <CheckBoxWrapper>
                            <CompanyCheckInput type="checkbox" id="company" onClick={handleCompanyCheck} />
                            <label htmlFor="company">회사인증</label>

                            <CheckBoxInput type="checkbox" id="Join" onClick={handleCheckBoxClick} />
                            <label htmlFor="Join">가입 기본약관</label>
                    </CheckBoxWrapper>
            </JoinWrapper>

            <LoginButton>시작하기</LoginButton>
            <MemberWrapper>
                <Text>이미 회원이신가요? |</Text>
                <JoinButton onClick={() => navigate("../LoginPage")}>로그인</JoinButton>
            </MemberWrapper>
            <JoinButton onClick={() => navigate("/SignUpRecruiterPage")}>이메일로 회원가입하기</JoinButton>

            {/* 팝업창 */}
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                       <Consent/>
                    </ModalContent>
                </ModalOverlay>
            )}
        </LoginWrapper>
    );
};

export default SignUpRecruiterEmailPage;

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
    // align-items: center;
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

const RowWrapper = styled.div`
    display: flex;
    flex-direction: column;  
    width : 100%;
    gap: 0.5em;   
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top:-0.5em;
`;

const EmailcheckWrapper = styled.div`
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

const CertificInput = styled.input`
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
    width : 100%;
    text-indent: 1em; 
    outline : none;

    &::placeholder {
        text-indent: 1em; 
        color : #D0D1D9;
    }
    &::-ms-reveal {
        display: none;
    }
}

`;
const EmailInput = styled.input`
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
const CheckBoxInput = styled.input`
    border: 1px solid #D0D1D9;
    margin-left :2em; 
`;
const EmailcheckInput = styled.input`
    border: 1px solid #D0D1D9;
`;
const PhonecheckInput = styled.input`
    border: 1px solid #D0D1D9;
`;
const CompanyCheckInput = styled.input`
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
    width: 15em;
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

const CloseButton = styled.button`
    margin-top: 1em;
    padding: 0.5em 1em;
    background: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
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