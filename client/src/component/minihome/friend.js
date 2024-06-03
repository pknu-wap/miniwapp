import React from "react";
import { useState } from 'react';
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
`;

function Friend() {
  return (
    <Component>
      <GlobalStyle />
      <Page>
        
      </Page>
    </Component>
  )
}

export default Friend;