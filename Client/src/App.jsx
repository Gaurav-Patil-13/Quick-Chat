import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import {Toaster} from "react-hot-toast"
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import background_image_final from "./assets/background_image_final.png";

const App = () => {

  const { authUser } = useContext(AuthContext);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{ backgroundImage: `url(${background_image_final})` }}
      />

        <div className="absolute inset-0 backdrop-blur-xl bg-black/20"></div>

        <div className="relative z-10 min-h-screen w-full">
          <Toaster/>
          <Routes>
            <Route path='/' element={ authUser ? <HomePage /> : <Navigate to="/login" />} />
            <Route path='/login' element={ !authUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route path='/Profile' element={ authUser ? <ProfilePage /> : <Navigate to ="/login" /> } />
          </Routes>
        </div>
      </div>
  )
}

export default App