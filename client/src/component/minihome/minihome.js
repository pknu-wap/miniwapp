import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Home from './home.js';
import MinihomeLeft from './minihomeLeft.js';
import Profile from './profile.js';
import Notice from './notice.js';
import Guest from './guest.js';
import Friend from './friend.js';
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	*, *::before, *::after {
		box-sizing: border-box;
    padding: 0px;
    margin: 0px;
    z-index: 0;
	}
`;

const Component = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 28px;
`;

const Page = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 28px;
  // align-items: stretch;
  border: 2px solid;
  border-radius: 20px;
`;

const Springs = styled.div`
  display: flex;
  flex: 0.07;
  justify-content: center;
  z-index: 2;
`;

const Spring = styled.div`
  position: absolute;
  width: 80px;
  height: 20px;
  border: 2px solid;
  border-radius: 20px;
  background-color: #D9D9D9;
`;

const Spring1 = styled(Spring)`
  top: 15%;
  transform: translate(0, -15%);
`;

const Spring2 = styled(Spring)`
  top: 20%;
  transform: translate(0, -20%);
`;

const Spring3 = styled(Spring)`
  bottom: 20%;
  transform: translate(0, 20%);
`;

const Spring4 = styled(Spring)`
  bottom: 15%;
  transform: translate(0, 15%);
`;

const Body = styled.div`
  flex: 2.75;
  border: 2px solid;
  border-radius: 20px;
  z-index: 1;
  align-self: stretch;

  display: flex;
  justify-content: stretch;
  align-items: stretch;
`;

const Menu = styled.div`
  display: flex;
  flex: 0.25;
  flex-direction: column;
  justify-content: center;
  padding-top: 32px;
  padding-bottom: 32px;
  z-index: 0;
`;

const ToHome = styled.button`
  display: flex;
  align-self: flex-end;
  width: 120%;
  height: 20%;
  margin-top: 8px;
  margin-bottom: 8px;
  border: 2px solid;
  border-radius: 20px;
  // box-shadow: 10px 10px black;
  background-color: ${props => props.color ? props.color: "white"};
  justify-content: center;
  align-items: center;
  z-index: 0;

  font-size: 20px;
  text-indent: 15px;
`;

const ToProfile = styled.button`
  display: flex;
  align-self: flex-end;
  width: 120%;
  height: 20%;
  margin-top: 8px;
  margin-bottom: 8px;
  border: 2px solid;
  border-radius: 20px;
  // box-shadow: 10px 10px black;
  background-color: ${props => props.color ? props.color: "white"};
  justify-content: center;
  align-items: center;
  z-index: 0;

  font-size: 20px;
  text-indent: 15px;
`;

const ToNotice = styled.button`
  display: flex;
  align-self: flex-end;
  width: 120%;
  height: 20%;
  margin-top: 8px;
  margin-bottom: 8px;
  border: 2px solid;
  border-radius: 20px;
  // box-shadow: 10px 10px black;
  background-color: ${props => props.color ? props.color: "white"};
  justify-content: center;
  align-items: center;
  z-index: 0;

  font-size: 20px;
  text-indent: 15px;
`;

const ToGuest = styled.button`
  display: flex;
  align-self: flex-end;
  width: 120%;
  height: 20%;
  margin-top: 8px;
  margin-bottom: 8px;
  border: 2px solid;
  border-radius: 20px;
  // box-shadow: 10px 10px black;
  background-color: ${props => props.color ? props.color: "white"};
  justify-content: center;
  align-items: center;
  z-index: 0;

  font-size: 20px;
  text-indent: 15px;
`;

const ToFriend = styled.button`
  display: flex;
  align-self: flex-end;
  width: 120%;
  height: 20%;
  margin-top: 8px;
  margin-bottom: 8px;
  border: 2px solid;
  border-radius: 20px;
  // box-shadow: 10px 10px black;
  background-color: ${props => props.color ? props.color: "white"};
  justify-content: center;
  align-items: center;
  z-index: 0;

  font-size: 20px;
  text-indent: 15px;
`;

function Minihome() {
  const params = useParams();
  const [minihomeNumber, setMinihomeNumber] = useState(null);
  const [mode, setMode] = useState(null);
  const [color, setColor] = useState([]);
  const [content, setContent] = useState(null);
  const navigate = useNavigate();

  const initMinihomeData = () => {
    setMinihomeNumber(params.minihomeNumber);
    setMode(params.mode);
  }

  const changeMinihomeData = () => {
    if (mode === 'default') {
      setContent(<Home></Home>);
      setColor(["#D9D9D9", "white", "white", "white", "white"])
    }
    if (mode === 'profile') {
      setContent(<Profile></Profile>);
      setColor(["white", "#D9D9D9", "white", "white", "white"])
    }
    if (mode === 'notice') {
      setContent(<Notice></Notice>);
      setColor(["white", "white", "#D9D9D9", "white", "white"])
    }
    if (mode === 'guest') {
      setContent(<Guest></Guest>);
      setColor(["white", "white", "white", "#D9D9D9", "white"])
    }
    if (mode === 'friend') {
      setContent(<Friend></Friend>);
      setColor(["white", "white", "white", "white", "#D9D9D9"])
    }
    navigate(`../mypage/${minihomeNumber}/${mode}`);
  }

  useEffect(() => {
    initMinihomeData();
  }, []);

  useEffect(() => {
    changeMinihomeData();
  }, [mode]);

  return (
    <Component>
      <GlobalStyle />
      <Page>
        <MinihomeLeft />
        <Springs>
          <Spring1 />
          <Spring2 />
          <Spring3 />
          <Spring4 />
        </Springs>
        <Body>{content}</Body>
        <Menu>
          <ToHome onClick={() => { setMode('default'); }} color={color[0]}>홈</ToHome>
          <ToProfile onClick={() => { setMode('profile'); }} color={color[1]}>프로필</ToProfile>
          <ToNotice onClick={() => { setMode('notice'); }} color={color[2]}>게시판</ToNotice>
          <ToGuest onClick={() => { setMode('guest'); }} color={color[3]}>방명록</ToGuest>
          <ToFriend onClick={() => { setMode('friend'); }} color={color[4]}>친구</ToFriend>
        </Menu>
      </Page>
    </Component>
  );
}

export default Minihome;
