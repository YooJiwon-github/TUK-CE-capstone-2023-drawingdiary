import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCategory } from "./CategoryList";
import Modal from "./Modal";
import axios from "axios";
import { useAuth } from "../../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CgTrash } from "react-icons/cg";

const Container = styled.section`
    width: 95%;
    height: 90%;
    margin: auto;
`;

const AlbumContainer = styled.div`
    width: 100%;
    height: 230px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
`;

const ScrollSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
        height: 2px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
    }
`;

const PictureContainer = styled.div`
    min-width: 190px;
    height: 230px;
    margin: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    
    &:hover {
        img {
            transform: scale(1.05);
        }
    }
`;

const DateText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    border-radius: 10px;

    img {
        width: 200px;
        height: 200px;
        border-radius: 10px;
        margin: 5px;
        transition: transform 0.2s ease;
    }
`;

const AlbumHeaders = styled.div`
    width: 100%;
    height: 30px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const CategoryName = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

function AlbumBox({ onErrorMessage }) {
    const {  removeCategory } = useCategory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [data, setData] = useState([]);

    const navigate = useNavigate();
    const [checkList, setCheckList] = useState(false);

    const { memberID, getToken } = useAuth();
    const accessToken = getToken();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchAlbum = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/album/all', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            
            const newData = response.data.map(entry => ({
                albumID: entry.albumID,
                name: entry.name,
                images: entry.images.map(img => ({
                    date: img.date,
                    imageFile: img.imageFile
                }))
            }));
            setData(newData);
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const showDetails = async (selectedDate) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/diary/${selectedDate}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const dataArray = response.data;

            const diaryText = dataArray.text;
            const weather = dataArray.weather;
            const albumName = dataArray.albumName;
            const formattedDate = dataArray.date.split("-");
            const currentYear = formattedDate[0];
            const month = formattedDate[1];
            const day = formattedDate[2];
            const image = dataArray.imageURL;
            const comment = dataArray.comment;
            const style = dataArray.styleName;
            const sentiment = dataArray.sentiment;

            navigate(`/showDiary/${memberID}/${currentYear}${month}${day}`, {
                state: { date: { currentYear, month, day }, diaryData: { weather, albumName, diaryText, style, image, comment, sentiment } },
            });
        } catch(error) {
            console.log("error: ", error);
        }
    };

    const handleShowDetails = (selectedDate) => {
        showDetails(selectedDate);
    }

    const handleDeleteClick = (category) => {
        setIsModalOpen(true);
        setCurrentCategory(category);
        console.log("category: ", category);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    const handleConfirmDelete = async () => {
        setIsModalOpen(false);
        removeCategory(currentCategory, onErrorMessage);
    };

    useEffect(() => {
        if(!checkList) {
            fetchAlbum();
            setCheckList(!checkList);
        }
    }, [fetchAlbum, checkList]);
    
    return (
        <Container>
            {data.map((categoryEntry) => (
                <div key={categoryEntry.name}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                        }}>
                        <AlbumHeaders isOpen={categoryEntry.albumID}>
                            <CategoryName>{categoryEntry.name}</CategoryName>
                            <CgTrash size={22} color="3d3d3d" onClick={() => handleDeleteClick(categoryEntry.albumID)} />
                        </AlbumHeaders>
                    </div>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onConfirm={handleConfirmDelete}
                    />
                    {categoryEntry.albumID && (
                        <AlbumContainer>
                            {categoryEntry.images.length > 0 ? (
                                <ScrollSection>
                                    {categoryEntry.images.map((item, index) => (
                                        <PictureContainer key={index} onClick={() => handleShowDetails(item.date)}>
                                            <DateText>
                                                <img src={item.imageFile} alt="Album" />
                                                {item.date}
                                            </DateText>
                                        </PictureContainer>
                                    ))}
                                </ScrollSection>
                            ) : (
                                <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    color: '#b3b3b3'
                                }}>
                                    앨범에 일기를 추가하려면 먼저 작성하세요.
                                </div>
                            )}
                        </AlbumContainer>
                    )}
                </div>
            ))}
        </Container>
    );
};

export default AlbumBox;
