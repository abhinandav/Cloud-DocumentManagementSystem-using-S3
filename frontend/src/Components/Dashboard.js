import React, { useState } from 'react';
import DashboardHead from './DashboardHead';
import Sidebar from './Sidebar';

const Dashboard = () => {
    const [sideOpen,setSideOpen]=useState(true)
    const handleSideBar=()=>{
        setSideOpen(!sideOpen)
    }
  return (
    <div className="flex h-screen bg-gray-100">
        <Sidebar sideOpen={sideOpen} setSideOpen={setSideOpen}/>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <DashboardHead handleSideBar={handleSideBar} />
        <div className="p-4">
         mdfkljlln
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
