import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import API from '../utils/API'
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	*, *::before, *::after {
		box-sizing: border-box;
    padding: 0px;
    margin: 0px;
	}
`;

const Component = styled.div` 
  width: 100%;
  height: 100%;
`;

const Page = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: 2.5fr 1.5fr 1fr;
  grid-template-columns: 1fr;
`;

function OthersGuestbook() {
  const params = useParams();
  const [userNumber, setUserNumber] = useState(null);
  const [minihomeNumber, setMinihomeNumber] = useState(null);
  const [response, setResponse] = useState(['not_inited']);
  const [pageResponse, setPageResponse] = useState([]);
  const [mode, setMode] = useState(false);

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

  const getGuestbookData = async () => {
    try {
      let tempResponse = []
      for (let i = 1; i < 6; i++) {
        tempResponse[i] = await API.get(`vboard/${minihomeNumber}/${i}`, { withCredentials: true });
      }
      setResponse(tempResponse);
      console.log(response);
    }
    catch (error) {
      alert("실패");
      console.log(error);
    }
  }

  const getIsWritten = () => {
    response.forEach(element => {
      if (element !== null) {
        setPageResponse(element.data.vboard);
        pageResponse.forEach(element => {
          if (element.visitorNumber === userNumber) { setMode(true); }
        })
      }
    });
  }

  useEffect(() => {
    getParams();
  }, []);

  useEffect(() => {
    if (userNumber !== null && minihomeNumber !== null) { getGuestbookData(); }
  }, [userNumber, minihomeNumber]);

  useEffect(() => {
    if (response[0] !== 'not_inited') { getIsWritten(); }
  }, [response]);

  return (
    <Component>
      <GlobalStyle />
      <Page>
        
      </Page>
    </Component>
  )
}

export default OthersGuestbook;
