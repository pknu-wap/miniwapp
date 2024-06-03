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

  outline: none;

  // justify-items: center;
  // align-items: center;
`;

const Move = styled.div`
  grid-row: 2;
  grid-column: 1;
`;

function Board(props) {
  const navigate = useNavigate();


  let data = [
    { checked: 'false', title: '동해물과', date: '2024.01.01', viewcount: '1' },
    { checked: 'false', title: '백두산이', date: '2024.01.01', viewcount: '2' },
    { checked: 'false', title: '마르고 닳도록', date: '2024.01.01', viewcount: '3' },
    { checked: 'false', title: '하나님이', date: '2024.01.01', viewcount: '4' },
    { checked: 'false', title: '보우하사', date: '2024.01.01', viewcount: '5' },
    { checked: 'false', title: '우리나라 만세', date: '2024.01.01', viewcount: '6' },
    { checked: 'false', title: '무궁화', date: '2024.01.01', viewcount: '7' },
    { checked: 'false', title: '삼천리', date: '2024.01.01', viewcount: '8' },
    { checked: 'false', title: '화려강산', date: '2024.01.01', viewcount: '9' },
    { checked: 'false', title: '대한사람 대한으로 길이 보전하세', date: '2024.01.01', viewcount: '10' }
  ];

  const [datas, setDatas] = useState([]);
  const [checked, setChecked] = useState([]);
  let tempData = [];
  const { minihomeNumber } = useParams();
  const myData = useLocation();

  const getPostData = async () => {
    try {
      const tempChecked = [];
      const response = await API.get(`post/list/${minihomeNumber}`, { withCredentials: true });
      if (response.data == null) { console.log('THIS IS NULL'); }
      console.log(response);
      for (let postIndex = 0; postIndex < response.data.length; postIndex++) {
        let date = new Date(response.data[postIndex]["date"]);
        let dateString = date.getFullYear() + "-" + String(parseInt(date.getMonth()) + 1) + "-" + date.getDate();
        tempData.push({
          postIndex: response.data[postIndex]["number"],
          title: response.data[postIndex]["title"],
          date: dateString,
          viewCount: response.data[postIndex]["view_count"]
        });
      }
      const temp = [];
      temp.push(<CheckedIndex></CheckedIndex>);
      temp.push(<TitleIndex>제목</TitleIndex>);
      temp.push(<DateIndex>작성일</DateIndex>);
      temp.push(<ViewCountIndex>조회</ViewCountIndex>);
      for (let i = 0; i < response.data.length; i++) {
        temp.push(<CheckedColumn type="checkbox" row={i + 2} number={tempData[i]["postIndex"]} onChange={changeChecked}/>);
        temp.push(<TitleColumn row={i + 2} onClick={toPost} number={tempData[i]["postIndex"]}>{tempData[i]["title"]}</TitleColumn>);
        temp.push(<DateColumn row={i + 2}>{tempData[i]["date"]}</DateColumn>);
        temp.push(<ViewCountColumn row={i + 2}>{tempData[i]["viewCount"]}</ViewCountColumn>);
        tempChecked.push({
          postIndex: tempData[i]["postIndex"],
          checked: false
        });
      }
      setDatas(temp);
      setChecked(tempChecked);
    }
    catch (error) {
      alert('ERROR');
      console.log("ERROR");
      console.log(error);
    }
  }

  const changeChecked = (event) => {
    const postNumber = event.target.getAttribute('number');
    const isChecked = event.target.checked;
    console.log(isChecked);
    console.log(checked);
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

  const deletePost = () => {
    for (let i = 2; i < 11; i++) {
      console.log(CheckedColumn.checked);
      console.log(datas[i * 4 + 1]);
    }
  }

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <Component>
      <GlobalStyle />
      <Page>
        <Table>
          {datas}
        </Table>
        <NavBar>
          <DeleteAndNewPost>
            <Delete type="button" value="삭제" onClick={deletePost}/>
            <ToNewPost type="button" value="글쓰기" onClick={() => { props.changeMode('NewPost'); }}/>
          </DeleteAndNewPost>
          <Move>

          </Move>
        </NavBar>
      </Page>
    </Component>
  );
}

export default Board;
