import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Calendar from './calendar.js';
import PostUpdate from './postUpdate.js';

const MainpageBody = styled.div`
  margin: 10px;
  width: 99%;
  height: 98%;
  min-height: 90vh;
  position: absolute;
  border: 2px solid;
  border-radius: 20px;
`;

const ProfileImageFrame = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  z-index: 2;
  top: 13%;
  left: 5%;
  background-color: white;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  position: relative;
  z-index: 1;
  border: 2px solid;
  border-radius: 16px;
`;

const EntraceButton = styled.button`
  width: 340px;
  height: 80px;
  position: absolute;
  z-index: 2;
  top: 18%;
  left: 70%;
  text-align: center;
  font-size: 25px;
  border: 2px solid;
  border-radius: 20px;
  background-color: rgb(67, 67, 255);
  cursor: pointer;
`;

const LogoutButton = styled.button`
  width: 110px;
  height: 30px;
  display: inline-block;
  position: absolute;
  top: 5%;
  left: 85%;
  text-align: center;
  border: 2px solid;
  border-radius: 14px;
  background-color: rgb(255, 109, 109);
  cursor: pointer;
`;

const HelloUser = styled.div`
  width: 200px;
  height: 30px;
  display: inline-block;
  position: absolute;
  top: 5%;
  left: 70%;
  text-align: right;
`;

const Horizonline = styled.div`
  width: 100%;
  height: 1px;
  position: relative;
  top: 7%;
  border: 1px solid;
`;

const CalendarWrapper = styled.div`
  display: block;
`;

const CalendarContent = styled.div`
  width: 900px;
  height: 600px;
  position: absolute;
  z-index: 2;
  top: 35%;
  left: 5%;
  border: 2px solid;
  border-radius: 20px;
  background-color: 0,0,0,0;
`;

const CalendarTitle = styled.div`
  width: 200px;
  height: 50px;
  position: absolute;
  top: 30%;
  left: 7%;
  font-size: 35px;
`;

const PostUpdateWrapper = styled.div`
  display: inline-block;
`;

const PostUpdateContent = styled.div`
  width: 900px;
  height: 600px;
  position: absolute;
  top: 35%;
  left: 50%;
  border-radius: 20px;
  border: 2px solid;
`;

const PostUpdateTitle = styled.div`
  width: 270px;
  height: 50px;
  position: absolute;
  top: 30%;
  left: 52%;
  font-size: 35px;
`;

function Mainpage() {
  return (
    <MainpageBody>
      <ProfileImageFrame>
        <ProfileImage alt="profileImage" src="profile_image_test.jpeg" />
      </ProfileImageFrame>
      <Link to="../minihome">
        <EntraceButton>내 미니왑피 입장하기</EntraceButton>
      </Link>
      <Link to="../login">
        <LogoutButton>로그아웃</LogoutButton>
      </Link>
      <HelloUser>안녕하세요 OO님!</HelloUser>
      <Horizonline />
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
    </MainpageBody>
  );
}

export default Mainpage;
