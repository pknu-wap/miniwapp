import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './mainpage.css';
import Calendar from './calendar.js';
import API from '../utils/API.js';

function Mainpage() {

  const [minihomeNumber, setMinihomeNumber] = useState(null);
  const navigate = useNavigate();

  const toMinihome = () => navigate(`../mypage/${minihomeNumber}/default`);

  const getMinihomeNumber = async () => {
    try {
      const response = await API.get(`mainpage/user`, { withCredentials: true });
      if (response.data == null) { console.log('THIS IS NULL'); }
      console.log(response);
      setMinihomeNumber(response.data.number);
    }
    catch (error) {
      alert('ERROR');
      console.log("ERROR");
      console.log(error);
    }
  }

  useEffect(() => {
    getMinihomeNumber();
  }, []);

  return (
    <div className='mainpage-component'>
      <div className='mainpage-body'>
        <div className='profileImageFrame'>
          <img className='profileImage' alt="profileImage" src="profile_image_test.jpeg" width="150px" height="150px"/>
        </div>
        <div>
          <button className='entrace-button' onClick={toMinihome}>내 미니왑피 입장하기</button>
        </div>
        <Link to="../login">
          <button className='logout-button'>로그아웃</button>
        </Link>
        <div className='hello-user'>안녕하세요 OO님!</div>
        <div className='horizonline'></div>
        <div className='calendar-title'>WAP 캘린더</div>
        <div className='calendar-frame'>
          <Calendar></Calendar>
        </div>
        <div className='post-update-title'>게시물 업데이트</div>
        <div className='post-update'>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;