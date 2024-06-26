import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AlbumCategory from "../components/album/AlbumCategory";
import AIComment from "../components/diary/AIComment";
import EditDiary from "../components/diary/EditDiary";
import GeneratedImage from "../components/diary/GeneratedImage";
import ImageOption from "../components/diary/ImageOption";
import Sentiment from "../components/sentiment/Sentiment";
import Weather from "../components/weather/Weather";
import Background2 from "../components/Background/index2";
import NavBar from "../components/sidebar/NavBar";
import { IoIosSend } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { useAuth } from "../auth/context/AuthContext";

const Container = styled.body`
  width: 100%;
  height: 900px;
  display: flex;
  flex-direction: column;
`;

const DiaryContainer = styled.section`
  display: flex;
  flex-direction: row;
  margin: auto;
`;

const LeftContainer = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LeftTopContent = styled.div`
  height: 40px;
  margin-top: 60px;
  padding-bottom: 10px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftMidContent = styled.div`
  height: 450px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin: 0 10px;
`;

const LeftBottomContent = styled.div`
  height: 300px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const RightContainer = styled.section`
  width: 50%;
`;

const RightTopContent = styled.div`
  height: 30px;
  margin-top: 20px;
  padding-right: 44px;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const RightMidContent = styled.div`
  height: 700px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 6px;
`;

const RightBottomContent = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 10px;
  margin: 0 10px;
`;

const SaveBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  background-color: white;
`;

const Area = styled.div`
    width: 405px;
    height: 400px;
    padding: 0 auto;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    margin: 10px;
`;

function DiaryPage() {
  const navigate = useNavigate();

  const { getToken } = useAuth();
  const accessToken = getToken();

  // loading
  const [isRecommenderLoading, setIsRecommenderLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  // image
  const [newImageUrl, setNewImageUrl] = useState("");
  const [diaryText, setDiaryText] = useState("");
  const [parentSelectedButtonStyle, setParentSelectedButtonStyle] = useState(false);

  // 날짜, 날씨
  const location = useLocation();
  const { date } = location.state || {}; // 날짜 정보 수신
  const [weatherState, setWeatherState] = useState("Unknown");

  // 앨범
  const [selectedAlbumID, setSelectedAlbumID] = useState(null);

  const [isTextValid, setIsTextValid] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const [positiveValue, setPositiveValue] = useState(0);
  const [negativeValue, setNegativeValue] = useState(0);
  const [neutralValue, setNeutralValue] = useState(0);

  const [commentText, setCommentText] = useState("");

  const [createBtn, setCreateBtn] = useState(false);

  // 날씨 상태를 업데이트하는 함수
  const handleWeatherStateChange = (newWeatherState) => {
    setWeatherState(newWeatherState);
  };

  // 앨범 상태를 업데이트하는 함수
  const handleSelectedAlbumChange = (onSelectAlbum) => {
    setSelectedAlbumID(onSelectAlbum);
  };

  // 감정 분석 함수
  const analyzeSentiment = async () => {
    try {
      // 서버 프록시 엔드포인트로 요청 전송
      const response = await axios.post("/api/sentiment", {
        content: diaryText,
      });

      const { positive, negative, neutral } = response.data.document.confidence;

      // 소수점 두 자리까지 반올림하여 상태 업데이트 -- 어떤 값이 가장 큰지 비교해야 함
      setPositiveValue(Math.round(positive * 100) / 100);
      setNegativeValue(Math.round(negative * 100) / 100);
      setNeutralValue(Math.round(neutral * 100) / 100);

      // 감정 분석 결과를 일기 내용에 반영시키는 부분

      const maxSentimentValue = response.data.document.sentiment;

      if (maxSentimentValue === "positive") {
        return "따듯한 색감";
      } else if (maxSentimentValue === "negative") {
        return "차가운 색감";
      } else if (maxSentimentValue === "neutral") {
        return "베이지 색감";
      }
    } catch (error) {
      console.error("감정 분석 API 호출 중 오류 발생: ", error);
    }
  };

  const handleOptionSelect = (isSelected, storedSelectedStyle) => {
    setIsOptionSelected(isSelected);
    if (storedSelectedStyle === undefined && isSelected === true) {
    } else {
      setParentSelectedButtonStyle(storedSelectedStyle);
    }
  };

  useEffect(() => {
  }, [parentSelectedButtonStyle]);

  // Sentiment에 텍스트 전달
  const handleDiaryTextChange = (newText) => {
    setIsTextValid(newText.length >= 30);
    setDiaryText(newText);
  };

  useEffect(() => {
    if (createBtn) {
      analyzeSentiment();
    }
  }, [createBtn, diaryText]);

  // 생성 버튼 클릭 핸들러
  const handleCreate = async () => {

    if (parentSelectedButtonStyle) {
      setCreateBtn(true);
      setIsImageLoading(true);
      setIsCommentLoading(true);

      try {
        // 감정 분석 결과를 받아오기
        const newDiaryTextResult = await analyzeSentiment();

        const resultDiaryText = `${diaryText} ${parentSelectedButtonStyle} 그림체 ${newDiaryTextResult}`;

        if (diaryText !== "") {
          const imageApiUrl = "http://127.0.0.1:5000/api/diary/image";
          const responseDiary = await fetch(imageApiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ resultDiaryText }),
          });

          if (responseDiary.ok) {
            const responseDate = await responseDiary.json();

            // url 받아오기
            const imageUrl = responseDate.image?.imageUrl;
            setIsImageLoading(false);
            setNewImageUrl(imageUrl);
          } else {
            console.error("이미지 저장 실패:", responseDiary.status);
            alert("이미지 저장에 실패하였습니다.");
          }

          const responseComment = await fetch(
            "http://127.0.0.1:5000/api/diary/comment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ diaryText }),
            }
          );

          if (responseComment.ok) {
            const comment = await responseComment.json();
            setIsCommentLoading(false);
            setCommentText(comment.comment);
          } else {
            console.error("코멘트 불러오기 실패: ", responseComment);
          }
        } else {
          alert("일기를 먼저 작성해주세요!");
        }
      } catch (error) {
        console.error("Error diary:", error);
        alert("일기 중에 오류가 발생하였습니다.");
      }
    } else {
      alert("이미지 스타일 먼저 생성해주세요!");
    }
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = async () => {

    // 날짜 데이터
    const formattedDate = new Date(date.currentYear, date.month - 1, date.day);

    // 날짜 및 월을 두 자릿수로 표시하는 함수
    const pad = (number) => (number < 10 ? `0${number}` : number);

    // "xxxx-xx-xx" 형식으로 날짜 문자열 생성
    const dateString = `${formattedDate.getFullYear()}-${pad(
      formattedDate.getMonth() + 1
    )}-${pad(formattedDate.getDate())}`;

    //image post
    if (newImageUrl) {
      const responseDiary = await axios.post(
        "http://localhost:8080/api/diary/add",
        {
          text: diaryText,
          weather: weatherState,
          date: dateString,
          albumID: selectedAlbumID,
          styleName: parentSelectedButtonStyle,
          imageFile: newImageUrl,
          confidence: {
            positive: positiveValue,
            negative: negativeValue,
            neutral: neutralValue,
          },
          comment: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (responseDiary.status === 200) {
        alert("일기가 생성되었어요!");
        navigate("/");
      } else {
        console.error("일기 전송 실패:", responseDiary.status);
      }
    } else {
      alert("이미지를 먼저 생성해주세요!");
    }
  };

  return (
    <div>
      <Background2>
        <Container>
          <DiaryContainer>
            <LeftContainer>
              <LeftTopContent>
                <Weather
                  date={date}
                  onWeatherStateChange={handleWeatherStateChange}
                />
                <AlbumCategory onSelectAlbum={handleSelectedAlbumChange} />
              </LeftTopContent>
              <LeftMidContent>
                <ImageOption
                  onOptionSelect={handleOptionSelect}
                  isRecommenderLoading={isRecommenderLoading}
                />
                <Area>
                  <EditDiary onDiaryTextChange={handleDiaryTextChange} />
                  <IoIosSend size={28} color="rgba(106, 156, 253, 0.8)" onClick={handleCreate} style={{cursor: 'pointer', marginLeft: '10px', marginTop: '16px'}} />
                </Area>
              </LeftMidContent>
              <LeftBottomContent>
                <RightBottomContent>
                  <AIComment text={commentText} isLoading={isCommentLoading} />
                  <Sentiment
                      positiveValue={positiveValue}
                      negativeValue={negativeValue}
                      neutralValue={neutralValue}
                  />
                </RightBottomContent>
              </LeftBottomContent>
            </LeftContainer>

            <RightContainer>
              <NavBar />
              <RightTopContent>
                <SaveBtn onClick={handleSave}>
                  저장하기
                  <FaRegCheckCircle size={18} color="#3d3d3d" style={{marginLeft: '10px'}} />
                </SaveBtn>
              </RightTopContent>
              <RightMidContent>
                <GeneratedImage
                  isLoading={isImageLoading}
                  newImageUrl={newImageUrl}
                />
              </RightMidContent>
            </RightContainer>
          </DiaryContainer>
        </Container>
      </Background2>
    </div>
  );
}

export default DiaryPage;
