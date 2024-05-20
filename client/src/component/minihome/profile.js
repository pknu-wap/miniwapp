import React from "react";
import { useState, useEffect } from 'react';
import API from '../utils/API'
import './minihome.css';

function Profile() {

  useEffect(() => {
    API.get("userhome", { withCredentials: true })
      .then(function (response) {
        if (response.data == null) {
          console.log('THIS IS NULL');
        }
        console.log(response);
      })
      .catch(function (error) {
        alert('ERROR');
        console.log("ERROR");
        console.log(error.response);
      })
  }, []);

  return (
    <div className='profile-component'>
      <div className='profile-bookmark-hidden'></div>
      <div className='profile-page'>
        <div className='profile-settings'>
          {/* <h1>{props.id}</h1> */}
          <form className='profile-settings-form'>
            <div className='profile-page-image'></div>
            <textarea type='text' className='profile-introduction' placeholder="내 소개" rows="14"></textarea>
            <input type='text' className='profile-embedlink' placeholder="유튜브 링크"></input>
            <input type='text' className='profile-nickname' placeholder="별명"></input>
            <input type='text' className='profile-pagename' placeholder="미니왑피 이름"></input>
            <input type='button' className='profile-page-image-change' value='이미지 변경'></input>
            <input type='submit' className='profile-submit' value='저장'></input>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile;