import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import API from '../utils/API'
import axios from "axios";

function Redirection() {
  const code = window.location.search;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(process.env.REACT_APP_URL);
    axios.post(`${process.env.REACT_APP_URL}kakaoLogin${code}`)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('name', response.data.user_name);
        navigate('../main'); // loginSuccess
      });
  }, []);

  return <div>로그인 중입니다.</div>;
};

export default Redirection;