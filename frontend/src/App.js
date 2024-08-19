import {BrowserRouter,Route,Routes} from 'react-router-dom'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPrivateRoute from './utils/UserPrivateRoute'
import isAuthUser from "./utils/isAuthUser";
import { set_authentication } from "./redux/authenticationSlice"; 


import Home from './Components/Home';
import Otp from './pages/Otp';
import SignUp from './Components/Signup';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Dashboard';
import AllDocuments from './pages/Dashboard Pages/AllDocuments';


function App() {
  const dispatch = useDispatch();
  const authentication_user = useSelector(state => state.authentication_user)

  const checkAuth = async () => {
    const isAuthenticated = await isAuthUser();
    dispatch(
      set_authentication({
        userid:isAuthenticated.userid,
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
        isAdmin: isAuthenticated.isAdmin,
      })
    );
  };

  useEffect(() => {
    if(!authentication_user.name)
    {
      checkAuth();  
    }
  }, [])

  return (
    <BrowserRouter>
    
      <Routes>
        <Route path='/' element={<UserPrivateRoute><Home/></UserPrivateRoute>} />
        <Route path='/login' element={<SignIn/>} />
        <Route path='/register' element={<SignUp/>} />
        <Route path='/otp' element={<Otp/>} />
        <Route path='/dashboard' element={<UserPrivateRoute><Dashboard/></UserPrivateRoute>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
