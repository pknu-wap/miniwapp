import React, { useState } from "react";
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

const Page = styled.form`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: 1fr 4fr;
  grid-template-columns: 3fr 1fr 1fr;
`;

const Title = styled.input`
  grid-row: 1;
  grid-column: 1;
  justify-self: stretch;
  align-self: end;
  padding-bottom: 40px;

  font-size: 48px;
  font-weight: 400;

  border: none;
  outline: none;

  width: 100%;
`;

const Back = styled.input`
  grid-row: 1;
  grid-column: 2;

  justify-self: stretch;
  align-self: end;

  border: 2px solid;
  border-radius: 32px;

  min-height: 52px;
  font-size: 20px;
  font-weight: 400;
  background-color: white;

  margin: 20px;
  margin-bottom: 40px;
`;

const Save = styled.input`
  grid-row: 1;
  grid-column: 3;

  justify-self: stretch;
  align-self: end;

  border: 2px solid;
  border-radius: 32px;

  min-height: 52px;
  font-size: 20px;
  font-weight: 400;
  background-color: white;

  margin: 20px;
  margin-bottom: 40px;
`;

const Content = styled.textarea`
  grid-row: 2;
  grid-column: 1 / 4;

  border-top: 2px solid #D9D9D9;
  border-bottom: none;
  border-left: none;
  border-right: none;
  outline: none;

  padding-top: 40px;
  padding-bottom: 40px;

  font-size: 24px;
  font-weight: 400;

  resize: none;
`;

function NewPost(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const changeTitle = event => { setTitle(event.target.value); }
  const changeContent = event => { setContent(event.target.value); }

  const uploadNewPost = async (event) => {
    try {
      event.preventDefault();
      const newPostData = {
        title: title,
        contents: content
      };
      const response = await API.post("/post/write", JSON.stringify(newPostData), { withCredentials: true });
      console.log(response.data);
      alert("성공");
      props.changeMode('Board')
    }
    catch (error) {
      console.log(error);
      alert('실패');
    }
  }

  return (
    <Component>
      <GlobalStyle />
      <Page onSubmit={uploadNewPost}>
        <Title type="text" placeholder="제목" onChange={changeTitle}/>
        <Back type="button" onClick={() => { props.changeMode('Board') }} value="이전" />
        <Save type="submit" value="저장" />
        <Content placeholder="내용" onChange={changeContent}/>
      </Page>
    </Component>
  )
}

export default NewPost;
