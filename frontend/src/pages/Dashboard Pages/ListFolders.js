import React, { useEffect, useState } from 'react';
import { FaFolder } from 'react-icons/fa';
import { set_folder } from '../../redux/FolderSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import RightClickMenu from './RightClickMenu';

function ListFolders({ folders,fetchContents }) {
  const dispatch = useDispatch();
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const folder_details = useSelector(state => state.folderSlice);
  const baseURL='http://localhost:8000'


  const handleFolder = (folder) => {
    if (!folder || !folder.id) {
      console.error('Invalid folder data:', folder);
      return;
    }
  
    dispatch(
      set_folder({
        name: folder.name,
        folderid: folder.id,
        path: folder.full_path
      })
    );
  };

  const handleRightClick = (event, file) => {
    event.preventDefault();
    setSelectedFolder(file);
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
    if (selectedFolder) {
      try {
        console.log(`/files/${selectedFolder.id}/rename/`);
        await axios.patch(`http://localhost:8000/folder/${selectedFolder.id}/rename/`, { name: newName });
        fetchContents(folder_details.path)
      } catch (error) {
        console.error('Error renaming folder:', error);
      }
    }
    handleCloseContextMenu();
  };

  const handleDelete = async () => {
    try { 
      const response = await axios.delete(`${baseURL}/folder/${selectedFolder.id}/delete/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
          'Content-Type':'application/json'
        }
      });
  
      if (response.status === 204) {
        console.log('Folder deleted successfully');
        fetchContents(folder_details.path)
      }
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };
  

  
  return (
    <div>
      <ul className='flex flex-row'>
        {folders.map(folder => (
          <div 
            key={folder.id} 
            className="folder-item m-3 px-20 py-5" 
            onDoubleClick={() => handleFolder(folder)}
            onContextMenu={(event) => handleRightClick(event, folder)}
          >
            <div className="folder-icon">
              <FaFolder/>
            </div>
            <div className="folder-name">
              {folder.name}
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
                  file={selectedFolder}
                />
              </ul>
            )}
          </div>
        ))}
      </ul>

   
    </div>
  );
}

export default ListFolders;
