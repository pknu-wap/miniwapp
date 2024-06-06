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
  grid-template-rows: 7fr 1fr;
  grid-template-columns: 1fr;
`;

const Table = styled.div`
  grid-row: 1;
  grid-column: 1;

  display: grid;
  grid-template-rows: repeat(11, 1fr);
  grid-template-columns: 1fr 12fr 3fr 1fr;

  justify-items: stretch;
  align-items: stretch;
`;

const CheckedIndex = styled.div`
  grid-row: 1;
  grid-column: 1;

  border-top: 2px solid #D9D9D9;
  border-bottom: 2px solid #D9D9D9;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleIndex = styled.div`
  grid-row: 1;
  grid-column: 2;
  font-size: 20px;

  border-top: 2px solid #D9D9D9;
  border-bottom: 2px solid #D9D9D9;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateIndex = styled.div`
  grid-row: 1;
  grid-column: 3;
  font-size: 20px;

  border-top: 2px solid #D9D9D9;
  border-bottom: 2px solid #D9D9D9;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ViewCountIndex = styled.div`
  grid-row: 1;
  grid-column: 4;
  font-size: 20px;

  border-top: 2px solid #D9D9D9;
  border-bottom: 2px solid #D9D9D9;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckedColumn = styled.input`
  grid-row: ${props => props.row};
  grid-column: 1;

  display: flex;
  justify-self: center;
  align-self: center;

  min-width: 20px;
  min-height: 20px;
`;

const TitleColumn = styled.div`
  grid-row: ${props => props.row};
  grid-column: 2;
  font-size: 20px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateColumn = styled.div`
  grid-row: ${props => props.row};
  grid-column: 3;
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ViewCountColumn = styled.div`
  grid-row: ${props => props.row};
  grid-column: 4;
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavBar = styled.div`
  grid-row: 2;
  grid-column: 1;

  border-top: 2px solid #D9D9D9;

  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;

  justify-items: stretch;
  align-items: stretch;
`;

const DeleteAndNewPost = styled.div`
  grid-row: 1;
  grid-column: 1;

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 10fr 1fr 1.5fr;

  justify-items: stretch;
  align-items: stretch;
`;

const Delete = styled.input`
  grid-row: 1;
  grid-column: 2;
  margin: 8px;
  margin-right: 0px;
  font-size: 16px;
  background-color: white;
  border: 2px solid #777777;
  border-radius: 8px;
  cursor: pointer;

  outline: none;

  // justify-items: center;
  // align-items: center;
`;

const ToNewPost = styled.input`
  grid-row: 1;
  grid-column: 3;
  margin: 8px;
  margin-right: 0px;
  font-size: 16px;
  background-color: white;
  border: 2px solid #777777;
  border-radius: 8px;
  cursor: pointer;

  outline: none;

  // justify-items: center;
  // align-items: center;
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

function Board(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [userNumber, setUserNumber] = useState(null);
  const [minihomeNumber, setMinihomeNumber] = useState(null);
  const [mode, setMode] = useState(null);
  const [datas, setDatas] = useState([]);
  const [indices, setIndices] = useState([]);
  const [check, setCheck] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [postNumber1, setPostNumber1] = useState(props.postNumber);
  const myData = useLocation();
  let tempData = [];

  const getParams = () => { setMinihomeNumber(params.minihomeNumber);  }
  const getMode = () => { 
    setMode(userNumber == minihomeNumber);
    if (postNumber1 !== undefined) {
      props.changeMode('Post');
      navigate(`/mypage/${minihomeNumber}/notice/${postNumber1}`);
    }
  }

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

  const getPostData = async () => {
    try {
      const response = await API.get(`post/list/${minihomeNumber}/${pageNumber}`, { withCredentials: true });
      if (response.data == null) { console.log('THIS IS NULL'); }
      console.log(response);
      for (let postIndex = 0; postIndex < response.data.length; postIndex++) {
        let date = new Date(response.data[postIndex]["date"]);
        let dateString = date.getFullYear() + "-" + String(parseInt(date.getMonth()) + 1) + "-" + date.getDate();
        tempData.push({
          postIndex: response.data[postIndex]["number"],
          title: response.data[postIndex]["title"],
          date: dateString,
          viewCount: response.data[postIndex]["viewCount"]
        });
      }
      const temp = [];
      temp.push(<CheckedIndex></CheckedIndex>);
      temp.push(<TitleIndex>제목</TitleIndex>);
      temp.push(<DateIndex>작성일</DateIndex>);
      temp.push(<ViewCountIndex>조회</ViewCountIndex>);
      for (let i = 0; i < response.data.length; i++) {
        temp.push(<CheckedColumn type="checkbox" row={i + 2} number={tempData[i]["postIndex"]} onClick={changeCheck} />);
        temp.push(<TitleColumn row={i + 2} onClick={toPost} number={tempData[i]["postIndex"]}>{tempData[i]["title"]}</TitleColumn>);
        temp.push(<DateColumn row={i + 2}>{tempData[i]["date"]}</DateColumn>);
        temp.push(<ViewCountColumn row={i + 2}>{tempData[i]["viewCount"]}</ViewCountColumn>);
      }
      setDatas(temp);
    }
    catch (error) {
      alert('ERROR');
      console.log("ERROR");
      console.log(error);
    }
  }

  const getIndices = async () => {
    try {
      let response;
      let tempIndices = [];
      let indexNumber = null;
      for (let i = 1; i < 101; i++) {
        response = await API.get(`post/list/${minihomeNumber}/${i}`, { withCredentials: true });
        if (response.data.length == 0) { indexNumber = i == 1 ? i : i - 1; break; }
      }
      for (let i = 1; i < indexNumber + 1; i++) { 
        console.log(typeof(i));
        console.log(typeof(pageNumber));
        if (i === pageNumber) { tempIndices.push(<Index type="button" value={i} color={"#0095FF"} onClick={changePageNumber}></Index>); }
        else { tempIndices.push(<Index type="button" value={i} color={"black"} onClick={changePageNumber}></Index>); }
      }
      setIndices(tempIndices);
    }
    catch (error) {
      alert('실패');
      console.log(error);
    }
  }

  const changePageNumber = (event) => { setPageNumber(parseInt(event.target.value)); }

  const changeCheck = (event) => {
    const postNumber = event.target.getAttribute('number');
    const checked = event.target.checked;
    let tempArr = []
    if (checked) { setCheck(check.push(postNumber)); }
    else {
      check.forEach(element => {
        console.log(element);
        console.log(postNumber);
        if (element !== postNumber) { tempArr.push(element); console.log('AAAAAA'); }
      })
      console.log(tempArr);
      console.log(tempArr == check);
      setCheck(tempArr);
      console.log("BBBBBB");
    }
    console.log(check);
    console.log(checked);
    // const isChecked = event.target.checked;
    // console.log(isChecked);
    // const AAA = document.getElementsByTagName("input");
    // const BBB = AAA.getAttribute("type");
    // console.log(postNumber);
    // console.log(AAA);
    // console.log(BBB);
    // for (let i = 0; i < checked.length; i++) {
    //   if (checked[i]["postIndex"] == postNumber) {
    //     let copy = checked;
    //     copy[i]["checked"] = !(copy[i]["checked"]);
    //     setChecked(copy);
    //   }
    // }
    // setChecked(prevChecked =>
    //   prevChecked.map(item =>
    //     item.postIndex === postNumber ? { ...item, checked: !item.checked } : item
    //   )
    // );
    // console.log(checked);
  }

  const toPost = (event) => {
    console.log(myData);
    const postNumber = event.target.getAttribute('number');
    props.changeMode('Post');
    navigate(`/mypage/${minihomeNumber}/notice/${postNumber}`);
  }

  const toNewPost = () => { if (mode) { props.changeMode('NewPost'); } }

  const deletePost = () => {
    if (mode) {
      for (let i = 2; i < 11; i++) {
        console.log(CheckedColumn.checked);
        console.log(datas[i * 4 + 1]);
      }
    }
  }

  useEffect(() => {
    getParams();
    getStatus();
  }, []);

  useEffect(() => {
    if (userNumber !== null && minihomeNumber !== null) { getMode(); }
  }, [userNumber, minihomeNumber]);

  useEffect(() => {
    if (mode !== null) {
      getPostData();
      getIndices();
    }
  }, [mode, pageNumber]);

  console.log(check);

  return (
    <Component>
      <GlobalStyle />
      <Page>
        <Table>
          {datas}
        </Table>
        <NavBar>
          <DeleteAndNewPost>
            <Delete type="button" value="삭제" onClick={deletePost} />
            <ToNewPost type="button" value="글쓰기" onClick={toNewPost} />
          </DeleteAndNewPost>
          <Move>
            {indices}
          </Move>
        </NavBar>
      </Page>
    </Component>
  );
}

export default Board;
