import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from '../utils/API'
import styled, { createGlobalStyle } from "styled-components";
import YouTube from "react-youtube";

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
  grid-template-rows: repeat(5, 1fr);
  // grid-template-columns: 6fr 1fr 1fr;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  z-index: 1;
  background-color: white;
`;

const TitleColumn = styled.div`
  grid-row: ${props => props.row};
  grid-column: 1;

  cursor: pointer;
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
  border: 2px solid;
  border-radius: 20px;
  justify-self: stretch;
  align-self: stretch;
`;

const Frame = styled.div`
  grid-row: 3;
  grid-column: 1 / 3;

  display: grid;
  justify-content: stretch;
  align-items: stretch;
`;

const Outer = styled.div`
  border: 2px solid black;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  font-size: 32px;
`;

function Home() {
  const params = useParams();
  const navigate = useNavigate();
  const [minihomeNumber, setMinihomeNumber] = useState(null);
  const [link, setLink] = useState(null);
  const [post, setPost] = useState([]);

  const getParams = () => { setMinihomeNumber(params.minihomeNumber); }

  const getMinihomeData = async () => {
    try {
      const response = await API.get(`userhome/${minihomeNumber}`, { withCredentials: true });
      if (response.data == null) { console.log('THIS IS NULL'); }
      console.log(response);
      if (response.data.youtubelink !== 'null') { setLink(response.data.youtubelink); }
      const responseData = response.data.posts;
      if (response.data == null) { console.log('THIS IS NULL'); }
      const tempPost = [];
      for (let i = 0; i < responseData.length; i++) {
        tempPost.push(<TitleColumn row={i + 1} number={responseData[i]["number"]} onClick={toPost}>{responseData[i]["title"]}</TitleColumn>);
        tempPost.push(<NameColumn row={i + 1}>{responseData[i]["name"]}</NameColumn>);
        tempPost.push(<ViewCountColumn row={i + 1}>{responseData[i]["viewCount"]}</ViewCountColumn>);
      }
      setPost(tempPost);
    }
    catch (error) {
      alert('ERROR');
      console.log("ERROR");
      console.log(error);
    }
  }

  const toPost = (event) => {
    navigate(`/mypage/${minihomeNumber}/notice/${event.target.getAttribute("number")}`);
    window.location.reload();
  }

  useEffect(() => {
    getParams();
  })

  useEffect(() => {
    if (minihomeNumber !== null) { getMinihomeData(); }
  }, [minihomeNumber]);

  return (
    <Component>
      <GlobalStyle />
      <Page>
        <PostConfig>
          <RecentPost>최근 게시글</RecentPost>
        </PostConfig>
        <Back to='../main'>메인페이지로 가기</Back>
        <Notice>{post}</Notice>
        <Frame>
          {(link === null) &&
            <Outer>
              <Inner>유튜브 임베드 링크가 설정되어있지 않습니다!</Inner><br></br>
              <Inner>프로필에서 설정해보세요!</Inner>
            </Outer>
          }
          {(link !== null) && 
            <YouTube videoId={link} opts={{ width: "560", height: "315", playerVars: { autoplay: 1,  rel: 0,  modestbranding: 1, },}} onEnd={(e)=>{e.target.stopVideo(0);}} />
          }
        </Frame>
      </Page>
    </Component>
  )
}

export default Home;
