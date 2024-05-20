import React from "react";
import { useState, useEffect } from 'react';
import API from '../utils/API.js'
import Home from './home.js';
import Profile from './profile.js';
import Notice from './notice.js';
import Guest from './guest.js';
import Friend from './friend.js';

import './minihome.css';
import { resolvePath } from "react-router-dom";

function Minihome() {
  const [mode, setMode] = useState('default');
  let content = null;
  let variable = null;

  if (mode === 'default') {
    content = <Home></Home>;
  }

  if (mode === 'profile') {
    content = <Profile></Profile>;
  }

  if (mode === 'notice') {
    content = <Notice></Notice>;
  }

  if (mode === 'guest') {
    content = <Guest></Guest>;
  }

  if (mode === 'friend') {
    content = <Friend></Friend>;
  }

  return (
    <div className='mypage-component'>
      <div className='mypage-page'>
        <div className='mypage-profile'>
          <MypageLeft />
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
          <button className='menu-home' onClick={() => {
            if (mode !== 'default') { setMode('default'); }
          }}>홈</button>
          <button className='menu-profile' onClick={() => {
            if (mode !== 'profile') { setMode('profile'); }
          }}>프로필</button>
          <button className='menu-notice' onClick={() => {
            if (mode !== 'notice') { setMode('notice'); }
          }}>게시판</button>
          <button className='menu-guest' onClick={() => {
            if (mode !== 'guest') { setMode('guest'); }
          }}>방명록</button>
          <button className='menu-friends' onClick={() => {
            if (mode !== 'friend') { setMode('friend'); }
          }}>친구</button>
        </div>
      </div>
    </div>
  );
}

function MypageLeft() {
  const [name, setName] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [pagename, setPagename] = useState('나의 미니왑피');
  const [userimage, setUserimage] = useState(null);

  useEffect(() => {
    API.get("userhome", { withCredentials: true })
      .then(function (response) {
        if (response.data == null) {
          console.log('THIS IS NULL');
        }
        console.log(response);
        setName(response.data.name);
        setNickname(response.data.nickname);
        setPagename(response.data.nickname + "의 미니왑피");
        console.log(name);
        console.log(nickname);
      })
      .catch(function (error) {
        alert('ERROR');
        console.log("ERROR");
        console.log(error.response);
      })
  }, []);

  return (
    <div className="mypageleft-component">
      <h1 className='mypage-title'>{pagename}</h1>
      <div className='mypage-viewcountbox'></div>
      <div className='profile-image'></div>
      <div className='feeling'>
        <div className='name-and-nickname'>{name} ({nickname})</div>
      </div>
      <div className='profile-edits'>
        <form className='profile-edits-form'>
          <div className='mypage-descriptionbox'>
            <textarea className='mypage-description' placeholder="내 소개"></textarea>
          </div>
          <div className='linkbox'>
            <button className='profile-image-change' placeholder="깃허브, 노션, 블로그 링크">이미지 변경</button>
            <input type='submit' className='confirm' value='저장' />
          </div>
        </form>
      </div>
    </div>
  )
}

// function Default() {
//   return (
//     <div className='default-component'>
//       <div className='default-bookmark-hidden'></div>
//       <div className='default-page'>
//         <div className='default-page-recent-post'></div>
//         <iframe className='default-page-embedvideo' src="https://www.youtube.com/embed/pkr48S22zH0?si=kBkwVAugjKCg1EzA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
//       </div>
//     </div>
//   )
// }

// function Profile(props) {
//   return (
//     <div className='profile-component'>
//       <div className='profile-bookmark-hidden'></div>
//       <div className='profile-page'>
//         <div className='profile-settings'>
//           {/* <h1>{props.id}</h1> */}
//           <form className='profile-settings-form'>
//             <div className='profile-page-image'></div>
//             <textarea type='text' className='profile-introduction' placeholder="내 소개" rows="14"></textarea>
//             <input type='text' className='profile-embedlink' placeholder="유튜브 링크"></input>
//             <input type='text' className='profile-nickname' placeholder="별명"></input>
//             <input type='text' className='profile-pagename' placeholder="미니왑피 이름"></input>
//             <input type='button' className='profile-page-image-change' value='이미지 변경'></input>
//             <input type='submit' className='profile-submit' value='저장'></input>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// function Notice() {
//   return (
//     <div className="notice-component">
//       <div className='notice-bookmark-hidden'></div>
//       <div className='notice-page'>
//         <h1>HELLO</h1>
//       </div>
//     </div>
//   )
// }

// function Guest() {
//   return (
//     <div className="guest-component">
//       <div className='guest-bookmark-hidden'></div>
//       <div className='guest-page'>
//         <h1>HELLO</h1>
//       </div>
//     </div>
//   )
// }

// function Friend() {
//   return (
//     <div className="friend-component">
//       <div className='friend-bookmark-hidden'></div>
//       <div className='friend-page'>
//         <h1>HELLO</h1>
//       </div>
//     </div>
//   )
// }

export default Minihome;