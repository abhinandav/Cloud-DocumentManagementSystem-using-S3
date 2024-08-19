import React, { useEffect, useState } from 'react'
import { FaPlus} from "react-icons/fa";
import axios from 'axios'
import FolderModal from './FolderModal';
import { useSelector } from 'react-redux';


function AddFolder({fetchContents}) {
  const baseURL='http://127.0.0.1:8000'
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const folder_details = useSelector(state => state.folderSlice);
  console.log('jjjjj',folder_details);
  


  const createFolder = async (event) => {
    event.preventDefault(); 
    const token = localStorage.getItem('access');
    try {
      const res = await axios.post(baseURL + '/folders/', { name: newFolderName, parent: folder_details.folderid }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (res.status === 200 || res.status === 201) { 
        setFolders([...folders, res.data]); 
        console.log(res.data);
        
        setNewFolderName(''); 
        setIsOpen(false);
        fetchContents(folder_details.path)
      }
    } catch (error) {
      console.error('Error creating folder:', error);
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: Please log in again.');
      }
    }
  };

  
  

   const handleClick=()=>{
    setIsOpen(!isOpen)
   }

  return (
    <>
    <span onClick={()=>handleClick()} className="cursor-pointer flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
        <span className="h-6 w-6 mr-2 mt-2"><FaPlus/></span>
        Create Folder
    </span>
    {isOpen &&
      <FolderModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          newFolderName={newFolderName}
          setNewFolderName={setNewFolderName}
          createFolder={createFolder}
      />
    }
    </>
  )
}

export default AddFolder