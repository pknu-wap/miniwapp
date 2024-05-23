import React from "react";
import { useState, useEffect } from 'react';
import './minihome.css';
import API from '../utils/API'
import styled from "styled-components";

const NewPostBack = styled.button`
  width: 100px;
  height: 50px;
`;

const NewPostContent = styled.textarea`
  width: 800px;
  height: 600px;
`;

const NewPostSave = styled.input`
  width: 100px;
  height: 50px;
`;


function Notice() {
  const [postCount, setPostCount] = useState(null);
  const [mode, setMode] = useState('Board');

  let content = null;

  if (mode === 'Board') {
    content = <Board changeMode={setMode} />;
  }
  if (mode === 'NewPost') {
    content = <NewPost changeMode={setMode} />;
  }
  if (mode === 'Post') {
    content = <Post changeMode={setMode} />;
  }

  return (
    <div className="notice-component">
      <div className='notice-bookmark-hidden'></div>
      <div className='notice-page'>
        {content}
      </div>
    </div>
  )
}

function Board(props) {
  let columns = ['제목', '작성일', '조회수'];
  let data = [{ title: 'D', date: 'DD', viewcount: 'DDD' }, { title: 'E', date: 'EE', viewcount: 'EEE' }, { title: 'F', date: 'FF', viewcount: 'FFF' }];

  console.log('DONE?');

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
    <div className='board-component'>
      <table className='table'>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ title, date, viewcount }) => (
            <tr key={title + date + viewcount}>
              <td onClick={() => {
                props.changeMode('Post');
              }}>{title}</td>
              <td>{date}</td>
              <td>{viewcount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='notice-bottom-bar'>
        <button className='notice-new-post' onClick={() => { props.changeMode('NewPost') }}>글쓰기</button>
      </div>
    </div>
  );
}

function NewPost(props) {

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
    <div className='newpost-component'>
      <form method="post" onSubmit={e => {
        e.preventDefault();
        const newPostData = {
          
        };
        API.post("userhome", JSON.stringify(newPostData), { withCredentials: true })
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
        props.changeMode('Board')
      }}>
        <div className='newpost-title'>
          <input className="newpost-title-input"></input>
        </div>
        <NewPostBack onClick={() => { props.changeMode('Board') }}>이전</NewPostBack>
        <NewPostSave type="submit" value="저장" />
        <NewPostContent />
      </form>
    </div>
  )
}

function Post(props) {
  return (
    <div>THIS IS POST</div>
  )
}

export default Notice;