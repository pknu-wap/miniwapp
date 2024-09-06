import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import API from '../utils/API';

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
      stompClient.current.subscribe("/sub/chatroom/1", (message) => {
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
      });
  };

  const getUserInfo = async () => {
    try {
      const response = await API.get("/mainpage/user", { withCredentials: true });
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
    if (stompClient.current && stompClient.current.connected && inputValue) {
      const body = {
        name: name,
        nickname: nickname,
        message: inputValue
      };
      stompClient.current.send("/pub/message", {}, JSON.stringify(body));
      setInputValue('');
    } else {
      console.log("STOMP connection is not established yet.");
    }
  };
  
  const sendEnterMessage = () => {
    if (stompClient.current && stompClient.current.connected) {
      const body = {
        name: name,
        nickname: nickname,
        message: `${name}(${nickname}) 님이 입장하셨습니다.`
      };
      stompClient.current.send("/pub/enter", {}, JSON.stringify(body));
    } else {
      console.log("STOMP connection is not established yet.");
    }
  };
  
  const sendExitMessage = () => {
    if (stompClient.current && stompClient.current.connected) {
      const body = {
        name: name,
        nickname: nickname,
        message: `${name}(${nickname}) 님이 퇴장하셨습니다.`
      };
      stompClient.current.send("/pub/exit", {}, JSON.stringify(body));
    } else {
      console.log("STOMP connection is not established yet.");
    }
  };  

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (name !== null && nickname !== null) {
      connect(); // 웹소켓 연결
      fetchMessages(); // 기존 메시지 불러오기

      // 입장 메시지 전송
      sendEnterMessage();

      // 컴포넌트 언마운트 시 퇴장 메시지 전송
      return () => {
        sendExitMessage();
        disconnect();
      };
    }
  }, [name, nickname]);

  const disconnect = (event) => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  return (
    <div>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={sendMessage}>입력</button>
      </div>
      <div>
        {messages.map((item, index) => 
          (<div key={index} className="list-item">{item.name}({item.nickname}): {item.message}</div>)
        )}
      </div>
    </div>
  );
}

export default Chat;
