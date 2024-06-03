import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from '../utils/API';
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	*, *::before, *::after {
		box-sizing: border-box;
    padding: 0px;
    margin: 0px;
	}
`;

const Component = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 28px;
`;

const Page = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.8fr 1fr;
  grid-template-rows: 1fr 1.5fr 1fr;
  width: 100%;
  height: 100%;

  border: 2px solid;
  border-radius: 20px;
`;

const Title = styled.div`
  grid-column: 1;
  grid-row: 1;

  display: flex;
  flex-direction: column;
  padding-top: 52px;
  padding-bottom: 52px;
  justify-content: center;
  align-items: center;
`;

const Miniwappy = styled.div`
  flex: 1;
  font-size: 40px;
  font-weight: 800;
`;

const Subtitle = styled.div`
  flex: 1;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.05em;
`;

const Form = styled.form`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-column: 2;
  grid-row: 2;
`;

const Inputs = styled.input`
  margin: 15px;
  border: 3px solid;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 400;
  text-indent: 55px;
`;

const InputValues = styled(Inputs)`
  grid-row: ${props => props.row};
  grid-column: ${props => props.col};

  background-image: url(${props => props.image});
  background-position: ${props => props.indent}px center;
  background-repeat: no-repeat;
`;

const Submit = styled(Inputs)`
  text-indent: 0px;
`;

function Signup() {

  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [dob, setDob] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordcheck, setPasswordcheck] = useState('');
  const idImage = `${process.env.PUBLIC_URL}/id.png`;
  const passwordImage = `${process.env.PUBLIC_URL}/password.png`;
  const entercodeImage = `${process.env.PUBLIC_URL}/enter_code.png`;
  const dobImage = `${process.env.PUBLIC_URL}/dob.png`;

  const saveCode = event => { setCode(event.target.value); };
  const saveName = event => { setName(event.target.value); };
  const saveNickname = event => { setNickname(event.target.value); };
  const saveDob = event => { setDob(event.target.value); };
  const saveId = event => { setId(event.target.value); };
  const savePassword = event => { setPassword(event.target.value); };
  const savePasswordcheck = event => { setPasswordcheck(event.target.value); };

  return (
    <Component>
      <GlobalStyle />
      <Page>
        <Title>
          <Miniwappy>ㅁi니왑ㅍi</Miniwappy>
          <Subtitle>회원가입</Subtitle>
        </Title>
        <Form method='post' name='signup-form' onSubmit={e => {
          e.preventDefault();
          if (code === 'asdf' && password === passwordcheck) {
            const userData = {
              id: id,
              password: password,
              name: name,
              nickname: nickname,
              birthday: dob
            };
            console.log(userData);
            API.post("/user/create", JSON.stringify(userData), { withCredentials: true }) // 쿠키 cors 통신 설정
              .then(function (response) {
                navigate('../login');
                if (response.data === 'ok') {
                  console.log("SUCCESS?");
                  console.log(response);
                  navigate('../login');
                }
              })
              .catch(function (error) {
                alert(error.response.data);
                console.log("ERROR");
                console.log(error.response);
              })
          } else {
            alert('signup failed');
          }

        }}>
          <InputValues row={1} col={1} image={idImage} indent={22} name="id" type="text" placeholder="아이디" value={id} onChange={saveId} />
          <InputValues row={1} col={2} image={entercodeImage} indent={18} name="enter-code" type="paseword" placeholder="입장코드" value={code} onChange={saveCode} />
          <InputValues row={2} col={1} image={idImage} indent={22} name="name" type="text" placeholder="성명" value={name} onChange={saveName} />
          <InputValues row={2} col={2} image={idImage} indent={22} name="nickname" type="text" placeholder="별명" value={nickname} onChange={saveNickname} />
          <InputValues row={3} col={1} image={passwordImage} indent={19} name="password" type="paseword" placeholder="비밀번호" value={password} onChange={savePassword} />
          <InputValues row={3} col={2} image={passwordImage} indent={19} name="passwordverify" type="paseword" placeholder="비밀번호 확인" value={passwordcheck} onChange={savePasswordcheck} />
          <InputValues row={4} col={1} image={dobImage} indent={20} name="dob" type="text" placeholder="생년월일 (ex. 2024-01-01)" value={dob} onChange={saveDob} />
          <Submit type="submit" value="회원가입" />
        </Form>
      </Page>
    </Component>
  );
}

export default Signup;
