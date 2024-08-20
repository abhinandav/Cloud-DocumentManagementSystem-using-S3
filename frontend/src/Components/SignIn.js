import React,{useEffect,useState} from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { set_authentication } from '../redux/authenticationSlice';
import {jwtDecode} from 'jwt-decode';

const SignIn = () => {
  const {state}=useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [message,setMessage]=useState(null)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loginError, setLoginError] = useState('')
    const baseURL='http://127.0.0.1:8000'

    const authentication_user=useSelector(state=>(state.authentication_user))
    console.log(authentication_user.name);
    console.log('auth admin',authentication_user.isAdmin);
    console.log('name',authentication_user.isAuthenticated);
  
    useEffect(() => {
        if ((authentication_user.isAuthenticated &&!authentication_user.isAdmin && !authentication_user.isTeacher)) {
          console.log('User is already authenticated. Redirecting...');
          navigate('/');
        }
      }, [authentication_user.isAuthenticated,authentication_user.isAdmin,authentication_user.Teacher, navigate]);
      
    
      useEffect(() => {
        if (state) {
          setMessage(state)
          
        }
      }, [state, navigate])
      
    
    

    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        setEmailError('')
        setPasswordError('')
        setLoginError('')
    
        const email = event.target.email.value
        const password = event.target.password.value
    
        if (!email.trim()) {
            setEmailError('Email is required *')
        }
    
        if (!password.trim()) {
            setPasswordError('Password is required *');
        }
    
        if (password.length > 0 && password.length < 8) {
            setPasswordError('Password must be at least 8 characters *');
        }
    
        const formData = new FormData();
        formData.append('email', event.target.email.value);
        formData.append('password', event.target.password.value);
    
        try {
            const res = await axios.post(baseURL + '/login/', formData);
            console.log('Response', res)
            if (res.status === 200) {
                localStorage.setItem('access', res.data.access_token);
                localStorage.setItem('refresh', res.data.refresh_token);
                localStorage.setItem('userid', res.data.userid);
    
                console.log('logined', res.data);
                console.log('Access Token:', res.data.access_token);
                console.log('Refresh Token:', res.data.refresh_token);
    
                dispatch(
                    set_authentication({
                        name: jwtDecode(res.data.access_token).username,
                        isAuthenticated: true,
                        userid:res.data.userid,
                        isAdmin: false,
                        isActive:res.data.userid
                    })
                );
                navigate('/');
            }
    
        } catch (error) {
    
            console.error('Error during login:', error);
    
            if (error.response) {
                console.error('Response data:', error.response);
                if (error.response.status === 403) {
                    
                } else {
                    setLoginError('Invalid Credentials');
                }
            } else {
                setLoginError('Invalid Credentials');
            }
        }
    };
    
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0">   
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Sign In Access
            </h1>
            <h2 className="text-center dark:text-white">
              You must become a member to Login and access
            </h2>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLoginSubmit} method='post'>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  
                />
              </div>
              {emailError && <span className="text-md text-red-500 mt-1 mb-5">{emailError}</span>}

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  
                />
              </div>
              {passwordError ? (<>
                {passwordError && <span className="text-md text-red-500 " >{passwordError}</span>}
                </>):(<>
                {loginError && <span className="text-md text-red-500 " >{loginError}</span>}
                </>
              )}


              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
                <span className="text-sm font-medium text-teal-600 hover:underline dark:text-teal-500">
                  Forgot password?
                </span>
              </div>

              <button type="submit" className="text-white bg-teal-600 py-1.5 px-4 rounded w-full">
                SIGN IN
              </button>
            </form>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Not a member yet?{" "}
                <Link to='/register/'>
                <span className="font-medium text-teal-600 hover:underline dark:text-teal-500">
                  Sign up
                </span>
                </Link>
              </p>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
