import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from '../utils/API'
import API2 from '../utils/API2'
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	*, *::before, *::after {
		box-sizing: border-box;
    padding: 0px;
    margin: 0px;
	}
`;

const Component = styled.div`
  display: flex;
  flex: 1;
  border: 2px solid;
  border-radius: 20px;
`;

const Page = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

const Title = styled.h1`
  display: flex;
  flex: 1;
  font-size: 32px;
  font-weight: 400;
  justify-content: center;
  align-items: center;

  margin-bottom: 16px;

  max-height: 100px;
`;

const Upperbox = styled.div`
  display: flex;
  flex: 0.7;
  justify-content: center;
  align-items: center;
  border: 2px solid;
  border-radius: 20px;
  max-height: 36px;
`;

const Image = styled.img`
  display: flex;
  flex: 12;
  max-width: 300px;
  max-height: 300px;
  margin: auto;
  justify-content: center;
  border: none;
  border-radius: 20px;

  margin-top: 20px;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  flex: 0.7;
  justify-content: center;
  align-items: center;
  border: 2px solid;
  border-radius: 20px;
  max-height: 36px;

  font-size: 1.5rem;
`;

const Introduction = styled.textarea`
  display: flex;
  flex: 3;
  border: 2px solid;
  border-radius: 20px;
  resize: none;
  overflow: hidden;
  font-size: 20px;
  padding: 20px;

  margin-top: 20px;
  margin-bottom: 20px;
`;

const ImageChangeAndSubmit = styled.div`
  display: flex;
  flex: 0.7;
  max-height: 36px;
  justify-content: space-between;
`;

const ImageChangeLabel = styled.label`
  display: flex;
  flex: 8;
  border: 2px solid;
  border-radius: 20px;
  font-size: 15px;
  text-indent: 0;
  cursor: pointer;

  justify-content: center;
  align-items: center;
`;

const ImageChange = styled.input`
  width: 0;
  height: 0;
`;

const Space = styled.div`
  display: flex;
  flex: 1;
`;

const Submit = styled.input`
  display: flex;
  flex: 8;
  border: 2px solid;
  border-radius: 20px;
  font-size: 15px;
  text-indent: 0;
  cursor: pointer;

  justify-content: center;
  background-color: #D9D9D9;
`;

function MinihomeLeft() {
  const params = useParams();
  const [userNumber, setUserNumber] = useState(null);
  const [minihomeNumber, setMinihomeNumber] = useState(null);
  const [mode, setMode] = useState(null);
  const [name, setName] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [pagename, setPagename] = useState('나의 미니왑피');
  const [userIntro, setUserIntro] = useState('');
  const [userImage, setUserImage] = useState('');
  const [file, setFile] = useState(null);

  const getFile = event => { setFile(event.target.files[0]); }
  const saveUserIntro = event => { setUserIntro(event.target.value); }
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
      const response = await API.get(`leftprofile/info/${minihomeNumber}`, { withCredentials: true });
      if (response.data == null) { console.log('THIS IS NULL'); }
      console.log(response);
      setName(response.data.profile.name);
      setNickname(response.data.profile.nickname);
      if (response.data.profile.pagename !== null) { setPagename(response.data.profile.pagename); }
      else { setPagename(response.data.profile.name + '의 미니왑피'); }
      setUserIntro(response.data.profile.introduction == null ? "" : String(response.data.profile.introduction));
      if (String(response.data.profile.image) === 'null') { 
        const emptyFile = new Blob([]);
        setFile(emptyFile);
        setUserImage(`${process.env.PUBLIC_URL}/profile_image.png`);
      }
      else {
        const byteString = atob(String(response.data.profile.image));
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) { ia[i] = byteString.charCodeAt(i); }
        const blob = new Blob([ia], { type: 'image/png' });
        const myFile = new File([blob], "image.png", { type: 'image/png' });
        setFile(myFile);
        setUserImage('data:image/png;base64,' + String(response.data.profile.image));
        console.log(userImage);
      }
      console.log(pagename);
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
        formData.append("name", name);
        formData.append('nickname', nickname);
        formData.append("introduction", userIntro);
        formData.append("pagename", pagename);
        formData.append("imageFile", file);
        const response = await API2.post('leftprofile/upload', formData, { withCredentials: true });
        console.log(response.data);
        alert("성공");
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
  }, [mode]);

  return (
    <Component>
      <GlobalStyle />
      <Page onSubmit={changeMinihomeData}>
        <Title>{pagename}</Title>
        <Upperbox />
        <Image src={userImage} alt="Loading..." />
        <UserInfo>{name} ({nickname})</UserInfo>
        <Introduction placeholder="내 소개" value={userIntro} onChange={saveUserIntro} readOnly={mode ? false : true}/>
        <ImageChangeAndSubmit>
          <ImageChangeLabel htmlFor="file" onClick={authCheck}>이미지 변경</ImageChangeLabel>
          <ImageChange type="file" id="file" onChange={getFile} />
          <Space />
          <Submit type='submit' value='저장' />
        </ImageChangeAndSubmit>
      </Page>
    </Component>
  )
}

export default MinihomeLeft;