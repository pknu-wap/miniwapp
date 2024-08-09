import Login from './component/login/login.js';
import Signup from "./component/signup/signup.js";
import Mainpage from './component/mainpage/mainpage.js';
import Minihome from './component/minihome/minihome.js';
import Loginexception from './component/loginException/loginException.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Redirection from './component/login/redirection.js';

const App = () => {

  // "/users/:id" => <Users /> // useParams().id

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/main' element={<Mainpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/loginexception' element={<Loginexception />} />
        <Route path='/kakao/callback' element={<Redirection />} />
        <Route path='/mypage/:minihomeNumber/:mode/:postNumber' element={<Minihome />} />
        <Route path='/mypage/:minihomeNumber/:mode' element={<Minihome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;