import React, { useState } from "react";
import Board from './board.js';
import NewPost from './newPost.js';
import Post from './post.js';
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

function Notice() {
  const [mode, setMode] = useState('Board');

  let content = null;

  if (mode === 'Board') {
    content = <Board changeMode={setMode} />;
  }
  if (mode === 'NewPost') {
    content = <NewPost changeMode={setMode} />;
  }
  if (mode === 'Post') {
    content = <Post changeMode={setMode} />;
  }

  return (
    <Component>
      <GlobalStyle />
      <Page>{content}</Page>
    </Component>
  )
}

export default Notice;
