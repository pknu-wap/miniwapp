import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from '../utils/API'
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

  display: grid;
  grid-template-rows: 0.4fr 2fr 5fr;
  grid-template-columns: 5fr 2fr;
  row-gap: 20px;
  column-gap: 20px;
  justify-content: stretch;
  align-items: stretch;
`;

const PostConfig = styled.div`
  grid-row: 1;
  grid-column: 1;

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 3fr 1fr 1fr 3fr;
`;

const RecentPost = styled.div`
  grid-row: 1;
  grid-column: 1;
  justify-self: center;
  align-self: end;

  font-size: 24px;
  font-weight: 400;
`;

const HotPost = styled.input`
  grid-row: 1;
  grid-column: 2;
  align-self: end;
  cursor: pointer;

  font-size: 16px;

  border: none;
  background-color: white;
`;

const NewPost = styled.input`
  grid-row: 1;
  grid-column: 3;
  align-self: end;
  cursor: pointer;

  font-size: 16px;

  border: none;
  background-color: white;
`;

const Back = styled(Link)`
  grid-row: 1;
  grid-column: 2;
  border: 2px solid;
  border-radius: 20px;
  display: flex;

  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
  color: black;
  justify-content: center;
  align-items: center;
`;

const Notice = styled.div`
  grid-row: 2;
  grid-column: 1 / 3;
  border: 2px solid;
  border-radius: 20px;

  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: 6fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  z-index: 1;
  background-color: white;
`;

const TitleIndex = styled.div`
  grid-row: 1;
  grid-column: 1;
  justify-self: stretch;
  align-self: stretch;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameIndex = styled.div`
  grid-row: 1;
  grid-column: 2;
  justify-self: stretch;
  align-self: stretch;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ViewCountIndex = styled.div`
  grid-row: 1;
  grid-column: 3;
  justify-self: stretch;
  align-self: stretch;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleColumn = styled.div`
  grid-row: ${props => props.row};
  grid-column: 1;
`;

const NameColumn = styled.div`
  grid-row: ${props => props.row};
  grid-column: 2;
`;

const ViewCountColumn = styled.div`
  grid-row: ${props => props.row};
  grid-column: 3;
`;

const Video = styled.iframe`
  grid-row: 3;
  grid-column: 1 / 3;
  border: 2px solid;
  border-radius: 20px;
  justify-self: stretch;
  align-self: stretch;
`;

function Home() {
  const params = useParams();
  const [minihomeNumber, setMinihomeNumber] = useState(null);
  const [link, setLink] = useState("https://www.youtube.com/embed/pkr48S22zH0?si=kBkwVAugjKCg1EzA");
  const [mode, setMode] = useState("hot_post");
  const [post, setPost] = useState([]);
  
  const toHotPost = () => setMode("hot_post");
  const toNewPost = () => setMode("new_post");

  const getParams = () => { setMinihomeNumber(params.minihomeNumber); }

  const getMinihomeData = async () => {
    try {
      const response = await API.get(`userhome/${minihomeNumber}`, { withCredentials: true });
      if (response.data == null) { console.log('THIS IS NULL'); }
      console.log(response);
      if (response.data.youtubelink !== 'null') { setLink(response.data.youtubelink); }
    }
    catch (error) {
      alert('ERROR');
      console.log("ERROR");
      console.log(error);
    }
  }

  const getPostData = async () => {
    try {
      const response = await API.get(`mainpage/${mode}`, { withCredentials: true });
      const responseData = response.data;
      if (response.data == null) { console.log('THIS IS NULL'); }
      console.log(response);
      const tempPost = [];
      tempPost.push(<TitleIndex row={1} style={{borderBottom: "2px solid #D9D9D9"}}>제목</TitleIndex>);
      tempPost.push(<NameIndex row={1} style={{borderBottom: "2px solid #D9D9D9"}}>작성자</NameIndex>);
      tempPost.push(<ViewCountIndex row={1} style={{borderBottom: "2px solid #D9D9D9"}}>조회수</ViewCountIndex>);
      for (let i = 0; i < responseData.length; i++) {
        tempPost.push(<TitleColumn row={i + 2}>{responseData[i]["title"]}</TitleColumn>);
        tempPost.push(<NameColumn row={i + 2}>{responseData[i]["name"]}</NameColumn>);
        tempPost.push(<ViewCountColumn row={i + 2}>{responseData[i]["viewCount"]}</ViewCountColumn>);
      }
      setPost(tempPost);
    }
    catch (error) {
      alert('ERROR');
      console.log("ERROR");
      console.log(error);
    }
  }

  useEffect(() => {
    getParams();
  })

  useEffect(() => {
    if (minihomeNumber !== null) { getMinihomeData(); }
  }, [minihomeNumber]);

  useEffect(() => {
    getPostData();
  }, [mode]);

  return (
    <Component>
      <GlobalStyle />
      <Page>
        <PostConfig>
          <RecentPost>최근 게시글</RecentPost>
          <HotPost type="button" value="조회순" onClick={toHotPost}/>
          <NewPost type="button" value="최신순" onClick={toNewPost}/>
        </PostConfig>
        <Back to='../main'>메인페이지로 가기</Back>
        <Notice>{post}</Notice>
        <Video src={link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      </Page>
    </Component>
  )
}

export default Home;
