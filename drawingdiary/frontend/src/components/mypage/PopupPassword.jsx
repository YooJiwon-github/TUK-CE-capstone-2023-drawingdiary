import axios from "axios";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useAuth } from "../../auth/context/AuthContext";

// 팝업창
const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1); /* 어두운 배경 색상 */
  z-index: 99; /* 모달보다 낮은 z-index를 설정하여 모달 위로 올라오도록 함 */
`;

const PopupBox = styled.div`
  width: 600px;
  height: 500px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
  box-sizing: border-box;
`;

// 팝업창 상단
const PopupTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 7%;
`;

const PopupTopText = styled.div`
  font-size: 20px;
`;

const PopupTopCloseBtn = styled.button`
  border: none;
  font-size: 20px;
  cursor: pointer;
  background-color: white;
`;

// 팝업창 하단 - 수정 버튼
const PopupBottom = styled.div`
  width: 100%;
  height: 13%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const jumpAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const PopupBottomCheckBtn = styled.button`
  width: 200px;
  height: 50px;
  background-color: rgba(106, 156, 253, 0.3);
  box-shadow: 1px 5px 2px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  border: none;
  cursor: pointer;
  color: black;
  font-size: 20px;
  font-weight: bold;
  &:hover {
    animation: ${jumpAnimation} 0.5s ease;
  }
`;

// 팝업창 중단
const PopupBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  padding: 10px 0;
`;

const PopupTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 20px;
`;

const PopupText = styled.div`
  font-size: 15px;
  color: #a3a3a3;
  padding-top: 5px;
`;

const PopupInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 13px;
  border: 2px solid rgba(106, 156, 253, 0.4);
  padding-left: 10px;
`;

const PopupInputBox = styled.div`
  width: 300px;
  height: 50px;
  padding-top: 60px;
`;

function PopupPassword({ onClose, onPopup }) {
  const { getToken } = useAuth();
  const accessToken = getToken();
  const setName = localStorage.getItem("setName");
  const [oldPassword, setOldPassword] = useState("");

  const handleCheck = async () => {
    console.log(oldPassword);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/password",
        {
          oldPassword: oldPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("response: ", response);
      alert("인증되었습니다!");
      onClose();
      onPopup();
    } catch (error) {
      alert("비밀번호가 일치하지 않습니다!");
    }
  };

  return (
    <>
      <BackgroundOverlay />
      <PopupBox>
        <PopupTop>
          <PopupTopText></PopupTopText>
          <PopupTopCloseBtn onClick={onClose}>X</PopupTopCloseBtn>
        </PopupTop>
        <PopupBody>
          <PopupTitle>비밀번호 확인</PopupTitle>
          <PopupText>{setName}님의 회원정보를 안전하게 보호하기 위해</PopupText>
          <PopupText>비밀번호를 한 번 더 확인해주세요.</PopupText>
          <PopupInputBox>
            <PopupInput
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="비밀번호 확인"
            />
          </PopupInputBox>
        </PopupBody>
        <PopupBottom>
          <PopupBottomCheckBtn onClick={handleCheck}>확인</PopupBottomCheckBtn>
        </PopupBottom>
      </PopupBox>
    </>
  );
}

export default PopupPassword;
