import { useState } from "react";

import Login from './component/login.js';
import Signup from "./component/signup.js";
import Verify from "./component/verify.js";
import Mainpage from "./component/mainpage.js";
import Mypage from './component/mypage.js';
import Loginexception from './component/loginException.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState("unknown");

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mainpage username={username} />} />
        <Route path='/main' element={<Mainpage username={username} />} />
        <Route path='/mypage' element={<Mypage username={username}/>} />
        <Route path='/login' element={<Login setUsername={setUsername} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/loginexception' element={<Loginexception />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;