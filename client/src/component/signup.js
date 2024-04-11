/* eslint-disable */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userData from '../json/userData.json';
import commonData from '../json/commonData.json';

import './signup.css';

function Signup() {

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
          <form name='signup-form' onSubmit={e => {
            e.preventDefault();
            if (code === commonData.commonInfo.code && password === passwordcheck) {
              alert('signup success!');
              navigate('../login');
            } else {
              alert('signup failed');
            }
          }}>
            <input id="id" type="text" placeholder="학번" value={id} onChange={saveId} />
            <input id="enter-code" type="paseword" placeholder="입장코드" value={code} onChange={saveCode} />
            <input id="name" name="name" type="text" placeholder="성명" value={name} onChange={saveName} />
            <input id="nickname" name="nickname" type="text" placeholder="별명" value={nickname} onChange={saveNickname} />
            <input id="password" type="paseword" placeholder="비밀번호" value={password} onChange={savePassword} />
            <input id="passwordverify" type="paseword" placeholder="비밀번호 확인" value={passwordcheck} onChange={savePasswordcheck} />
            <input id="dob" name="dob" type="text" placeholder="생년월일 (ex. 20240101)" value={dob} onChange={saveDob} />
            <input id="submit" type="submit" value="회원가입" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
