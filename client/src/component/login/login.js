import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import API from '../utils/API'

const GlobalStyle = createGlobalStyle`
	*, *::before, *::after {
		box-sizing: border-box;
    padding: 0px;
    margin: 0px;
	}
`;

const Component = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.93fr 1fr;
  grid-template-rows: 1fr 4fr 1fr;
  width: 100vw;
  height: 100vh;
`;

const Page = styled.div`
  grid-row: 2;
  grid-column: 2;
  flex-direction: column;

  display: flex;
  border: 2px solid;
  border-radius: 20px;

  padding-top: 60px;
  padding-bottom: 60px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 0.8;
`;

const Miniwappy = styled.h1`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 800;
  text-align: center;
`;

const Subtitle = styled.h6`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.05em;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1.3;
  padding-left: 40px;
  padding-right: 40px;
`;

const ID = styled.input`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  border: 3px solid;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 400;
  text-indent: 55px;

  margin: 8px;
  max-height: 72px;

  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-position: 22px center;
`;

const Password = styled.input`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  border: 3px solid;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 400;
  text-indent: 55px;
  
  margin: 8px;
  max-height: 72px;

  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-position: 20px center;
`;

const Submit = styled.input`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  border: 3px solid;
  border-radius: 20px;
  font-weight: 400;

  margin: 8px;
  max-height: 72px;

  background-color: #BDBDBD;
  font-size: 24px;
  letter-spacing: -0.05em;
  text-indent: 0;
`;

const Others = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.5;
`;

const Signup = styled(Link)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  color: black;
`;

const Exception = styled(Link)`
  display: flex;
  flex: 1.5;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.05em;
  text-align: center;
  text-decoration: none;
  color: #0095FF;
`;


function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const idImage = `${process.env.PUBLIC_URL}/id.png`;
  const passwordImage = `${process.env.PUBLIC_URL}/password.png`;

  const saveId = event => { setId(event.target.value); };
  const savePassword = event => { setPassword(event.target.value); };

  return (
    <Component>
      <GlobalStyle />
      <Page>
        <Title>
          <Miniwappy>ㅁi니왑ㅍi</Miniwappy>
          <Subtitle>로그인</Subtitle>
        </Title>
        <Form method='post' name='login-form' onSubmit={e => {
          e.preventDefault();
          const userLoginData = {
            id: id,
            password: password
          };
          console.log(userLoginData);
          API.post("/user/login", JSON.stringify(userLoginData), { withCredentials: true })
            .then(function (response) {
              if (response.data === "로그인에 실패했습니다") {
                alert(response.data);
              } else {
                console.log("SUCCESS");
                console.log(response);
                navigate('../main');
                console.log("실행?");
              }
            })
            .catch(function (error) {
              alert(error.response.data);
              console.log("ERROR");
              console.log(error.response);
            })
        }}>
          <ID name="id" type="text" placeholder="아이디" value={id} image={idImage} onChange={saveId} />
          <Password name="password" type="password" placeholder="비밀번호" value={password} image={passwordImage} onChange={savePassword} />
          <Submit type="submit" value="로그인" />
        </Form>
        <Others>
          <Signup to='../signup'>회원가입</Signup>
          <Exception to='../loginexception'>로그인이 안되시나요?</Exception>
        </Others>
      </Page>
    </Component>
  );
}

export default Login;