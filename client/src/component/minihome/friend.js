import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import API from "../utils/API"; 

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
    z-index: 0;
  }
`;

const Component = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: 1fr 50fr 4fr;
  grid-template-columns: 1fr 10fr 1fr;
  z-index: 1;
  background-color: white;
  border: none;
  border-radius: 20px;
`;

const Page = styled.div`
  grid-row: 2;
  grid-column: 2;
  overflow: hidden; 
`;

const Header = styled.div`
  padding: 20px;
  width: 100%;
  height: 10%;
  text-align: right;
`;

const TotalMember = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: bold; 
`;

const FriendsList = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  overflow-y: auto;
  padding: 10px;
`;

const FriendCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
`;

const FriendImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const FriendDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

function Friend() {
  const [totalMember, setTotalMember] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendImages, setFriendImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/friendlist', { withCredentials: true })
      .then(response => {
        console.log('API Response:', response.data);
        const { usercount, data } = response.data;
        setTotalMember(usercount);
        setFriends(data || []);
        fetchFriendImages(data);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized: Please log in.');
        } else {
          console.error('Error fetching the friends list:', error);
        }
      });
  }, []);

  const fetchFriendImages = async (friends) => {
    const images = {};
    for (const friend of friends) {
      try {
        const response = await API.get(`/user/profile/${friend.number}`, { withCredentials: true });
        images[friend.number] = 'data:image/png;base64,' + response.data.image;
      } catch (error) {
        console.error('Error fetching friend image:', error);
        images[friend.number] = "default_profile_image.png";
      }
    }
    setFriendImages(images);
  };

  const handleFriendClick = (friendNumber) => {
    console.log('Navigating to mini home of friend number:', friendNumber);
    navigate(`../mypage/${friendNumber}/default`);
  window.location.reload();
  };

  return (
    <Component>
      <GlobalStyle />
      <Page>
        <Header>
          <TotalMember>전체 회원 수 : {totalMember !== null ? totalMember : 'Loading...'}명</TotalMember>
        </Header>
        <FriendsList>
          {friends.length > 0 ? (
            friends.map(friend => (
              <FriendCard key={friend.number} onClick={() => handleFriendClick(friend.number)}>
                <FriendImage src={friendImages[friend.number] || "default_profile_image.png"} alt={friend.name} />
                <FriendDetails>
                  <div>{friend.name}</div>
                  <div>({friend.nickname})</div>
                </FriendDetails>
              </FriendCard>
            ))
          ) : (
            <div>친구 목록이 없습니다.</div>
          )}
        </FriendsList>
      </Page>
    </Component>
  );
}

export default Friend;