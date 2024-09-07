import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import API from '../utils/API';
import styled from "styled-components";

const Component = styled.div``;

const Input = styled.div``;

const Messages = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const Users = styled.div`

`;

axios.defaults.withCredentials = true;

function Chat() {
  const stompClient = useRef(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState(null);
  const [nickname, setNickname] = useState(null);

  const getSession = () => {

  }

  const getUserInfo = async () => {
    try {
      const response = await API.get(`/mainpage/user`, { withCredentials: true });
      if (response.data.name !== 'null') {
        console.log(response.data);
        setName(response.data.name);
        sessionStorage.setItem('name', response.data.name); // sessionStorage에 저장
      }
      if (response.data.nickname !== 'null') {
        setNickname(response.data.nickname);
        sessionStorage.setItem('nickname', response.data.nickname); // sessionStorage에 저장
      }
    } catch (error) {
      alert('ERROR');
      console.log(error);
    }
  }

  const getUserList = async () => {
    return await API.get(`/friendlist`, { withCredentials: true })
      .then((response) => {
        setUsers(response.data.data);
      });
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const connect = (userName, userNickname) => {
    const socket = new WebSocket("wss://miniwappi.shop/ws");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, frame => {
      const body = {
        name: userName,
        nickname: userNickname,
        message: '입장 메세지'
      };
      stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
      stompClient.current.subscribe(`/sub/chatroom/1`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });
  }

  const fetchMessages = () => {
    return axios.get("https://miniwappi.shop/chat")
      .then(response => {
        setMessages(response.data);
      });
  }

  const sendMessage = () => {
    if (stompClient.current && inputValue) {
      const body = {
        name: name || sessionStorage.getItem('name'),
        nickname: nickname || sessionStorage.getItem('nickname'),
        message: inputValue,
        state: null  // 일반 메시지 상태 설정
      };
      stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
      setInputValue('');
    }
  }

  // sessionStorage에서 값 로드
  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    const storedNickname = sessionStorage.getItem('nickname');
    if (storedName && storedNickname) { setName(storedName); setNickname(storedNickname); }
    else getUserInfo();
    getUserList();
  }, []);

  useEffect(() => {
    if (name !== null && nickname !== null) {
      getSession();

      connect(name, nickname);
      fetchMessages();

      const handleBeforeUnload = (event) => {
        if (stompClient.current) {
          const body = {
            name: name || sessionStorage.getItem('name'),
            nickname: nickname || sessionStorage.getItem('nickname'),
            message: '퇴장 메세지'
          };
          stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
          stompClient.current.disconnect();
          event.returnValue = '';
          return '';
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

  console.log(users);
  console.log(messages);

  return (
    <Component>
      <Input>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={sendMessage}>입력</button>
      </Input>
      <Messages>
        {messages.map((item, index) => {
          if (item.state === 0) return (<div key={index} className="list-item">{item.name}님이 입장하셨습니다.</div>);
          else if (item.state === 1) return (<div key={index} className="list-item">{item.name}님이 퇴장하셨습니다.</div>);
          else return (<div key={index} className="list-item">{item.name}({item.nickname}): {item.message}</div>)
        })}
      </Messages>
      <Users>
        {/* {users.map((item, index) => {
          return (<div key={index}>{item.name}({item.nickname})</div>)
        })} */}
      </Users>
    </Component>
  );
}

export default Chat;
