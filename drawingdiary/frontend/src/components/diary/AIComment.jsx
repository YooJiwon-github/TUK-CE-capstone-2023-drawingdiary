import React from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import imageLodding from "../../animation/imageLodding.json";

const Container = styled.div`
    width: 370px;
    height: 200px;
    margin: 10px 0 5px 0;
    background-color: rgba(106, 156, 253, 0.3);
    border-radius: 10px;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
    overflow: hidden;
`;

const Comment = styled.div`
    width: 350px;
    height: 160px;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    padding: 10px;
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ddd;
        border-radius: 4px;
    }
`;

const AIComment = ({ text, isLoading }) => {
    const LoadingOptions = {
        loop: true,
        autoplay: true,
        animationData: imageLodding,
    };

    return(
        <div>
            <h4>AI의 코멘트</h4>
            <Container>
                {isLoading ? (
                    <Lottie
                        isClickToPauseDisabled
                        options={LoadingOptions}
                        height={100}
                        width={100}
                    />
                ) : text ? (
                    <Comment>{text}</Comment>
                ) : (
                    <Comment></Comment>
                )}
            </Container>
        </div>
    );
};

export default AIComment;