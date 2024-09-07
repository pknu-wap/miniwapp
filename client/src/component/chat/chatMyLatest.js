import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import API from '../utils/API';
import styled, { createGlobalStyle } from "styled-components";

const Messages = styled.div`
  display: flex;
  // flex-direction: column;
  flex-direction: column-reverse;
`;

// Axios의 기본 설정에 쿠키를 포함하도록 설정
axios.defaults.withCredentials = true;

function Chat() {
  const stompClient = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState(null);
  const [nickname, setNickname] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const connect = () => {
    const socket = new WebSocket("wss://miniwappi.shop/ws");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, frame => {
      const body = {
        name: name,
        nickname: nickname,
        message: '입장 메세지'
      };
      stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
      stompClient.current.subscribe(`/sub/chatroom/1`, (message) => {
        console.log(message.body);
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });
  };

  const fetchMessages = () => {
    return axios.get("https://miniwappi.shop/chat")
      .then(response => {
        setMessages(response.data);
        console.log(response.data);
      });
  };

  const getUserInfo = async () => {
    try {
      const response = await API.get(`/mainpage/user`, { withCredentials: true });
      if (response.data.name !== 'null') { setName(response.data.name); }
      if (response.data.nickname !== 'null') { setNickname(response.data.nickname); }
    }
    catch (error) {
      alert('ERROR');
      console.log("ERROR");
      console.log(error);
    }
  }

  const sendMessage = () => {
    if (stompClient.current && inputValue) {
      const body = {
        name: name,
        nickname: nickname,
        message: inputValue
      };
      stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
      setInputValue('');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (name !== null && nickname !== null) {
      connect();
      fetchMessages();
      // beforeunload 이벤트 리스너 추가
      const handleBeforeUnload = (event) => {
        if (stompClient.current) {
          const body = {
            name: name,
            nickname: nickname,
            message: '퇴장 메세지'
          };
          stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));

          // stompClient.disconnect() 호출
          stompClient.current.disconnect();

          // 새로고침 방지 메시지 (선택 사항)
          // event.returnValue = '';  // 표준 방식
          // return '';  // 일부 브라우저 호환성 위해
        }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        if (stompClient.current) {
          stompClient.current.disconnect();
        }
      };
    }
  }, [name, nickname]);

  const disconnect = () => {
    if (stompClient.current) {
      const body = {
        name: name,
        nickname: nickname,
        message: '퇴장 메세지'
      };
      stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));

      // 퇴장 메시지 수신 확인을 위한 타이머 설정
      const timeoutId = setTimeout(() => {
        // 타이머가 만료되면 연결 해제
        stompClient.current.disconnect();
      }, 1000);  // 1초 후 연결 해제

      // 퇴장 메시지를 수신할 수 있도록 구독
      const subscription = stompClient.current.subscribe(`/sub/chatroom/1`, (message) => {
        const newMessage = JSON.parse(message.body);
        if (newMessage.message === '퇴장 메세지' && newMessage.name === name) {
          // 퇴장 메시지를 수신했을 때
          setMessages((prevMessages) => [...prevMessages, newMessage]);

          // 타이머 취소 및 연결 해제
          clearTimeout(timeoutId);
          subscription.unsubscribe();
          stompClient.current.disconnect();
        }
      });
    }
  };

  return (
    <div>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={sendMessage}>입력</button>
      </div>
      <Messages>
        {messages.map((item, index) => {
          if (item.message == "입장 메세지") return (<div key={index} className="list-item">{item.name}님이 입장하셨습니다.</div>);
          else if (item.message == "퇴장 메세지") return (<div key={index} className="list-item">{item.name}님이 퇴장하셨습니다.</div>);
          else return (<div key={index} className="list-item">{item.name}({item.nickname}): {item.message}</div>)
        })}
      </Messages>
    </div>
  );
}

export default Chat;