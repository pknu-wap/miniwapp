import React from "react";
import { useState } from 'react';
import './mypage.css';

function Mypage(props) {

  const { username } = props
  const [mode, setMode] = useState('default');
  let content = <h1>Welcome!</h1>;

  if (mode === 'Profile') {
    content = <Profile></Profile>;
  }

  return (
    <div className='mypage-component'>
      <div className='mypage-page'>
        <div className='mypage-profile'>
          <h1 className='mypage-title'>{username}의 미니왑피</h1>
          <div className='mypage-viewcountbox'>
            <h6 className='mypage-today'>today: 0</h6>
            <h6 className='mypage-total'>total: 0</h6>
          </div>
          <div className='profile-image'></div>
          <div className='profile-edits'>
            <form className='feelingbox'>
              <label htmlFor="feeling"></label>
              <select className='feelings' name="feelings">
                <option value="feeling1">감정 1</option>
                <option value="feeling2">감정 2</option>
                <option value="feeling3">감정 3</option>
                <option value="feeling4">감정 4</option>
                <option value="feeling5">감정 5</option>
              </select>
            </form>
            <div className='mypage-descriptionbox'>
              <textarea className='mypage-description' placeholder="내 소개"></textarea>
            </div>
            <div className='linkbox'>
              <input type='text' className='link' />
              <input type='submit' className='confirm' value='저장' />
            </div>
          </div>
        </div>
        <div className='mypage-spring'>
          <div className='spring1'></div>
          <div className='spring2'></div>
          <div className='spring3'></div>
          <div className='spring4'></div>
        </div>
        <div className='mypage-body'>
          {content}
        </div>
        <div className='mypage-menu'>
          <button className='menu-profile' onClick={() => {
            setMode('Profile');
          }}>프로필</button>
          <button className='menu-notice'>게시판</button>
          <button className='menu-guest'>방명록</button>
          <button className='menu-friends'>친구</button>
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className='profile-component'>
      <div className='profile-page'>
        <div className='profile-page-image'>
          
        </div>
      </div>
    </div>
  )
}

export default Mypage;