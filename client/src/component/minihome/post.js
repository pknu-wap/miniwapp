import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from '../utils/API';
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";

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
  grid-template-rows: 2fr 1.5fr 240px;
  grid-template-columns: 1fr;
`;

const TitleAndContent = styled.form`
  grid-row: 1;
  grid-column: 1;

  display: grid;
  grid-template-rows: 1fr 1.5fr;
  grid-template-columns: 1fr;
`;

const TitleBar = styled.div`
  grid-row: 1;
  grid-column: 1;

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 6fr 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
`;

const Title = styled.input`
  grid-row: 1;
  grid-column: 1;
  justify-self: center;
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
  justify-self: center;
  align-self: end;
  margin-bottom: 40px;
  font-size: 20px;

  background-color: white;
  border: none;
  outline: none;

  width: 100%;
`;

const ChangeOrSave = styled.input`
  grid-row: 1;
  grid-column: 3;
  justify-self: center;
  align-self: end;
  margin-bottom: 40px;
  font-size: 20px;

  background-color: white;
  border: none;
  outline: none;

  width: 100%;
`;

const Delete = styled.input`
  grid-row: 1;
  grid-column: 4;
  justify-self: center;
  align-self: end;
  margin-bottom: 40px;
  font-size: 20px;
  color: red;

  background-color: white;
  border: none;
  outline: none;

  width: 100%;
`;

const Content = styled.textarea`
  grid-row: 2;
  grid-column: 1;

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

const Comment = styled.form`
  grid-row: 2;
  grid-column: 1;

  display: grid;
  grid-template-rows: 1fr 2fr 0.7fr;
  grid-template-columns: 1fr 10fr 1.5fr;
  justify-content: center;
  align-items: center;
`;

const CommentTitle = styled.div`
  grid-row: 1;
  grid-column: 1;
  text-align: center;

  font-size: 24px;
  font-weight: 400;
`;

const CommentContent = styled.textarea`
  grid-row: 2;
  grid-column: 1 / 4;
  justify-self: stretch;
  align-self: stretch;
  padding: 20px;

  font-size: 16px;
  font-weight: 400;

  resize: none;
`;

const SaveComment = styled.input`
  grid-row: 3;
  grid-column: 3;
  justify-self: stretch;
  align-self: stretch;

  margin-top: 8px;
  margin-bottom: 8px;

  font-size: 16px;
  font-weight: 400;

  border: 2px solid black;
  border-radius: 20px;
  background-color: white;
`;

const WrittenComments = styled.div`
  grid-row: 3;
  grid-column: 1;
  justify-content: start;
  align-self: stretch;

  display: grid;
  justify-content: stretch;
  align-items: center;
  grid-auto-flow: row;
  grid-auto-rows: 30%;
  grid-template-columns: unset;
  grid-template-rows: unset;
  overflow-y: scroll;

  // max-height: 240px;
`;

const WrittenComment = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 2fr 1fr;
  justify-content: start;
  align-items: center;
`;

const WrittenCommentTitle = styled.div`
  grid-row: 1;
  grid-column: 1;

  font-size: 20px;
`;

const WrittenCommentContent = styled.div`
  grid-row: 2;
  grid-column: 1;

  font-size: 16px;
`;

const CommentDelete = styled.input`
  grid-row: 1;
  grid-column: 2;
  margin-right: 40px;
  font-size: 16px;
  background-color: white;
  border: none;
  outline: none;
  color: red;

  justify-self: end;
`;

function Post(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [minihomeNumber, setMinihomeNumber] = useState(null);
  const [postNumber, setPostNumber] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mode, setMode] = useState('readonly');
  const [comment, setComment] = useState('');
  const [writtenComment, setWrittenComment] = useState(['not_inited']);
  const [data, setData] = useState(null);

  const saveComment = event => { setComment(event.target.value); }

  const toBoard = () => {
    props.changeMode('Board');
    navigate(`/mypage/${minihomeNumber}/notice/`);
  }

  const getParams = () => {
    setMinihomeNumber(params.minihomeNumber);
    setPostNumber(params.postNumber);
  }

  const getPostData = async () => {
    try {
      const response = await API.get(`post/info/${postNumber}/${minihomeNumber}`, { withCredentials: true });
      console.log(response);
      setTitle(response.data.title);
      setContent(response.data.contents);
      setWrittenComment(response.data.comments);
    }
    catch (error) {
      console.log(error);
      alert('실패');
    }
  }

  const listComment = () => {
    let tempData = [];
    writtenComment.forEach(element => {
      tempData.push(
        <WrittenComment>
          <WrittenCommentTitle>{element.name} ({element.nickname})</WrittenCommentTitle>
          <WrittenCommentContent>{element.comment}</WrittenCommentContent>
          <CommentDelete type="button" value="삭제" index={element.number} onClick={deleteComment}></CommentDelete>
        </WrittenComment>
      );
    })
    setData(tempData);
  }

  const deletePost = async () => {
    try {
      const response = await API.delete(`post/delete/${postNumber}`, { withCredentials: true });
      console.log(response);
      props.changeMode('Board');
      navigate(`/mypage/${minihomeNumber}/notice`);
    }
    catch (error) {
      console.log(error);
      alert('실패');
    }
  }

  const writeComment = async (event) => {
    try {
      event.preventDefault();
      const newComment = {
        comment: comment
      };
      const response = await API.post(`/postco/write/${postNumber}`, JSON.stringify(newComment), { withCredentials: true });
      console.log(response);
      alert("성공");
      props.changeMode('Board');
      navigate(`/mypage/${minihomeNumber}/notice`);
    }
    catch (error) {
      console.log(error);
      alert('실패');
    }
  }

  const deleteComment = async (event) => {
    try {
      const response = await API.delete(`/postco/delete/${event.target.getAttribute("index")}/${postNumber}`, { withCredentials: true });
      console.log(response);
      props.changeMode('Board');
      navigate(`/mypage/${minihomeNumber}/notice`);
    }
    catch (error) {
      console.log(error);
      alert('실패');
    }
  }

  useEffect(() => {
    getParams();
  }, []);

  useEffect(() => {
    if (minihomeNumber !== null && postNumber !== null) { getPostData(); }
  }, [minihomeNumber, postNumber]);

  useEffect(() => {
    if (writtenComment !== null) { listComment(); }
  }, [writtenComment])

  return (
    <Component>
      <GlobalStyle />
      <Page>
        <TitleAndContent>
          <TitleBar>
            <Title type="text" placeholder="제목" value={title} />
            <Back type="button" value="이전" onClick={toBoard} />
            <ChangeOrSave type="button" value="수정" onClick={() => { alert('미구현'); }}/>
            <Delete type="button" value="삭제" onClick={deletePost} />
          </TitleBar>
          <Content placeholder="내용" value={content} />
        </TitleAndContent>
        <Comment onSubmit={writeComment}>
          <CommentTitle>댓글</CommentTitle>
          <CommentContent placeholder="댓글" value={comment} onChange={saveComment} />
          <SaveComment type="submit" value="저장" />
        </Comment>
        <WrittenComments>{data}</WrittenComments>
      </Page>
    </Component>
  )
}

export default Post;
