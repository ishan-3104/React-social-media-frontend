import logo from './logo.svg';
import './App.css';
import Signup from './component/signup/Signup';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './component/logIn/login';
import Home from './component/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import NuserProfile from './component/NuserProfile/NuserProfile';
import Welcome from './component/welcome/Welcome';
import Proute from './component/Proute';
import LogoutProute from './component/LogoutProute';
import Forgotpassword from './component/forgotPassword/Forgotpassword';
import Videocall from './component/videocall/Videocall';
import Profile from './component/profile/Profile';
import { Provider } from 'react-redux';
import store from './store/Store'

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <Provider store={store}>
        <Routes>
          {/* <Route path='/' element ={<LogoutProute><Welcome/></LogoutProute>}/> */}
          <Route path='/' element={<LogoutProute><Signup/></LogoutProute>}/>
          <Route path='/login' element={<LogoutProute><Login/></LogoutProute>}/>
          <Route path='/forgot' element={<LogoutProute><Forgotpassword/></LogoutProute>}/>
          <Route path='/home' element={<Proute><Home/></Proute>}/>
          <Route path='/nuser' element={<Proute><NuserProfile/></Proute>}/>
          <Route path='/profile' element={<Proute><Profile/></Proute>}/>
          <Route path='/videocall' element={<Proute><Videocall/></Proute>}/>
        </Routes>
      </Provider>
    </div>
    </BrowserRouter>

  );
}

export default App;
