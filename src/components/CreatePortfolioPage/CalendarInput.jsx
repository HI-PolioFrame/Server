import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar.jsx';
// import { useDispatch } from 'react-redux';

const CalendarInput = () => {
        // state 관리
        const [recruitmentStartDate, setRecruitmentStartDate] = useState(null);
        const [recruitmentEndDate, setRecruitmentEndDate] = useState(null);
        // Button 활성화 상태 관리
        const [isRecruitmentActive, setIsRecruitmentActive] = useState(true);
        const [isStudyPeriodActive, setIsStudyPeriodActive] = useState(false);
    
        // Redux 관리
        // const dispatch = useDispatch();
    
        // 날짜 형식 함수
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
    
        // 모집 날짜 불러오기
        const handleRecruitStartDateChange = (date) => {
            if (isRecruitmentActive) {
                setRecruitmentStartDate(date);
            } else if (isStudyPeriodActive) {
                setStudyPeriodStartDate(date);
            }
            const formattedDate = formatDate(date);
            console.log('Start Date:', formattedDate);
            // dispatch(setRecruitStartDay(formattedDate));
        };
    
        const handleRecruitEndDateChange = (date) => {
            if (isRecruitmentActive) {
                setRecruitmentEndDate(date);
            } else if (isStudyPeriodActive) {
                setStudyPeriodEndDate(date);
            }
            const formattedDate = formatDate(date);
            console.log('End Date:', formattedDate);
            // dispatch(setRecruitEndDay(formattedDate));
        };

    
        return (
            <ComponentWrapper>
                {/* 캘린더 영역 */}
                {isRecruitmentActive && (
                    <Calendar
                        onStartDateChange={handleRecruitStartDateChange}
                        onEndDateChange={handleRecruitEndDateChange}
                    />
                )}
                <PeriodWrapper1>
                    <PeriodWrapper2>
                    <Text>시작</Text>
                    <Period>{recruitmentStartDate ? formatDate(recruitmentStartDate) : '--'}</Period>
                </PeriodWrapper2>
                <PeriodWrapper2>
                    <Text>끝</Text>
                    <Period>{recruitmentEndDate ? formatDate(recruitmentEndDate) : '--'}</Period>
                </PeriodWrapper2>
                </PeriodWrapper1>
                
                 
            </ComponentWrapper>
        );
    };

export default CalendarInput;


const ComponentWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap : 2em;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1em;
        padding-bottom: 1em;
    }
`;

const RightWrapper = styled.div`
    border-left: 1.2px solid #a2a3b2;
    width: 50%;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        margin-top: 2em;
        align-items: center;
        border: none;
        width: 100%;
    }
`;

const StyledContentWrapper = styled.div`
    margin: 0 0 3.5em 4em;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    color: #8e59ff;
    font-weight: 800;
`;

const RecruitButton = styled.div`
    margin: 1.2em 0;
    border-radius: 10px;
    width: 11em;
    height: 2.2308em;
    line-height: 2.2308em;
    text-align: center;
    background-color: ${(props) => (props.isActive ? '#8E59FF' : 'rgba(142,89,255,0.5)')};
    color: white;
    font-size: 0.8125em;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0.2em 1em rgba(22, 26, 63, 0.2);
    }
    transition: all 0.3s ease;
`;

const StudyButton = styled.div`
    margin: 1.2em 0;
    border-radius: 10px;
    width: 11em;
    height: 2.2308em;
    line-height: 2.2308em;
    text-align: center;
    background-color: ${(props) => (props.isActive ? '#8E59FF' : 'rgba(142,89,255,0.5)')};
    color: white;
    font-size: 0.8125em;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0.2em 1em rgba(22, 26, 63, 0.2);
    }
    transition: all 0.3s ease;
`;
const PeriodWrapper1 = styled.div`
    display: flex;
    align-items: center;
    flex-direction : column;
    gap : 1em;
    margin-bottom : 3em;

`;
const PeriodWrapper2 = styled.div`
    display: flex;
    align-items: center;
    flex-direction : row;

`;

const Text = styled.div`
    border: 1px solid #0A27A6;;
    border-radius: 10px;
    width: 5.0545em;
    height: 2.2054em;
    line-height: 2.2054em;
    text-align: center;
    color: #0A27A6;;
    font-size: 0.8125em;
    font-weight: bold;
`;

const Period = styled.div`
    margin: 0 0.2em;
    width: 8em;
    color: #161a3f;
    font-size: 0.8125em;
    font-weight: bold;
`;
