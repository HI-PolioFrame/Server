import React from "react";
import styled from "styled-components";

import Business from "../assets/images/MemberSelectionPage/Business.png";
import General from "../assets/images/MemberSelectionPage/General.png";
import { Navigate, useNavigate} from "react-router-dom";

const MemberSelectionPage = () => {
    const navigate = useNavigate();
    const title1 = ["일반회원", "기업회원"];
    return (
        <>
        <Container>
            <MainText onClick={() => navigate("/")}>FolioFrame</MainText>
            <Button onClick={onClick}>
                <ImageWrapper>
                    <TextOverlay>
                        <MemberButton image={General} altText="일반회원" title="일반회원"  onClick={() => navigate("/SignUpPage2")}/>
                        <Image src={image} alt={altText} />
                        <Title>가입하기</Title>
                    </TextOverlay>

                    <TextOverlay>
                        <MemberButton image={General} altText="일반회원" title="기업회원"  onClick={() => navigate("/SignUpPage2")}/>
                        <Image src={image} alt={altText} />
                        <Title>가입하기</Title>
                    </TextOverlay>
                </ImageWrapper>
            </Button>
        </Container>
        </>

    );
};


export default MemberSelectionPage;

// CSS Wrapper
const Container = styled.div`
    background-color : #CFDDFB;
    width: 100%;
    height: 20em;
    margin : 0;
    padding : 0;
`;
const MainWrapper = styled.div`
    display: flex;
    gap: 2em;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width : 85%;
    padding: 40px 40px;
    margin: 0 auto; 
    
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

// CSS Buttons

const Button = styled.button`
    // margin-top : 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1em;
    border: 2px solid #0A27A6;
    background-color : #fff;
    cursor: pointer;
    width: 20em; 
    height: 27em;
`;

// CSS Images
const Image = styled.img`
    width: 70%;
    height: auto;
    border-radius: 1em;
    margin-top : 5em;
`;

// CSS Text
const TextOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
`;

const MainText = styled.p`
    font-family: "OTF B";
    font-weight: 700;
    font-size: 3em;
    color: #0A27A6;
    text-align: center;
    margin-top : 0em;
    cursor : pointer;
    padding : 2em 0 ;
`;
const Title = styled.p`
    // font-size: 1.5em;
    // font-weight: bold;
    // margin-bottom: 0.5em;
    // border: 0.1em solid #0A27A6; 
    // border-radius: 50%;
    // padding: 0.5em 2em;
    // color :  #0A27A6; 

    color : #0A27A6;
    font-size : 1em;
    font-weight : 800;
    // font-align : center;
    background-color: #fff;
    border : 1px solid #0A27A6;
    border-radius : 2em;
    height : 2em;
    width : 50%;
    margin-top : 15em;

    &:hover{
        border : 1px solid #0A27A6;

    button {
            background-color: #0A27A6;
            color: #fff;
        }
    }
`;

const ExplainText = styled.p`
    font-size: 1em;
    color: #0A27A6;
    margin-bottom: 0.5em;
    padding: 2em;
`;
