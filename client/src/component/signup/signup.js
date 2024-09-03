import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  display: grid;
  grid-template-columns: 1.1fr 1fr 1.1fr;
  grid-template-rows: 0.1fr 1fr 0.1fr;
`;

const Page = styled.div`
  grid-row: 2;
  grid-column: 2;
  border: 1.5px solid;
  box-shadow: 0px 0px 40px #8B8B8B;

  display: flex;
  flex-direction: column;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const Title = styled.div`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Miniwappy = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  
  background-image: url(${props => props.image});
  background-size: 320px 88px;
  background-position: center center;
  background-repeat: no-repeat;
`;

const Subtitle = styled.div`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  letter-spacing: -0.03em;
  color: #4F4F4F;
`;

const Form = styled.form`
  flex: 3;

  display: flex;
  flex-direction: column;
  padding-left: 80px;
  padding-right: 80px;
`;

const Container = styled.div`
  flex: 1;
  max-height: 52px;
  margin: 4px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const Input = styled.input`
  flex: 20;
  background-color: #EBEBEB;
  border: none;
  outline: none;

  font-size: 20px;
  font-weight: 400;
  text-indent: 20px;
`;

const Box = styled.div`
  flex: 1;
`;

const GreenBox = styled(Box)`
  background-color: #7ED957;
`;

const YellowBox = styled(Box)`
  background-color: #FFDE59;
`;

const RedBox = styled(Box)`
  background-color: #FF5757;
`;

const BlueBox = styled(Box)`
  background-color: #38B6FF;
`;

const Inputs = styled.input`
  margin: 4px;
  background-color: #EBEBEB;
  border: none;
  outline: none;

  font-size: 20px;
  font-weight: 400;
  text-indent: 55px;
`;

const Submit = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background-color: #38B6FF;
  box-shadow: 3px 3px 3px #C0C0C0;

  margin-top: 32px;
  margin-bottom: 32px;
  margin-left: 8px;
  margin-right: 8px;
  font-size: 20px;
  text-indent: 0px;
  color: white;
`;

const Others = styled.div`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: start;
`;

const Guide = styled.div`
  flex: 1.7;

  display: flex;
  justify-content: right;
  align-items: start;
  padding-right: 8px;
  font-size: 12px;
  font-weight: 600;
`;

const BackToLogin = styled(Link)`
  flex: 1;

  display: flex;
  justify-content: left;
  align-items: start;
  padding-left: 8px;
  font-size: 12px;
  color: #38B6FF;
  text-decoration: none;
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
  const miniwappImage = `${process.env.PUBLIC_URL}/miniwappImage.png`;

  const saveCode = event => { setCode(event.target.value); };
  const saveName = event => { setName(event.target.value); };
  const saveNickname = event => { setNickname(event.target.value); };
  const saveDob = event => { setDob(event.target.value); };
  const saveId = event => { setId(event.target.value); };
  const savePassword = event => { setPassword(event.target.value); };
  const savePasswordcheck = event => { setPasswordcheck(event.target.value); };

  const signupHandler = async event => {
    event.preventDefault();
    if (password === passwordcheck) {
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
  }

  return (
    <Component>
      <GlobalStyle />
      <Page>
        <Title>
          <Miniwappy image={miniwappImage} />
          <Subtitle>WAP의 미니홈피를 구경하려면 가입하세요</Subtitle>
        </Title>
        <Form method='post' name='signup-form' onSubmit={signupHandler}>
          <Container>
            <GreenBox />
            <Input name="name" type="text" placeholder="성명" value={name} onChange={saveName}></Input>
          </Container>
          <Container>
            <YellowBox />
            <Input name="id" type="text" placeholder="아이디" value={id} onChange={saveId}></Input>
          </Container>
          <Container>
            <RedBox />
            <Input name="password" type="paseword" placeholder="비밀번호" value={password} onChange={savePassword}></Input>
          </Container>
          <Container>
            <RedBox />
            <Input name="passwordverify" type="paseword" placeholder="비밀번호 확인" value={passwordcheck} onChange={savePasswordcheck}></Input>
          </Container>
          <Container>
            <BlueBox />
            <Input name="nickname" type="text" placeholder="닉네임" value={nickname} onChange={saveNickname}></Input>
          </Container>
          <Container>
            <BlueBox />
            <Input name="dob" type="text" placeholder="생일" value={dob} onChange={saveDob}></Input>
          </Container>
          <Submit type="submit" value="회원가입" />
          <Others>
            <Guide>계정이 이미 있으신가요?</Guide>
            <BackToLogin to='../'>로그인</BackToLogin>
          </Others>
        </Form>
      </Page>
    </Component>
  );
}

export default Signup;
