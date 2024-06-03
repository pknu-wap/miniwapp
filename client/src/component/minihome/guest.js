import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API.js";
import MyGuestbook from './myGuestbook.js';
import OthersGuestbook from './othersGuestbook.js';
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
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: 1fr 60fr 1fr;
  grid-template-columns: 1fr 6fr 1fr;
  z-index: 1;
  background-color: white;
  border: none;
  border-radius: 20px;
`;

const Page = styled.div`
  grid-row: 2;
  grid-column: 2;

  width: 100%;
  height: 100%;
`;

function Guest() {
  const params = useParams();
  const [userNumber, setUserNumber] = useState(null);
  const [minihomeNumber, setMinihomeNumber] = useState(null);
  const [content, setContent] = useState(null);

  const getParams = async () => {
    try {
      const response = await API.get(`user/status`, { withCredentials: true });
      setUserNumber(response.data);
      setUserNumber(2);
      setMinihomeNumber(params.minihomeNumber);
    }
    catch (error) {
      alert('실패');
      console.log(error);
    }
  }

  const getIsOwner = () => {
    if (minihomeNumber === userNumber) { setContent(<MyGuestbook />); }
    else { setContent(<OthersGuestbook />); }
  }

  useEffect(() => {
    getParams();
  }, []);

  useEffect(() => {
    if (userNumber !== null && minihomeNumber !== null) { getIsOwner(); }
  }, [userNumber, minihomeNumber]);

  return (
    <Component>
      <GlobalStyle />
      <Page>{content}</Page>
    </Component>
  )
}

export default Guest;