import React, { useEffect, useState } from 'react'
import { FaHome } from "react-icons/fa";
import axios from 'axios'

import AddFolder from './AddFolder';
import AddFiles from './AddFiles';



function Sidebar({setSideOpen,sideOpen,fetchContents,}) {
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

            <AddFolder fetchContents={fetchContents}/>
            <AddFiles fetchContents={fetchContents} />
          
            </nav>
          </div>
        </div>}
   </div>
  )
}

export default Sidebar