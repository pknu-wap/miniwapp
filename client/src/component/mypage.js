import React from "react";
import { useState } from 'react';
import './mypage.css';

function Mypage(props) {

  const { username } = props
  const [mode, setMode] = useState('default');
  let content = null;

  if (mode === 'default') {
    content = <Default></Default>
  }

  if (mode === 'profile') {
    content = <Profile></Profile>;
  }

  if (mode === 'notice') {
    content = <Notice></Notice>
  }

  if (mode === 'guest') {
    content = <Guest></Guest>
  }

  if (mode === 'friend') {
    content = <Friend></Friend>
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
            <form className='profile-edits-form'>
              <div className='feeling'>
                <label htmlFor="feeling"></label>
                <select className='feeling-select' name="feeling-select">
                  <option value="feeling1">감정 1</option>
                  <option value="feeling2">감정 2</option>
                  <option value="feeling3">감정 3</option>
                  <option value="feeling4">감정 4</option>
                  <option value="feeling5">감정 5</option>
                </select>
              </div>
              <div className='mypage-descriptionbox'>
                <textarea className='mypage-description' placeholder="깃허브, 노션, 블로그 링크"></textarea>
              </div>
              <div className='linkbox'>
                <input type='text' className='link' placeholder="내 소개" />
                <input type='submit' className='confirm' value='저장' />
              </div>
            </form>
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
            if (mode !== 'profile') { setMode('profile'); }
            else { setMode('default'); }
          }}>프로필</button>
          <button className='menu-notice' onClick={() => {
            if (mode !== 'notice') { setMode('notice'); }
            else { setMode('default'); }
          }}>게시판</button>
          <button className='menu-guest' onClick={() => {
            if (mode !== 'guest') { setMode('guest'); }
            else { setMode('default'); }
          }}>방명록</button>
          <button className='menu-friends' onClick={() => {
            if (mode !== 'friend') { setMode('friend'); }
            else { setMode('default'); }
          }}>친구</button>
        </div>
      </div>
    </div>
  );
}

function Default() {
  return (
    <div className='default-component'>
      <h1>Welcome!</h1>
    </div>
  )
}

function Profile() {
  return (
    <div className='profile-component'>
      <div className='profile-bookmark-hidden'></div>
      <div className='profile-page'>
        <div className='profile-settings'>
          <form className='profile-settings-form'>
            <div className='profile-page-image'></div>
            <textarea type='text' className='profile-introduction' placeholder="내 소개" rows="14"></textarea>
            <input type='text' className='profile-nickname' placeholder="별명"></input>
            <input type='text' className='profile-pagename' placeholder="미니왑피 이름"></input>
            <input type='button' className='profile-image-change' value='이미지 변경'></input>
            <input type='submit' className='profile-submit' value='저장'></input>
          </form>
        </div>
      </div>
    </div>
  )
}

function Notice() {
  return (
    <div className="notice-component">
      <div className='notice-bookmark-hidden'></div>
      <div className='notice-page'>
        <h1>HELLO</h1>
      </div>
    </div>
  )
}

function Guest() {
  return (
    <div className="guest-component">
      <div className='guest-bookmark-hidden'></div>
      <div className='guest-page'>
        <h1>HELLO</h1>
      </div>
    </div>
  )
}

function Friend() {
  return (
    <div className="friend-component">
      <div className='friend-bookmark-hidden'></div>
      <div className='friend-page'>
        <h1>HELLO</h1>
      </div>
    </div>
  )
}

export default Mypage;