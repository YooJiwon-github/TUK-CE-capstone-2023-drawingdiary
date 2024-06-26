import React from 'react';
import styled from "styled-components";
import { TbUserEdit } from "react-icons/tb";


const ProfileBox = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 30px 0 0;
  box-sizing: border-box;
`;

const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
`;

const ProfileName = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 5px;
`;

const ProfileEmail = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
`;

function Profile() {
  const setEmail = localStorage.getItem("setEmail");
  const setName = localStorage.getItem("setName");
  const setProfileImage = localStorage.getItem("setProfileImage");
  return (
    <ProfileBox>
      {setProfileImage !== "null" && setProfileImage !== null ? (
        <ProfileImg src={setProfileImage} alt="프로필 이미지" />
      ) : (
        <TbUserEdit 
          size={120} 
          color='#3d3d3d' 
          alt='edit' 
          style={{
            borderRadius:'50%',
            marginBottom:'20px',
          }} />
      )}
      <ProfileName>{setName}</ProfileName>
      <ProfileEmail>{setEmail}</ProfileEmail>
    </ProfileBox>
  );
}

export default Profile;
