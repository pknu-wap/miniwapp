/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userData from '../json/userData.json';
import commonData from '../json/commonData.json';
import axios from "axios";
import API from './utils/API'

axios.defaults.withCredentials = true;

import './signup.css';

function Signup() {

  // const fetchData=()=>{
  //   fetch('http://15.165.164.135:8080/user/create')
  //   .then((res)=>res.json())
  //   .then((data)=>setTodoList(data));
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [])



  // const onSubmitHandler=(e)=>{
  //   e.preventDefault();
  //   console.log(e.target);
  //   const id = e.target.id.value;
  //   const pw = e.target.password.value;
  //   const name = e.target.name.value;
  //   const nickname = e.target.nickname.value;
  //   const birthday = e.target.dob.value;
  //   fetch('http://15.165.164.135:8080/user/create', {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id,
  //       pw,
  //       name,
  //       nickname,
  //       birthday,
  //     })
  //   })
    
  // }

  const navigate = useNavigate();

  let [code, setCode] = useState('');
  let [name, setName] = useState('');
  let [nickname, setNickname] = useState('');
  let [dob, setDob] = useState('');
  let [id, setId] = useState('');
  let [password, setPassword] = useState('');
  let [passwordcheck, setPasswordcheck] = useState('');

  const saveCode = event => { setCode(event.target.value); };
  const saveName = event => { setName(event.target.value); };
  const saveNickname = event => { setNickname(event.target.value); };
  const saveDob = event => { setDob(event.target.value); };
  const saveId = event => { setId(event.target.value); };
  const savePassword = event => { setPassword(event.target.value); };
  const savePasswordcheck = event => { setPasswordcheck(event.target.value); };

  return (
    <div className='signup-component'>
      <div className='signup-page'>
        <div className="signup-title">
          <h1 className="miniwappy-signup">ㅁi니왑ㅍi</h1>
          <h6 className="signup-signup">회원가입</h6>
        </div>

        <div className='signup-form'>
          <form method='post' name='signup-form' onSubmit={e => {
            e.preventDefault();
            if (code === commonData.commonInfo.code && password === passwordcheck) {
              const userData = {
                id: id,
                password: password,
                name: name,
                nickname: nickname,
                birthday: dob
              };
              console.log(userData);
              API.post("/user/create", JSON.stringify(userData),
              { withCredentials: true  }) // 쿠키 cors 통신 설정
              .then(function (response) {
                if (response.data === '이미 가입된 아이디가 존재') {
                  alert(response.data);
                } else {
                  console.log("SUCCESS?");
                  alert('signup success!');
                  navigate('../login');
                  console.log(response);
                }
              })
              .catch(function (error) {
                console.log("ERROR");
                console.log(error.response);
              })
            } else {
              alert('signup failed');
            }

          }}>
            <input id="id" name="id" type="text" placeholder="아이디" value={id} onChange={saveId} />
            <input id="enter-code" name="enter-code" type="paseword" placeholder="입장코드" value={code} onChange={saveCode} />
            <input id="name" name="name" type="text" placeholder="성명" value={name} onChange={saveName} />
            <input id="nickname" name="nickname" type="text" placeholder="별명" value={nickname} onChange={saveNickname} />
            <input id="password" name="password" type="paseword" placeholder="비밀번호" value={password} onChange={savePassword} />
            <input id="passwordverify" name="passwordverify" type="paseword" placeholder="비밀번호 확인" value={passwordcheck} onChange={savePasswordcheck} />
            <input id="dob" name="dob" type="text" placeholder="생년월일 (ex. 2024-01-01)" value={dob} onChange={saveDob} />
            <input id="submit" type="submit" value="회원가입" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
