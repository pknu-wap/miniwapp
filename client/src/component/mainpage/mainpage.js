import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import API from "../utils/API.js";
import styled, { createGlobalStyle } from 'styled-components';
import Calendar from './calendar.js';
import PostUpdate from './postUpdate.js';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
  }
`;

const MainpageBody = styled.div`
  margin: 10px;
  width: 99%;
  height: 825px;
  border: 2px solid;
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImageFrame = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  border-radius: 50%;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const ButtonsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EntraceButton = styled(Link)`
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border: 2px solid;
  border-radius: 10px;
  background-color: rgb(0, 123, 255);
  color: white;
  text-decoration: none;
  margin-right: 10px;
  z-index: 1;
`;

const LogoutButton = styled(Link)`
  margin: 20px;
  width: 80px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid;
  border-radius: 10px;
  background-color: rgb(220, 53, 69);
  color: white;
  text-decoration: none;
`;

const HelloUser = styled.div`
  margin-right: 20px;
  font-size: 18px;
`;

const ContentSection = styled.div`
  width: 99%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
`;

const CalendarWrapper = styled.div`
  width: 100%;
`;

const CalendarContent = styled.div`
  margin: 10px;
  width: 100%;
  height: 600px;
  border: 2px solid;
  border-radius: 20px;
  background-color: transparent;
`;

const CalendarTitle = styled.div`
  margin-left: 40px;
  width: 200px;
  height: 50px;
  font-size: 35px;
  margin-bottom: 10px;
`;

const PostUpdateWrapper = styled.div`
  width: 100%;
`;

const PostUpdateContent = styled.div`
  margin: 10px;
  width: 100%;
  height: 600px;
  border-radius: 20px;
  border: 2px solid;
`;

const PostUpdateTitle = styled.div`
  margin-left: 40px;
  width: 270px;
  height: 50px;
  font-size: 35px;
  margin-bottom: 10px;
`;

function Mainpage() {
  const [status, setStatus] = useState(null);
  const [link, setLink] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState("OO"); // Default to "OO" if name is not loaded yet

  const getUserInfo = async () => {
    try {
      const response = await API.get(`mainpage/user`, { withCredentials: true });
      const { name, image, number } = response.data;
      setUserName(name);
      setStatus(number);
      setProfileImage(image ? `data:image/png;base64,${image}` : "default_profile_image.png");
    } catch (error) {
      console.error(error);
      alert("Failed to load user information");
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (status !== null) {
      setLink(`../mypage/${status}/default`);
    }
  }, [status]);

  return (
    <MainpageBody>
      <GlobalStyle />
      <Header>
        <ProfileSection>
          <ProfileImageFrame>
            <ProfileImage alt="profileImage" src={profileImage} />
          </ProfileImageFrame>
        </ProfileSection>
        <ButtonsSection>
          <HelloUser>안녕하세요 {userName}님!</HelloUser>
          <EntraceButton to={link}>내 미니왑피 입장하기</EntraceButton>
        </ButtonsSection>
        <LogoutButton to="../login">로그아웃</LogoutButton>
      </Header>
      <ContentSection>
        <CalendarWrapper>
          <CalendarTitle>WAP 캘린더</CalendarTitle>
          <CalendarContent>
            <Calendar />
          </CalendarContent>
        </CalendarWrapper>
        <PostUpdateWrapper>
          <PostUpdateTitle>게시물 업데이트</PostUpdateTitle>
          <PostUpdateContent>
            <PostUpdate />
          </PostUpdateContent>
        </PostUpdateWrapper>
      </ContentSection>
    </MainpageBody>
  );
}

export default Mainpage;