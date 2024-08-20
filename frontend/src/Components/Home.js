import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set_authentication } from '../redux/authenticationSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from "react-icons/fa";


const Home = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const authentication_user=useSelector(state=>state.authentication_user)


  const logout=()=>{
    localStorage.clear()
    dispatch(
      set_authentication({
        name:null,
        isAuthenticated:null,
        isAdmin:false,
      })
    )
    navigate('login')
  }

  
  return (
    <body className="bg-gradient-to-br from-gray-900 to-black">
      <div className="text-gray-300 container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
        <div className="flex justify-between">
          <h1 className="font-serif text-3xl font-medium">Home</h1>
          <div>
          <span onClick={()=>logout()} className="self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black">
            Logout
          </span>
          <span>{authentication_user.name}</span>
          </div>
        </div>

        <div className="h-32 md:h-40"></div>

        <p className="font-sans text-4xl font-bold text-gray-200 max-w-5xl lg:text-7xl lg:pr-24 md:text-6xl">
          Spend less time coding and more time creating
        </p>
        <div className="h-10"></div>
        

        <p className="max-w-2xl font-serif text-xl text-white md:text-4xl">
          <Link to='/dashboard' className='flex flex-row text-2xl '>
          <span className='text-4xl'>
          Upload Now
          </span>
          <span className='mx-2 my-1 text-4xl'>
            <FaCloudUploadAlt/>
          </span>
          </Link>
        </p>

        <div className="h-32 md:h-40"></div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p
              className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600"
            >
              Simple and easy
            </p>
            <h2 className="text-4xl font-bold">Made for devs and designers</h2>
            <div className="h-6"></div>
            <p className="font-serif text-xl text-gray-400 md:pr-10">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              autem, a recusandae vero praesentium qui impedit doloremque
              molestias necessitatibus.
            </p>
            <div className="h-8"></div>
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
              <div>
                <p className="font-semibold text-gray-400">Made with love</p>
                <div className="h-4"></div>
                <p className="font-serif text-gray-400">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Delectus labor.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-400">It's easy to build</p>
                <div className="h-4"></div>
                <p className="font-serif text-gray-400">
                  Ipsum dolor sit, amet consectetur adipisicing elit. Delectus
                  amet consectetur.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-gray-900 to-black h-96"></div>
          </div>
        </div>

        <div className="h-32 md:h-40"></div>

      </div>
    </body>
  );
};

export default Home;
