import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import API from '../utils/API';

// Axios의 기본 설정에 쿠키를 포함하도록 설정
axios.defaults.withCredentials = true;

function Chat2() {
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
      return () => disconnect();
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

export default Chat2;