import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './mainpage.css';
import Calendar from './calendar.js';
import styled from 'styled-components'

function Mainpage() {

  return (
    <div className='mainpage-body'>
      <div className='profileImageFrame'>
        <img className='profileImage' alt="profileImage" src="profile_image_test.jpeg" width="150px" height="150px"/>
      </div>
      <Link to="../mypage">
        <button className='entrace-button'>내 미니왑피 입장하기</button>
      </Link>
      <Link to="../login">
        <button className='logout-button'>로그아웃</button>
      </Link>
      <div className='hello-user'>안녕하세요 OO님!</div>
      <div className='horizonline'></div>
      <div className="calendar">
        <div className='calendar-title'>WAP 캘린더</div>
        <div className='calendar-content'>
          <Calendar></Calendar>
        </div>
      </div>
      <div className="post-update">
        <div className='post-update-title'>게시물 업데이트</div>
        <div className='post-update-content'>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;