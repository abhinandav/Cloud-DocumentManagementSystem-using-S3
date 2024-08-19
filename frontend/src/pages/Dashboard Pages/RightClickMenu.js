import React, { useState } from 'react';
import fileDownload from 'js-file-download'
import axios from 'axios';


const RightClickMenu = ({ onRename, onDelete, file }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(file.name);
  console.log(file.file);
  
  
  

  const handleRename = () => {
    setIsEditing(true);
  };

  const handleRenameConfirm = () => {
    if (newName.trim()) {
      onRename(newName);
    }
    setIsEditing(false);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleClickOutside = (e) => {
    if (e.target.closest('.context-menu') === null) {
      setIsEditing(false);
    }
  };



  const handleDownload = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
  }
   
  
  

  return (
    <div onClick={handleClickOutside} style={{ position: 'relative' }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            onBlur={handleRenameConfirm}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRenameConfirm();
            }}
            autoFocus
          />
        </div>
      ) : (
        <div>
          <ul className="context-menu-options">
            <li 
              className="flex gap-2 p-2 hover:bg-gray-100 text-blue-800 cursor-pointer rounded"
              onClick={handleRename}
            >
              <span>Rename</span>
            </li>
            <li
              className="flex gap-2 p-2 hover:bg-gray-100 text-green-800 cursor-pointer rounded"
              onClick={() => {handleDownload(file.file,file.name)}}
            >
              <span>Download</span>
            </li>
            <li 
              className="flex gap-2 p-2 hover:bg-gray-100 text-red-800 cursor-pointer rounded"
              onClick={onDelete}
            >
              <span>Delete</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default RightClickMenu;
