import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import API from '../utils/API';
import API2 from '../utils/API2';

const GlobalStyle = createGlobalStyle`
	*, *::before, *::after {
		box-sizing: border-box;
    padding: 0px;
    margin: 0px; 
  }
`;

const Component = styled.div`
  background-image: url(${props => props.image});
  background-repeat: no-repeat;

  display: grid;
  grid-template-columns: 0.3fr 1fr 0.3fr;
  grid-template-rows: 0.1fr 1fr 0.1fr;
  width: 100vw;
  height: 100vh;
`;

const Page = styled.div`
  grid-row: 2;
  grid-column: 2;
  background-color: white;
  border: 1.5px solid;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;

const InnerPage = styled.div`
  grid-row: 1;
  grid-column: 2;
  background-color: white;
  border-left: 1.5px solid;

  display: flex;
  flex-direction: column;
  padding-top: 80px;
  padding-bottom: 80px;
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

const Form = styled.form`
  flex: 5;
  padding-left: 80px;
  padding-right: 80px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Container = styled.div`
  flex: 1.2;
  max-height: 52px;
  margin: 12px;
  margin-top: ${props => props.marginTop || 12}px;
  margin-bottom: ${props => props.marginBottom || 12}px;
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

const Submit = styled.input`
  flex: 1;
  max-height: 44px;
  margin: 12px;
  background-color: #FF5757;
  border: none;
  box-shadow: 3px 3px 3px #C0C0C0;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  letter-spacing: -0.05em;
  color: white;
`;

const Or = styled.div`
  flex: 1;
  max-height: 42px;

  display: flex;
  align-items: center;
`;

const OrLine = styled.hr`
  flex: auto;
  height: 1.3px;
  background-color: #000000;
  border: none;
`;

const OrText = styled.div`
  padding: 0 10px;

  font-size: 16px;
  font-weight: 400;
`;

const Signup = styled(Link)`
  flex: 1;
  max-height: 44px;
  margin: 12px;
  background-color: #38B6FF;
  border: none;
  box-shadow: 3px 3px 3px #C0C0C0;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  letter-spacing: -0.05em;
  text-decoration: none;
  color: white;
`;

const KakaoLogin = styled.input`
  flex: 1.2;
  max-height: 52px;
  margin: 12px;
  background-color: #FEE500;
  border: none;
  border-radius: 4px;
  box-shadow: 3px 3px 3px #C0C0C0;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.05em;
  text-decoration: none;
  color: black;

  background-image: url(${props => props.image});
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: 20px center;
`;

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const loginImage = `${process.env.PUBLIC_URL}/loginBackground.png`;
  const miniwappImage = `${process.env.PUBLIC_URL}/miniwappImage.png`;
  const kakaoImage = `${process.env.PUBLIC_URL}/kakaoImage.png`;
  // const REST_API_KEY = 'b7382d9ab658123d8559ab006e9c2247';
  // const REDIRECT_URI = 'https://miniwappi.shop/login/oauth2/code/kakao';
  // const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const kakaoLink = 'https://miniwappi.shop/oauth2/authorization/kakao';

  const saveId = event => { setId(event.target.value); };
  const savePassword = event => { setPassword(event.target.value); };

  const loginHandler = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("username", id);
      formData.append("password", password);
      console.log(typeof(id));
      console.log(typeof(password));
      if (formData === undefined) {
        console.log("formData undefined");
      } else {
        console.log("formData defined");
      }
      const response = await API2.post('user/login', formData, { withCredentials: true });
      console.log("SUCCESS");
      console.log(response);
      navigate('../main');
      console.log("실행?");
    }
    catch (error) {
      alert('로그인 실패');
      console.log("ERROR");
      console.log(error.response);
    }
  }

  const kakaoLoginHandler = () => {
    window.location.href = kakaoLink;
  };

  return (
    <Component image={loginImage}>
      <GlobalStyle />
      <Page>
        <InnerPage>
          <Miniwappy image={miniwappImage} />
          <Form method='post' name='login-form' onSubmit={loginHandler}>
            <Container marginTop={36}>
              <GreenBox />
              <Input name="id" type="text" placeholder="ID" value={id} onChange={saveId} />
            </Container>
            <Container marginBottom={80}>
              <YellowBox />
              <Input name="password" type="password" placeholder="PASSWORD" value={password} onChange={savePassword} />
            </Container>
            <Submit type="submit" value="로그인" />
            <Or>
              <OrLine />
              <OrText>또는</OrText>
              <OrLine />
            </Or>
            <Signup to='../signup'>회원가입</Signup>
            <KakaoLogin type="button" value="카카오 로그인" image={kakaoImage} onClick={kakaoLoginHandler}/>
          </Form>
        </InnerPage>
      </Page>
    </Component>
  );
}

export default Login;