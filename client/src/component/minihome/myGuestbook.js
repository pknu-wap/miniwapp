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

`;

function MyGuestbook() {
  const getData = async () => {
    try {
      const response = await API.get(`vboard/${3}/${1}`, { withCredentials: true });
      console.log(response);
      console.log('AAAAa');
    }
    catch (error) {
      console.log(error);
      alert('실패');
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <Component>
      <GlobalStyle />
      <Page>

      </Page>
    </Component>
  )
}

export default MyGuestbook;
