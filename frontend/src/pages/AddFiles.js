import React, { useEffect, useRef } from 'react';
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
import { useSelector } from 'react-redux';

function AddFiles({fetchContents}) {
  const fileInputRef = useRef(null);
  const baseURL = 'http://127.0.0.1:8000';
  const folder_details = useSelector(state => state.folderSlice);

  const handleClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = async (event) => {
    const files = event.target.files; 
    if (files.length === 0) return;
    
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
        formData.append('name', files[i].name); 
        formData.append('folder', folder_details.folderid); 
    }

    try {
        const token = localStorage.getItem('access');
        const response = await axios.post(`${baseURL}/upload/`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200 || response.status === 201) { 
          fetchContents(folder_details.path)
          console.log(folder_details.path);
          
        }
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
        } else {
            console.error('Error uploading files:', error);
        }
    }
};



  return (
    <>
      <span 
        onClick={handleClick} 
        className="cursor-pointer flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
      >
        <span className="h-6 w-6 mr-2 mt-2">
          <FaPlus/>
        </span>
        Import Files
      </span> 
      <input 
        type="file"  
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
        multiple 
      />   
    </>
  );
}

export default AddFiles;
