import React, { useState } from 'react';
import { FaFilePdf, FaFileImage, FaFileWord, FaFileExcel, FaFileAlt } from 'react-icons/fa';
import RightClickMenu from './RightClickMenu';
import axios from 'axios'
import { useSelector } from 'react-redux';



function getFileIcon(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();

  switch (extension) {
    case 'pdf':
      return <span className='text-red-800'><FaFilePdf /></span>;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <span className='text-blue-400'><FaFileImage /></span>;
    case 'doc':
    case 'docx':
      return <span className='text-blue-800'><FaFileWord /></span>;
    case 'xls':
    case 'xlsx':
      return <FaFileExcel />;
    default:
      return <FaFileAlt />;
  }
}

const ListFiles = ({ files,fetchContents}) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const folder_details = useSelector(state => state.folderSlice);
  const baseURL='http://localhost:8000'


  const handleDoubleClick = (file) => {
    if (file.file) {
      window.open(file.file, '_blank');
    } else {
      console.error('File URL is missing:', file);
    }
  };

  const handleRightClick = (event, file) => {
    event.preventDefault();
    setSelectedFile(file);
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };


  const handleRename = async (newName) => {
    if (selectedFile) {
      try {
        console.log(`/files/${selectedFile.id}/rename/`);
        await axios.patch(`http://localhost:8000/files/${selectedFile.id}/rename/`, { name: newName });
        fetchContents(folder_details.path)
      } catch (error) {
        console.error('Error renaming file:', error);
      }
    }
    handleCloseContextMenu();
  };


  const handleDelete = async () => {
    try { 
      const response = await axios.delete(`${baseURL}/files/${selectedFile.id}/delete/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
          'Content-Type':'application/json'
          
        }
      });
  
      if (response.status === 204) {
        console.log('File deleted successfully');
        fetchContents(folder_details.path)
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  return (
    <div>
      <ul className='flex flex-row'>
        {files.map(file => (
          <div 
            key={file.id} 
            className="folder-item m-3 px-20 py-5" 
            onDoubleClick={() => handleDoubleClick(file)}
            onContextMenu={(event) => handleRightClick(event, file)}
          >
            <div className="folder-icon">
              {getFileIcon(file.name)} 
            </div>
            <div className="folder-name">
              {file.name.split('.').slice(0, -1).join('.')}
            </div>

            {contextMenu && contextMenu.visible && (
              <ul
                className="context-menu"
                style={{ top: contextMenu.y, left: contextMenu.x, position: 'absolute', backgroundColor: 'white', border: '1px solid gray', zIndex: 1000 }}
                onMouseLeave={handleCloseContextMenu}
              >
                <RightClickMenu 
                  onRename={handleRename} 
                  onDelete={handleDelete} 
                  file={selectedFile}
                  name={file.name.split('.').slice(0, -1).join('.')}
                />
              </ul>
            )}
          </div>
        ))}
      </ul>

   
    </div>
  );
};

export default ListFiles;
