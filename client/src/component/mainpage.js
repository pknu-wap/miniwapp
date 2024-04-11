import React from "react";
import { Link } from "react-router-dom";
import './mainpage.css';

function Mainpage({ username }) {
  return (
    <div className='mainpage'>
      <div className='calender'>
        <h1 className='calender-title'>WAP 캘린더</h1>
        <h3>사용자 id: {username}</h3>
      </div>
      <div className='menu'>
        <h1>menu</h1>
        <Link id='mypage' to='../mypage'>마이페이지로 이동</Link>
      </div>
      <div className='chatroom'>
        <h1>chatroom</h1>
      </div>
      <div className='posts'>
        <h1>posts</h1>
      </div>
    </div>
  );
}

export default Mainpage;