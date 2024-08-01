import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from '../utils/API';
import API2 from '../utils/API2'
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
  grid-template-rows: 1fr 10fr 1fr;
  grid-template-columns: 1fr 6fr 1fr;
  z-index: 1;
  background-color: white;
  border: none;
  border-radius: 20px;
`;

const Page = styled.form`
  grid-row: 2;
  grid-column: 2;

  display: grid;
  grid-template-rows: 6fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  column-gap: 20px;
  justify-content: stretch;
  align-items: stretch;
`;

const Image = styled.img`
  grid-row: 1;
  grid-column: 1;
  width: 380px;
  height: 380px;

  border: none;
  border-radius: 20px;

  justify-self: center;
  align-self: center;

  // display: flex;
  // justify-content: stretch;
  // align-items: stretch;

  max-width: 380px;
  max-height: 380px;
`;

const Introduction = styled.textarea`
  grid-row: 1;
  grid-column: 2;

  border: 2px solid;
  border-radius: 20px;

  resize: none;
  overflow: hidden;
  font-size: 20px;
  padding: 20px;
`;

const URL = styled.input`
  grid-row: 2;
  grid-column: 1 / 3;

  border: 2px solid;
  border-radius: 20px;
  font-size: 20px;
  text-align: center;
  align-self: center;

  min-height: 52px;
`;

const Nickname = styled.input`
  grid-row: 3;
  grid-column: 1;

  border: 2px solid;
  border-radius: 20px;
  font-size: 20px;
  text-align: center;
  align-self: center;

  min-height: 52px;
`;

const Pagename = styled.input`
  grid-row: 3;
  grid-column: 2;

  border: 2px solid;
  border-radius: 20px;
  font-size: 20px;
  text-align: center;
  align-self: center;

  min-height: 52px;
`;

const ImageChangeLabel = styled.label`
  grid-row: 4;
  grid-column: 1;

  border: 2px solid;
  border-radius: 20px;
  font-size: 20px;
  text-align: center;
  align-self: center;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 52px;
`;

const ImageChange = styled.input`
  width: 0;
  height: 0;
`;

const Submit = styled.input`
  grid-row: 4;
  grid-column: 2;

  border: 2px solid;
  border-radius: 20px;
  font-size: 20px;
  text-align: center;
  align-self: center;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 52px;
  background-color: #D9D9D9;
`;

function Profile() {
  const params = useParams();
  const [userNumber, setUserNumber] = useState(null);
  const [minihomeNumber, setMinihomeNumber] = useState(null);
  const [mode, setMode] = useState(null);
  const [userIntro, setUserIntro] = useState('');
  const [link, setLink] = useState(null);
  const [nickname, setNickname] = useState('');
  const [pagename, setPagename] = useState('나의 미니왑피');
  const [userImage, setUserImage] = useState('');
  const [file, setFile] = useState(null);

  const saveUserIntro = event => { setUserIntro(event.target.value); };
  const saveLink = event => { setLink(event.target.value); };
  const saveNickname = event => { setNickname(event.target.value); };
  const savePagename = event => { setPagename(event.target.value); };
  const getFile = event => { setFile(event.target.files[0]); }
  const getParams = () => { setMinihomeNumber(params.minihomeNumber); }
  const getMode = () => { setMode(userNumber == minihomeNumber); }
  const authCheck = event => { if (!mode) { event.preventDefault(); } }

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

  const getMinihomeData = async () => {
    try {
      console.log(minihomeNumber);
      const response = await API.get(`/rightprofile/info/${minihomeNumber}`, { withCredentials: true });
      const response2 = await API.get(`/leftprofile/info/${minihomeNumber}`, { withCredentials: true });
      if (response.data == null) { console.log('THIS IS NULL'); }
      console.log(response);
      setUserIntro(response.data.contents == null ? "" : response.data.contents);
      if (response.data.youtubelink !== 'null') { setLink(response.data.youtubelink); }
      setNickname(response.data.nickname);
      if (response.data.pagename !== null) { setPagename(response.data.pagename); }
      else { setPagename(response2.data.profile.name + '의 미니왑피'); }
      if (String(response.data.image) === 'null') {  // 빈 파일 생성해서 formData에 append
        const emptyFile = new Blob([]);
        setFile(emptyFile);
        setUserImage(`${process.env.PUBLIC_URL}/profile_image.png`);
      }
      else { // base64를 file object로 변환해서 formData에 append
        const byteString = atob(String(response.data.image));
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) { ia[i] = byteString.charCodeAt(i); }
        const blob = new Blob([ia], { type: 'image/png' });
        const myFile = new File([blob], "image.png", { type: 'image/png' });
        setFile(myFile);
        setUserImage('data:image/png;base64,' + String(response.data.image));
      }
    }
    catch (error) {
      alert('ERROR');
      console.log("ERROR");
      console.log(error);
    }
  }

  const changeMinihomeData = async (event) => {
    try {
      event.preventDefault();
      if (mode) {
        console.log("imageFile: " + file);
        const formData = new FormData();
        formData.append("youtubelink", link);
        formData.append("nickname", nickname);
        formData.append("pagename", pagename);
        formData.append("contents", userIntro);
        formData.append("imageFile", file);
        const response = await API2.post('/rightprofile/upload', formData, { withCredentials: true });
        alert("성공");
        console.log(response);
        window.location.reload();
      }
    }
    catch (error) {
      console.log(error);
      alert('실패');
    }
  }

  useEffect(() => {
    getParams();
    getStatus();
  }, []);

  useEffect(() => {
    if (minihomeNumber !== null && userNumber !== null) { getMode(); }
  }, [userNumber, minihomeNumber]);

  useEffect(() => {
    if (mode !== null) { getMinihomeData(); }
  }, [mode])

  return (
    <Component>
      <GlobalStyle />
      <Page onSubmit={changeMinihomeData}>
        <Image src={userImage} alt="Loading..."/>
        <Introduction placeholder="내 소개" value={userIntro} onChange={saveUserIntro} readOnly={mode ? false : true} />
        <URL type='text' placeholder="유튜브 링크" value={link} onChange={saveLink} readOnly={mode ? false : true} />
        <Nickname type='text' placeholder="별명" value={nickname} onChange={saveNickname} readOnly={mode ? false : true} />
        <Pagename type='text' placeholder="미니왑피 이름" value={pagename} onChange={savePagename} readOnly={mode ? false : true} />
        <ImageChangeLabel htmlFor="thisFile" onClick={authCheck}>이미지 변경</ImageChangeLabel>
        <ImageChange type="file" id="thisFile" onChange={getFile} />
        <Submit type="submit" value='저장' />
      </Page>
    </Component>
  )
}

export default Profile;