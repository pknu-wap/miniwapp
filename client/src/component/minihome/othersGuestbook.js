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
  ${props => props.mode ? 'grid-template-rows: 10fr 1fr;' : 'grid-template-rows: 3fr 7fr 1fr;'}
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;

  max-height: 724px;
`;

const Comment = styled.form`
  grid-row: 1;
  grid-column: 1;
  margin-bottom: 32px;
  justify-self: stretch;
  align-self: stretch;
  padding: 20px;
  padding-bottom: 12px;
  background-color: #D9D9D9;

  display: grid;
  grid-template-rows: 5fr 1fr;
  grid-template-columns: 8fr 1fr;
  row-gap: 4px;
  margin-bottom: 32px;

`;

const CommentContent = styled.textarea`
  grid-row: 1;
  grid-column: 1 / 3;

  display: flex;
  justify-self: stretch;
  padding: 20px;

  border: 1px solid;
  // border-radius: 20px;
  resize: none;
  overflow: hidden;
  font-size: 20px;
`;

const CommentSubmit = styled.input`
  grid-row: 2;
  grid-column: 2;

  justify-self: start;
  padding-left: 16px;
  padding-right: 16px;
  border: 1px solid;
  border-radius: 20px;
  outline: none;
`;

const WrittenComments = styled.div`
  ${props => props.mode ? 'grid-row: 1;' : 'grid-row: 2;'}
  grid-column: 1;
  justify-self: stretch;
  align-self: stretch;

  display: grid;
  justify-content: center;
  align-items: center;
  grid-auto-flow: row;
  ${props => props.mode ? 'grid-auto-rows: 33.3%;' : 'grid-auto-rows: 46.6%;'}
  grid-template-columns: 1fr;
  grid-template-rows: unset;
  overflow-y: scroll;

  row-gap: 20px;
`;

const WrittenComment = styled.form`
  width: 100%;
  grid-column: 1;
  align-self: stretch;

  display: grid;
  grid-template-rows: 1fr 3.5fr 1.5fr;
  ${props => props.mode ? 'grid-template-columns: 1fr 5.1fr;' : 'grid-template-columns: 1fr 5.3fr;'}
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

  display: grid;
  grid-template-rows: 1fr;
  ${props => props.mine ? "grid-template-columns: 6fr 1fr 1fr;" : "grid-template-columns: 1fr;"}
  padding-right: 20px;
`;

const WrittenCommentDateData = styled.div`
  grid-row: 1;
  grid-column: 1;

  display: flex;
  justify-self: start; 
  align-self: center;
`;

const WrittenCommentEdit = styled.input`
  grid-row: 1;
  grid-column: 2;

  ${props => props.mine ? "display: flex" : "display: none;"}
  justify-self: center; 
  align-self: center;
  border: none;
  outline: none;
  background-color: #D9D9D9;
  font-size: 16px;
`;

const WrittenCommentDelete = styled.input`
  grid-row: 1;
  grid-column: 3;

  ${props => props.mine ? "display: flex" : "display: none;"}
  justify-self: center;
  align-self: center;
  border: none;
  outline: none;
  background-color: #D9D9D9;
  font-size: 16px;
  color: red;
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

const WrittenCommentContent = styled.textarea`
  grid-row: 2;
  grid-column: 2;
  font-size: 20px;
  justify-self: stretch;
  align-self: stretch;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;

  padding: 20px;
`;

const WrittenCommentComment = styled.div`
  grid-row: 3;
  grid-column: 1 / 3;

  ${props => props.isNull ?
    "display: none;" :
    "display: grid; grid-template-rows: 1fr; grid-template-columns: 5fr 19fr 6fr; background-color: #D9D9D9;"
  }
`;

const WrittenCommentCommentName = styled.div`
  grid-row: 1;
  grid-column: 1;
  justify-self: center;
  align-self: center;
  font-size: 20px;

  ${props => props.isNull ? "display: none;" : ""}
`;

const WrittenCommentCommentContent = styled.div`
  grid-row: 1;
  grid-column: 2;
  justify-self: start;
  align-self: center;
  font-size: 16px;
`;

const WrittenCommentCommentDate = styled.div`
  grid-row: 1;
  grid-column: 3;
  justify-self: center;
  align-self: center;
`;

const Move = styled.div`
  ${props => props.mode ? 'grid-row: 2;' : 'grid-row: 3;'}
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

function OthersGuestbook() {
  const params = useParams();
  const [userNumber, setUserNumber] = useState(null);
  const [minihomeNumber, setMinihomeNumber] = useState(null);
  const [name, setName] = useState('');
  const [mode, setMode] = useState(null);
  const [data, setData] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [indices, setIndices] = useState([]);
  const [pages, setPages] = useState(null);

  const [commentContent0, setCommentContent0] = useState('');
  const [commentContent1, setCommentContent1] = useState('');
  const [commentContent2, setCommentContent2] = useState('');
  const [commentContent3, setCommentContent3] = useState('');
  const [commentContent4, setCommentContent4] = useState('');

  const saveCommentContent = event => { setCommentContent(event.target.value); }
  const changePageIndex = event => { setPageIndex(parseInt(event.target.value)); }
  const getParams = () => { setMinihomeNumber(params.minihomeNumber); }

  const saveCommentContent0 = event => { setCommentContent0(event.target.value); }
  const saveCommentContent1 = event => { setCommentContent1(event.target.value); }
  const saveCommentContent2 = event => { setCommentContent2(event.target.value); }
  const saveCommentContent3 = event => { setCommentContent3(event.target.value); }
  const saveCommentContent4 = event => { setCommentContent4(event.target.value); }

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

  const getGuestbookData = async () => {
    try {
      const nameResponse = await API.get(`leftprofile/info/${minihomeNumber}`, { withCredentials: true });
      const commentResponse = await API.get(`vboard/${minihomeNumber}/${pageIndex}`, { withCredentials: true });
      setName(nameResponse.data.profile.name);
      setData(commentResponse.data);
      console.log(commentResponse.data);
    }
    catch (error) {
      alert("실패");
      console.log(error);
    }
  }

  const getIndices = async () => {
    try {
      let indicesResponse;
      let tempIndices = [];
      let indexNumber = null;
      for (let i = 1; i < 101; i++) {
        indicesResponse = await API.get(`vboard/${minihomeNumber}/${i}`, { withCredentials: true });
        if (indicesResponse.data.length == 0) { indexNumber = i == 1 ? i : i - 1; break; }
      }
      for (let i = 1; i < indexNumber + 1; i++) {
        if (i === pageIndex) { tempIndices.push(<Index type="button" value={i} color={"#0095FF"} onClick={changePageIndex}></Index>); }
        else { tempIndices.push(<Index type="button" value={i} color={"black"} onClick={changePageIndex}></Index>); }
      }
      setIndices(tempIndices);
      setPages(indexNumber);
    }
    catch (error) {
      alert('실패');
      console.log(error);
    }
  }
  const getCommentContent = () => {
    if (data.length > 0) { setCommentContent0(data[0].contents); }
    if (data.length > 1) { setCommentContent1(data[1].contents); }
    if (data.length > 2) { setCommentContent2(data[2].contents); }
    if (data.length > 3) { setCommentContent3(data[3].contents); }
    if (data.length > 4) { setCommentContent4(data[4].contents); }
  }

  const getMode = async () => {
    try {
      let response = null;
      let bool = null;
      for (let i = 1; i < pages + 1; i++) {
        response = await API.get(`vboard/${minihomeNumber}/${i}`, { withCredentials: true });
        response.data.forEach(element => { if (element.visitorNumber == userNumber) { bool = true; } });
      }
      if (bool == null) { bool = false; }
      setMode(bool);
    }
    catch (error) {
      alert("실패");
      console.log(error);
    }
  }

  // const changeData = async () => {
  //   try {
  //     const pagePost = response[pageIndex];
  //     const pagePostData = pagePost.data;
  //     let tempData = [];
  //     for (let i = 0; i < pagePostData.length; i++) {
  //       if (pagePostData[i].length !== 0) {
  //         tempData.push(
  //           <WrittenComment mode={mode}>
  //             <WrittenCommentTitle>{pagePostData[i].nickname}</WrittenCommentTitle>
  //             <WrittenCommentDate mine={pagePostData[i].visitorNumber == userNumber}>
  //               {pagePostData[i].date}
  //             </WrittenCommentDate>
  //             <WrittenCommentImage src={pagePostData[i].image == null ? `${process.env.PUBLIC_URL}/profile_image.png` : 'data:image/png;base64,' + String(pagePostData[i].image)} alt="Loading..." />
  //             <WrittenCommentContent>{pagePostData[i].contents}</WrittenCommentContent>
  //             <WrittenCommentComment>
  //               <WrittenCommentCommentContent>{pagePostData[i].comment.comment}</WrittenCommentCommentContent>
  //               <WrittenCommentCommentDate>{pagePostData[i].comment.date}</WrittenCommentCommentDate>
  //             </WrittenCommentComment>
  //           </WrittenComment>
  //         );
  //       }
  //     }
  //     console.log(response);
  //     console.log(pagePostData);
  //   }
  //   catch (error) {
  //     alert('실패');
  //     console.log(error);
  //   }
  // }

  const postComment = async (event) => {
    try {
      event.preventDefault();
      const commentData = {
        contents: commentContent
      };
      const postResponse = await API.post(`vboard/post/${minihomeNumber}`, JSON.stringify(commentData), { withCredentials: true });
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
      const commentData = {
        number: event.target.getAttribute('number'),
        contents: event.target.children[3].value
      };
      const editResponse = await API.put(`vboard/post`, JSON.stringify(commentData), { withCredentials: true });
      console.log(editResponse);
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
      const number = event.target.getAttribute("number");
      const deleteResponse = await API.delete(`vboard/post/${number}`, { withCredentials: true });
      console.log(deleteResponse);
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
    if (userNumber !== null && minihomeNumber !== null) { getIndices(); }
  }, [userNumber, minihomeNumber, pageIndex]);

  useEffect(() => {
    if (pages !== null && indices.length !== 0) { getMode(); getGuestbookData(); }
  }, [pages, indices]);

  useEffect(() => {
    if (data !== null) { getCommentContent(); }
  }, [data]);

  return (
    <Component>
      <GlobalStyle />
      <Page>
        <Title>{name}의 방명록</Title>
        <Content mode={mode}>
          {!mode &&
            <Comment onSubmit={postComment}>
              <CommentContent value={commentContent} onChange={saveCommentContent} />
              <CommentSubmit type="submit" value="등록" />
            </Comment>
          }
          <WrittenComments mode={mode}>
            {(data !== null && data.length > 0) &&
              <WrittenComment mode={mode} isNull={data[0].comment.comment == null} number={data[0].number} onSubmit={editComment}>
                <WrittenCommentTitle>{data[0].name}</WrittenCommentTitle>
                <WrittenCommentDate mine={data[0].visitorNumber == userNumber}>
                  <WrittenCommentDateData mine={data[0].visitorNumber == userNumber}>{data[0].date}</WrittenCommentDateData>
                  <WrittenCommentEdit mine={data[0].visitorNumber == userNumber} type="submit" value="수정" />
                  <WrittenCommentDelete mine={data[0].visitorNumber == userNumber} number={data[0].number} type="button" value="삭제" onClick={deleteComment} />
                </WrittenCommentDate>
                <WrittenCommentImage src={data[0].image == null ? `${process.env.PUBLIC_URL}/profile_image.png` : 'data:image/png;base64,' + String(data[0].image)} alt="Loading..." />
                <WrittenCommentContent value={commentContent0} readOnly={!(data[0].visitorNumber == userNumber)} onChange={saveCommentContent0} />
                <WrittenCommentComment isNull={data[0].comment.comment == null}>
                  <WrittenCommentCommentName isNull={data[0].comment.comment == null}>{data[0].comment.name}</WrittenCommentCommentName>
                  <WrittenCommentCommentContent>{data[0].comment.comment}</WrittenCommentCommentContent>
                  <WrittenCommentCommentDate>{data[0].comment.date}</WrittenCommentCommentDate>
                </WrittenCommentComment>
              </WrittenComment>
            }
            {(data !== null && data.length > 1) &&
              <WrittenComment mode={mode} number={data[1].number} onSubmit={editComment}>
                <WrittenCommentTitle>{data[1].name}</WrittenCommentTitle>
                <WrittenCommentDate mine={data[1].visitorNumber == userNumber}>
                  <WrittenCommentDateData mine={data[1].visitorNumber == userNumber}>{data[1].date}</WrittenCommentDateData>
                  <WrittenCommentEdit mine={data[1].visitorNumber == userNumber} type="submit" value="수정" />
                  <WrittenCommentDelete mine={data[1].visitorNumber == userNumber} number={data[1].number} type="button" value="삭제" onClick={deleteComment} />
                </WrittenCommentDate>
                <WrittenCommentImage src={data[1].image == null ? `${process.env.PUBLIC_URL}/profile_image.png` : 'data:image/png;base64,' + String(data[1].image)} alt="Loading..." />
                <WrittenCommentContent value={commentContent1} readOnly={!(data[1].visitorNumber == userNumber)} onChange={saveCommentContent1} />
                <WrittenCommentComment isNull={data[1].comment.comment == null}>
                  <WrittenCommentCommentName isNull={data[1].comment.comment == null}>{data[1].comment.name}</WrittenCommentCommentName>
                  <WrittenCommentCommentContent>{data[1].comment.comment}</WrittenCommentCommentContent>
                  <WrittenCommentCommentDate>{data[1].comment.date}</WrittenCommentCommentDate>
                </WrittenCommentComment>
              </WrittenComment>
            }
            {(data !== null && data.length > 2) &&
              <WrittenComment mode={mode} number={data[2].number} onSubmit={editComment}>
                <WrittenCommentTitle>{data[2].name}</WrittenCommentTitle>
                <WrittenCommentDate mine={data[2].visitorNumber == userNumber}>
                  <WrittenCommentDateData mine={data[2].visitorNumber == userNumber}>{data[2].date}</WrittenCommentDateData>
                  <WrittenCommentEdit mine={data[2].visitorNumber == userNumber} type="submit" value="수정" />
                  <WrittenCommentDelete mine={data[2].visitorNumber == userNumber} number={data[2].number} type="button" value="삭제" onClick={deleteComment} />
                </WrittenCommentDate>
                <WrittenCommentImage src={data[2].image == null ? `${process.env.PUBLIC_URL}/profile_image.png` : 'data:image/png;base64,' + String(data[2].image)} alt="Loading..." />
                <WrittenCommentContent value={commentContent2} readOnly={!(data[2].visitorNumber == userNumber)} onChange={saveCommentContent2} />
                <WrittenCommentComment isNull={data[2].comment.comment == null}>
                  <WrittenCommentCommentName isNull={data[2].comment.comment == null}>{data[2].comment.name}</WrittenCommentCommentName>
                  <WrittenCommentCommentContent>{data[2].comment.comment}</WrittenCommentCommentContent>
                  <WrittenCommentCommentDate>{data[2].comment.date}</WrittenCommentCommentDate>
                </WrittenCommentComment>
              </WrittenComment>
            }
            {(data !== null && data.length > 3) &&
              <WrittenComment mode={mode} number={data[3].number} onSubmit={editComment}>
                <WrittenCommentTitle>{data[3].name}</WrittenCommentTitle>
                <WrittenCommentDate mine={data[3].visitorNumber == userNumber}>
                  <WrittenCommentDateData mine={data[3].visitorNumber == userNumber}>{data[3].date}</WrittenCommentDateData>
                  <WrittenCommentEdit mine={data[3].visitorNumber == userNumber} type="submit" value="수정" />
                  <WrittenCommentDelete mine={data[3].visitorNumber == userNumber} number={data[3].number} type="button" value="삭제" onClick={deleteComment} />
                </WrittenCommentDate>
                <WrittenCommentImage src={data[3].image == null ? `${process.env.PUBLIC_URL}/profile_image.png` : 'data:image/png;base64,' + String(data[3].image)} alt="Loading..." />
                <WrittenCommentContent value={commentContent3} readOnly={!(data[3].visitorNumber == userNumber)} onChange={saveCommentContent3} />
                <WrittenCommentComment isNull={data[3].comment.comment == null}>
                  <WrittenCommentCommentName isNull={data[3].comment.comment == null}>{data[3].comment.name}</WrittenCommentCommentName>
                  <WrittenCommentCommentContent>{data[3].comment.comment}</WrittenCommentCommentContent>
                  <WrittenCommentCommentDate>{data[3].comment.date}</WrittenCommentCommentDate>
                </WrittenCommentComment>
              </WrittenComment>
            }
            {(data !== null && data.length > 4) &&
              <WrittenComment mode={mode} number={data[4].number} onSubmit={editComment}>
                <WrittenCommentTitle>{data[4].name}</WrittenCommentTitle>
                <WrittenCommentDate mine={data[4].visitorNumber == userNumber}>
                  <WrittenCommentDateData mine={data[4].visitorNumber == userNumber}>{data[4].date}</WrittenCommentDateData>
                  <WrittenCommentEdit mine={data[4].visitorNumber == userNumber} type="submit" value="수정" />
                  <WrittenCommentDelete mine={data[4].visitorNumber == userNumber} number={data[4].number} type="button" value="삭제" onClick={deleteComment} />
                </WrittenCommentDate>
                <WrittenCommentImage src={data[4].image == null ? `${process.env.PUBLIC_URL}/profile_image.png` : 'data:image/png;base64,' + String(data[4].image)} alt="Loading..." />
                <WrittenCommentContent value={commentContent4} readOnly={!(data[4].visitorNumber == userNumber)} onChange={saveCommentContent4} />
                <WrittenCommentComment isNull={data[4].comment.comment == null}>
                  <WrittenCommentCommentName isNull={data[4].comment.comment == null}>{data[4].comment.name}</WrittenCommentCommentName>
                  <WrittenCommentCommentContent>{data[4].comment.comment}</WrittenCommentCommentContent>
                  <WrittenCommentCommentDate>{data[4].comment.date}</WrittenCommentCommentDate>
                </WrittenCommentComment>
              </WrittenComment>
            }
          </WrittenComments>
          <Move mode={mode}>{indices}</Move>
        </Content>
      </Page>
    </Component>
  )
}

export default OthersGuestbook;
