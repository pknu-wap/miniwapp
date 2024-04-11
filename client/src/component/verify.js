import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './verify.css';

function Verify() {
  const navigate = useNavigate();
  let [code, setCode] = useState('');

  const saveCode = event => { setCode(event.target.value); };

  return (
    <div className='verify-component'>
      <div className='verify-page'>
        <div className="verify-title">
          <h6 className="verify">입장코드 확인</h6>
        </div>

        <div className='verify-form'>
          <form name='verify-form'>
            <input id="enter-code" type="paseword" placeholder="입장코드" value={code} onChange={saveCode} />
            <input id="submit" type="submit" value="확인" onClick={() => {
              if (code === 'asdf') {
                alert('Confirmed!');
                navigate('../signup');
              } else {
                alert('Not confirmed');
              }
            }} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Verify;
