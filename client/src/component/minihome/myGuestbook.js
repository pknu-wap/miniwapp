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
  grid-template-rows: 1fr 10fr;
  grid-template-columns: 1fr;
`;

const Title = styled.div`
  grid-row: 1;
  grid-column: 1;
  font-size: 32px;

  display: flex;
  justify-content: start;
  align-items: center;
`;

const Content = styled.div`
  grid-row: 2;
  grid-column: 1;

  display: grid;
  grid-template-rows: 10fr 1fr;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;

  max-height: 724px;
`;

const WrittenComments = styled.div`
  grid-row: 1;
  grid-column: 1;
  justify-self: stretch;
  align-self: stretch;

  display: grid;
  justify-content: center;
  align-items: center;
  grid-auto-flow: row;
  grid-auto-rows: 30%;
  grid-template-columns: 1fr;
  grid-template-rows: unset;
  overflow-y: scroll;

  row-gap: 20px;
`;

const WrittenComment = styled.div`
  width: 100%;
  grid-column: 1;
  align-self: stretch;

  display: grid;
  grid-template-rows: 1fr 3.5fr 1.5fr;
  grid-template-columns: 1fr 5.7fr;
`;

const WrittenCommentTitle = styled.div`
  grid-row: 1;
  grid-column: 1;
  font-size: 20px;
  background-color: #D9D9D9;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrittenCommentDate = styled.div`
  grid-row: 1;
  grid-column: 2;
  font-size: 16px;
  background-color: #D9D9D9;

  display: flex;
  justify-content: start;
  align-items: center;
  // padding-left: 20px;
`;

const WrittenCommentImage = styled.img`
  grid-row: 2;
  grid-column: 1;

  display: flex;
  justify-self: center;
  align-self: center;
  width: 70%;
  height: 70%;
`;

const WrittenCommentContent = styled.div`
  grid-row: 2;
  grid-column: 2;
  font-size: 20px;
  justify-self: start;
  align-self: center;

  padding-left: 20px;
`;

const WrittenCommentComment = styled.form`
  grid-row: 3;
  grid-column: 1 / 3;
  background-color: #D9D9D9;

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 10fr 2fr 1fr 1fr;
  padding: 8px;
  padding-right: 20px;
  column-gap: 8px;
`;

const WrittenCommentCommentContent = styled.input`
  grid-row: 1;
  grid-column: 1;
  border: none;
  outline: none;
  text-indent: 16px;
  font-size: 16px;
  background-color: #D9D9D9;
`;

const WrittenCommentCommentDate = styled.div`
  grid-row: 1;
  grid-column: 2;

  justify-self: center;
  align-self: center;
`;

const WrittenCommentCommentDelete = styled.input`
  grid-row: 1;
  grid-column: 3;
  background-color: #D9D9D9;
  border: none;
  font-size: 16px;
  color: red;
`;

const WrittenCommentCommentEdit = styled.input`
  grid-row: 1;
  grid-column: 4;
  background-color: #D9D9D9;
  border: none;
  font-size: 16px;
`;

const WrittenCommentForm = styled.form`
  grid-row: 3;
  grid-column: 1 / 3;
  background-color: #D9D9D9;

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 10fr 1fr;
  padding: 8px;
  column-gap: 8px;
`;

const WrittenCommentCommentInput = styled.input`
  grid-row: 1;
  grid-column: 1;
  border: none;
  outline: none;
  text-indent: 8px;
  font-size: 16px;
`;

const WrittenCommentCommentSubmit = styled.input`
  grid-row: 1;
  grid-column: 2;
  background-color: white;
  border: 1px solid black;
  font-size: 16px;
`;

const Move = styled.div`
  grid-row: 2;
  grid-column: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Index = styled.input`
  font-size: 20px;
  background-color: white;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${props => props.color};

  margin-left: 16px;
  margin-right: 16px;
`;

function MyGuestbook() {
  const params = useParams();
  const [userNumber, setUserNumber] = useState(null);
  const [minihomeNumber, setMinihomeNumber] = useState(null);
  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [indices, setIndices] = useState([]);

  const [commentContent0, setCommentContent0] = useState('');
  const [commentContent1, setCommentContent1] = useState('');
  const [commentContent2, setCommentContent2] = useState('');
  const [commentContent3, setCommentContent3] = useState('');
  const [commentContent4, setCommentContent4] = useState('');

  const [commentedContent0, setCommentedContent0] = useState('');
  const [commentedContent1, setCommentedContent1] = useState('');
  const [commentedContent2, setCommentedContent2] = useState('');
  const [commentedContent3, setCommentedContent3] = useState('');
  const [commentedContent4, setCommentedContent4] = useState('');

  const changePageIndex = (event) => { setPageIndex(parseInt(event.target.value)); }
  const getParams = () => { setMinihomeNumber(params.minihomeNumber); }

  const saveCommentContent0 = event => { setCommentContent0(event.target.value); }
  const saveCommentContent1 = event => { setCommentContent1(event.target.value); }
  const saveCommentContent2 = event => { setCommentContent2(event.target.value); }
  const saveCommentContent3 = event => { setCommentContent3(event.target.value); }
  const saveCommentContent4 = event => { setCommentContent4(event.target.value); }

  const saveCommentedContent0 = event => { setCommentedContent0(event.target.value); }
  const saveCommentedContent1 = event => { setCommentedContent1(event.target.value); }
  const saveCommentedContent2 = event => { setCommentedContent2(event.target.value); }
  const saveCommentedContent3 = event => { setCommentedContent3(event.target.value); }
  const saveCommentedContent4 = event => { setCommentedContent4(event.target.value); }

  const getStatus = async () => {
    try {
      const response = await API.get(`user/status`, { withCredentials: true });
      setUserNumber(response.data);
    }
    catch (error) {
      alert("실패");
      console.log(error);
    }
  }

  const getIndices = async () => {
    try {
      let response;
      let tempIndices = [];
      let indexNumber = null;
      for (let i = 1; i < 101; i++) {
        response = await API.get(`vboard/${minihomeNumber}/${i}`, { withCredentials: true });
        if (response.data.length == 0) { indexNumber = i == 1 ? i : i - 1; break; }
      }
      for (let i = 1; i < indexNumber + 1; i++) {
        if (i === pageIndex) { tempIndices.push(<Index type="button" value={i} color={"#0095FF"} onClick={changePageIndex}></Index>); }
        else { tempIndices.push(<Index type="button" value={i} color={"black"} onClick={changePageIndex}></Index>); }
      }
      setIndices(tempIndices);
    }
    catch (error) {
      alert('실패');
      console.log(error);
    }
  }

  const getGuestbookData = async () => {
    try {
      const nameResponse = await API.get(`leftprofile/info/${minihomeNumber}`, { withCredentials: true });
      const commentResponse = await API.get(`vboard/${minihomeNumber}/${pageIndex}`, { withCredentials: true });
      setName(nameResponse.data.profile.name);
      setData(commentResponse.data);
      console.log(commentResponse);
    }
    catch (error) {
      alert("실패");
      console.log(error);
    }
  }

  const getCommentedContent = () => {
    if (data.length > 0) { setCommentedContent0(data[0].comment.comment); }
    if (data.length > 1) { setCommentedContent1(data[1].comment.comment); }
    if (data.length > 2) { setCommentedContent2(data[2].comment.comment); }
    if (data.length > 3) { setCommentedContent3(data[3].comment.comment); }
    if (data.length > 4) { setCommentedContent4(data[4].comment.comment); }
  };

  const postComment = async (event) => {
    try {
      event.preventDefault();
      const number = event.target.getAttribute('number');
      const commentData = {
        comment: event.target[0].value
      };
      const postResponse = await API.post(`vboard/comment/${number}`, JSON.stringify(commentData), { withCredentials: true });
      console.log(postResponse);
      window.location.reload();
    }
    catch (error) {
      alert('실패');
      console.log(error);
    }
  }

  const deleteComment = async (event) => {
    try {
      event.preventDefault();
      const number = event.target.getAttribute('number');
      const postResponse = await API.delete(`vboard/comment/${number}`, { withCredentials: true });
      console.log(postResponse);
      window.location.reload();
    }
    catch (error) {
      alert('실패');
      console.log(error);
    }
  }

  const editComment = async (event) => {
    try {
      event.preventDefault();
      const number = event.target.getAttribute('number');
      const commentData = {
        comment: event.target[0].value
      };
      const postResponse = await API.put(`vboard/comment/${number}`, JSON.stringify(commentData), { withCredentials: true });
      console.log(postResponse);
      window.location.reload();
    }
    catch (error) {
      alert('실패');
      console.log(error);
    }
  }

  useEffect(() => {
    getParams();
    getStatus();
  }, []);

  useEffect(() => {
    if (minihomeNumber !== null && userNumber !== null) { getIndices(); }
  }, [userNumber, minihomeNumber, pageIndex]);

  useEffect(() => {
    if (indices.length !== 0) { getGuestbookData(); }
  }, [indices]);

  useEffect(() => {
    if (data.length !== 0) { getCommentedContent(); }
  }, [data]);

  return (
    <Component>
      <GlobalStyle />
      <Page>
        <Title>{name}의 방명록</Title>
        <Content>
          <WrittenComments>
            {data.length > 0 &&
              <WrittenComment>
                <WrittenCommentTitle>{data[0].name}</WrittenCommentTitle>
                <WrittenCommentDate>{data[0].date}</WrittenCommentDate>
                <WrittenCommentImage src={data[0].image == null ? `${process.env.PUBLIC_URL}/profile_image.png` : 'data:image/png;base64,' + String(data[0].image)} alt="Loading..." />
                <WrittenCommentContent>{data[0].contents}</WrittenCommentContent>
                {data[0].comment.comment == null &&
                  <WrittenCommentForm number={data[0].number} onSubmit={postComment}>
                    <WrittenCommentCommentInput type="text" value={commentContent0} onChange={saveCommentContent0} />
                    <WrittenCommentCommentSubmit type="submit" value="확인"/>
                  </WrittenCommentForm>
                }
                {data[0].comment.comment != null &&
                  <WrittenCommentComment number={data[0].number} onSubmit={editComment}>
                    <WrittenCommentCommentContent type="text" value={commentedContent0} onChange={saveCommentedContent0} />  
                    <WrittenCommentCommentDate>{data[0].comment.date}</WrittenCommentCommentDate>
                    <WrittenCommentCommentDelete number={data[0].number} type="button" value="삭제" onClick={deleteComment} />
                    <WrittenCommentCommentEdit type="submit" value="수정" />
                  </WrittenCommentComment>
                }
              </WrittenComment>
            }
            {data.length > 1 &&
              <WrittenComment>
                <WrittenCommentTitle>{data[1].name}</WrittenCommentTitle>
                <WrittenCommentDate>{data[1].date}</WrittenCommentDate>
                <WrittenCommentImage src={data[1].image == null ? `${process.env.PUBLIC_URL}/profile_image.png` : 'data:image/png;base64,' + String(data[1].image)} alt="Loading..." />
                <WrittenCommentContent>{data[1].contents}</WrittenCommentContent>
                {data[1].comment.comment == null &&
                  <WrittenCommentForm number={data[1].number} onSubmit={postComment}>
                    <WrittenCommentCommentInput type="text" value={commentContent1} onChange={saveCommentContent1} />
                    <WrittenCommentCommentSubmit type="submit" value="확인"/>
                  </WrittenCommentForm>
                }
                {data[1].comment.comment != null &&
                  <WrittenCommentComment number={data[1].number} onSubmit={editComment}>
                    <WrittenCommentCommentContent type="text" value={commentedContent1} onChange={saveCommentedContent1} />  
                    <WrittenCommentCommentDate>{data[1].comment.date}</WrittenCommentCommentDate>
                    <WrittenCommentCommentDelete number={data[1].number} type="button" value="삭제" onClick={deleteComment} />
                    <WrittenCommentCommentEdit type="submit" value="수정" />
                  </WrittenCommentComment>
                }
              </WrittenComment>
            }
            {data.length > 2 &&
              <WrittenComment>
                <WrittenCommentTitle>{data[2].name}</WrittenCommentTitle>
                <WrittenCommentDate>{data[2].date}</WrittenCommentDate>
                <WrittenCommentImage src={data[2].image == null ? `${process.env.PUBLIC_URL}/profile_image.png` : 'data:image/png;base64,' + String(data[2].image)} alt="Loading..." />
                <WrittenCommentContent>{data[2].contents}</WrittenCommentContent>
                {data[2].comment.comment == null &&
                  <WrittenCommentForm number={data[2].number} onSubmit={postComment}>
                    <WrittenCommentCommentInput type="text" value={commentContent2} onChange={saveCommentContent2} />
                    <WrittenCommentCommentSubmit type="submit" value="확인"/>
                  </WrittenCommentForm>
                }
                {data[2].comment.comment != null &&
                  <WrittenCommentComment number={data[2].number} onSubmit={editComment}>
                    <WrittenCommentCommentContent type="text" value={commentedContent2} onChange={saveCommentedContent2} />  
                    <WrittenCommentCommentDate>{data[2].comment.date}</WrittenCommentCommentDate>
                    <WrittenCommentCommentDelete number={data[2].number} type="button" value="삭제" onClick={deleteComment} />
                    <WrittenCommentCommentEdit type="submit" value="수정" />
                  </WrittenCommentComment>
                }
              </WrittenComment>
            }
            {data.length > 3 &&
              <WrittenComment>
                <WrittenCommentTitle>{data[3].name}</WrittenCommentTitle>
                <WrittenCommentDate>{data[3].date}</WrittenCommentDate>
                <WrittenCommentImage src={data[3].image == null ? `${process.env.PUBLIC_URL}/profile_image.png` : 'data:image/png;base64,' + String(data[3].image)} alt="Loading..." />
                <WrittenCommentContent>{data[3].contents}</WrittenCommentContent>
                {data[3].comment.comment == null &&
                  <WrittenCommentForm number={data[3].number} onSubmit={postComment}>
                    <WrittenCommentCommentInput type="text" value={commentContent3} onChange={saveCommentContent3} />
                    <WrittenCommentCommentSubmit type="submit" value="확인"/>
                  </WrittenCommentForm>
                }
                {data[3].comment.comment != null &&
                  <WrittenCommentComment number={data[3].number} onSubmit={editComment}>
                    <WrittenCommentCommentContent type="text" value={commentedContent3} onChange={saveCommentedContent3} />  
                    <WrittenCommentCommentDate>{data[3].comment.date}</WrittenCommentCommentDate>
                    <WrittenCommentCommentDelete number={data[3].number} type="button" value="삭제" onClick={deleteComment} />
                    <WrittenCommentCommentEdit type="submit" value="수정" />
                  </WrittenCommentComment>
                }
              </WrittenComment>
            }
            {data.length > 4 &&
              <WrittenComment>
                <WrittenCommentTitle>{data[4].name}</WrittenCommentTitle>
                <WrittenCommentDate>{data[4].date}</WrittenCommentDate>
                <WrittenCommentImage src={data[4].image == null ? `${process.env.PUBLIC_URL}/profile_image.png` : 'data:image/png;base64,' + String(data[4].image)} alt="Loading..." />
                <WrittenCommentContent>{data[4].contents}</WrittenCommentContent>
                {data[4].comment.comment == null &&
                  <WrittenCommentForm number={data[4].number} onSubmit={postComment}>
                    <WrittenCommentCommentInput type="text" value={commentContent4} onChange={saveCommentContent4} />
                    <WrittenCommentCommentSubmit type="submit" value="확인"/>
                  </WrittenCommentForm>
                }
                {data[4].comment.comment != null &&
                  <WrittenCommentComment number={data[4].number} onSubmit={editComment}>
                    <WrittenCommentCommentContent type="text" value={commentedContent4} onChange={saveCommentedContent4} />  
                    <WrittenCommentCommentDate>{data[4].comment.date}</WrittenCommentCommentDate>
                    <WrittenCommentCommentDelete number={data[4].number} type="button" value="삭제" onClick={deleteComment} />
                    <WrittenCommentCommentEdit type="submit" value="수정" />
                  </WrittenCommentComment>
                }
              </WrittenComment>
            }
          </WrittenComments>
          <Move>{indices}</Move>
        </Content>
      </Page>
    </Component>
  )
}

export default MyGuestbook;
