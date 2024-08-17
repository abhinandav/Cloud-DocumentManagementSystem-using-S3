import React from 'react'
import { FaPlus,FaHome } from "react-icons/fa";


function Sidebar({setSideOpen,sideOpen}) {
  return (
   <div>
     { sideOpen &&
        <div className="hidden md:flex flex-col w-64 h-screen bg-gray-800">
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <span className="text-white font-bold uppercase">Daystar Dashboard</span>
          </div>

          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800">

            <span className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                <span className="h-6 w-6 mr-2 mt-2"><FaHome/></span>
                Home
            </span>


            <span className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                <span className="h-6 w-6 mr-2 mt-2"><FaPlus/></span>
                Add New File
            </span>

              
            </nav>
          </div>
        </div>}
   </div>
  )
}

export default Sidebar