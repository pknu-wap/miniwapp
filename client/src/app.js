import Login from './component/login/login.js';
import Signup from "./component/signup/signup.js";
import Mainpage from './component/mainpage/mainpage.js';
import Minihome from './component/minihome/minihome.js';
import Loginexception from './component/loginException/loginException.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {

  // "/users/:id" => <Users /> // useParams().id

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/main' element={<Mainpage />} />
        <Route exact path='/mypage/:minihomeNumber/:mode' element={<Minihome />} />
        <Route exact path='/mypage/:minihomeNumber/notice/:postNumber' element={<Minihome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/loginexception' element={<Loginexception />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;