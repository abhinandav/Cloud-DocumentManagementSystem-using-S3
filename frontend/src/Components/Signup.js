import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useSelector } from "react-redux";

const SignUp = () => {
  const baseURL='http://127.0.0.1:8000'
  const navigate=useNavigate()
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [cpasswordError, setCPasswordError] = useState('')
    const [loginError, setLoginError] = useState('')

    const authentication_user=useSelector(state=>(state.authentication_user))

    useEffect(() => {
      if ((authentication_user.isAuthenticated &&!authentication_user.isAdmin && !authentication_user.isTeacher)) {
        console.log('User is already authenticated. Redirecting...');
        navigate('/');
      }
    }, [authentication_user.isAuthenticated,authentication_user.isAdmin,authentication_user.Teacher, navigate]);
    

    const handleFormSumbmit= async (event)=>{
        event.preventDefault();
    
          setEmailError('')
          setPasswordError('')
          setLoginError('')
          setUsernameError('')
          setCPasswordError('')
    
          const username=event.target.username.value
          const email=event.target.email.value
          const password=event.target.password.value
          const cpassword=event.target.cpassword.value
          const alphabeticRegex = /^[A-Za-z]+$/;
    
          if (!username.trim()) {
            setUsernameError('Username is required *')
         
          }
    
          if (!alphabeticRegex.test(username)) {
            setUsernameError('Username must contain only alphabetic characters');
            return;
          }
    
          if (username.length > 0 && username.length < 4) {
            setUsernameError('length must be atleast 4 characters *')
          }
    
          if (!email.trim()) {
            setEmailError('Email is required *')
          }
      
          if (!password.trim()) {
            setPasswordError('Password is required *');
          }
    
          if (password.length > 0 && password.length < 8) {
            setPasswordError('Password must be at least 8 characters *');
          }
    
    
          if (!cpassword.trim()) {
            setCPasswordError('Confirm Password is required *');
            return
          }
    
          if (cpassword.length > 0 && cpassword.length < 8) {
            setCPasswordError('Confirm Password must be at least 8 characters *');
            return
          }
    
          if  (String(cpassword) !== String(password)){
            setCPasswordError('Passwords are not matching!!');
            setPasswordError('Passwords are not matching!!');
            return
          }
    
    
        const formData=new FormData()
        formData.append('username',event.target.username.value)
        formData.append('email',event.target.email.value)
        formData.append('password',event.target.password.value)
        formData.append('cpassword',event.target.cpassword.value)
    
    
    
        try{
          const res = await axios.post(baseURL+'/register/', formData);
    
    
          if (res.status === 200){
            console.log('Server Response:', res.data);
            const registeredEmail = res.data.email;
            localStorage.setItem('registeredEmail', registeredEmail);
            navigate('/otp');
            console.log(' Otp Sented to your Email');
            return res;
          }
        }
        catch (error) {
          if (error.response && error.response.status === 400) {
            console.log('Error:', error.response.data);
            const errorData = error.response.data;
            if (errorData.email && errorData.email.length > 0) {
              setEmailError(errorData.email[0]);
            } else {
              setLoginError('An error occurred during registration.');
            }
          } else {
            console.log('Error:', error.message); 
          }
        }
    }
    
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0">   
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Sign Up Access
            </h1>
            <h2 className="text-center dark:text-white">
              You must become a member to Login and access
            </h2>
            <form className="space-y-4 md:space-y-6" onSubmit={handleFormSumbmit}>

            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  User name
                </label>
                <input type="text"
                  name="username"
                  id="name" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="xxxxxx" required/>
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email Address
                </label>
                <input type="email" name="email"
                  id="email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com" required/>
              </div>


              <div className="flex flex-row justify-between">
                <div className="">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                  Confirm Password
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-between"></div>
              <button type="submit" className="text-white bg-teal-600 py-1.5 px-4 rounded w-full">
                SIGN UP
              </button>

              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
               Already Have an account?{" "}
               <Link to='/login/'>
                <span className="font-medium text-teal-600 hover:underline dark:text-teal-500">
                  Sign In
                </span>
              </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
