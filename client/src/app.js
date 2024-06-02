import { useState } from "react";
import Login from './component/login/login.js';
import Signup from "./component/signup/signup.js";
import Mainpage from './component/mainpage/mainpage.js';
import Minihome from './component/minihome/minihome.js';
import Loginexception from './component/loginException/loginException.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState("unknown");

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login setUsername={setUsername} />} />
        <Route path='/main' element={<Mainpage />} />
        <Route path='/mypage' element={<Minihome/>} />
        <Route path='/login' element={<Login setUsername={setUsername} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/loginexception' element={<Loginexception />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;