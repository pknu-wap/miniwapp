import React from "react";
import { useState, useEffect } from 'react';
import API from '../utils/API'
import './minihome.css';

function Home() {

  useEffect(e => {
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
    <div className='default-component'>
      <div className='default-bookmark-hidden'></div>
      <div className='default-page'>
        <div className='default-page-recent-post'></div>
        <iframe className='default-page-embedvideo' src="https://www.youtube.com/embed/pkr48S22zH0?si=kBkwVAugjKCg1EzA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </div>
  )
}

export default Home;
