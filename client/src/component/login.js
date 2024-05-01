import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './login.css';
// import userData from '../json/userData.json';
import API from './utils/API'
import axios from "axios";

function Login(props) {
  const { setUsername } = props;

  const navigate = useNavigate();
  let [id, setId] = useState('');
  let [password, setPassword] = useState('');

  const saveId = event => { setId(event.target.value); };
  const savePassword = event => { setPassword(event.target.value); };

  return (
    <div className='login-component'>
      <div className='login-page'>
        <div className="login-title">
          <h1 className="miniwappy">ㅁi니왑ㅍi</h1>
          <h6 className="login">로그인</h6>
        </div>

        <div className='login-form'>
          <form action='http://15.165.164.135:8080/user/login' method='post' name='login-form' onSubmit={e => {
            e.preventDefault();
            const userLoginData = {
              id: id,
              password: password
            };
            console.log(userLoginData);
            API.post("user/login", JSON.stringify(userLoginData))
            // { withCredentials: true  }) // 쿠키 cors 통신 설정
            .then(function (response) {
              if (response.data === "로그인에 실패했습니다") {
                alert(response.data);
              } else {
                console.log("SUCCESS");
                console.log(response);
                API.get("userhome")
                .then(function (response) {
                  if (response.data == null) {
                    console.log('THIS IS NULL');
                  }
                  console.log("PLZZZZZZZ");
                  console.log(response);
                })
                .catch(function (error) {
                  alert('ERROR');
                  console.log("ERROR");
                  console.log(error.response);
                })
                navigate('../main');
              }
            })
            .catch(function (error) {
              alert('ERROR');
              console.log("ERROR");
              console.log(error.response);
            })
          }}>
            <input id="id" name="id" type="text" placeholder="아이디" value={id} onChange={saveId} />
            <input id="password" name="password" type="password" placeholder="비밀번호" value={password} onChange={savePassword} />
            <input id="submit" type="submit" value="로그인" />
          </form>
        </div>

        <div className="others">
          <Link id='signup' to='../signup'>회원가입</Link>
          <Link id='login-exception' to='../loginexception'>로그인이 안되시나요?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;