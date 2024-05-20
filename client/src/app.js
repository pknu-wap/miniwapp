import { useState } from "react";

import Login from './component/login.js';
import Signup from "./component/signup.js";
import Mainpage from './component/mainpage/mainpage.js';
import Minihome from './component/minihome.js';
import Loginexception from './component/loginException.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState("unknown");

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login username={username} />} />
        <Route path='/main' element={<Mainpage username={username} />} />
        <Route path='/minihome' element={<Minihome username={username}/>} />
        <Route path='/login' element={<Login setUsername={setUsername} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/loginexception' element={<Loginexception />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;