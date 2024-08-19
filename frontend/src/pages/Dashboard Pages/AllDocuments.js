import React from 'react';
import ListFiles from './ListFiles';
import ListFolders from './ListFolders';
import './folder.css';
import { useDispatch  } from 'react-redux';
import { set_folder } from '../../redux/FolderSlice';

function AllDocuments({ path, folders, files, onNavigate,fetchContents }) {
  const dispatch=useDispatch()
  const breadcrumbs = path.split('/').filter(Boolean);

  const handleBreadcrumbClick = (index) => {
    const newPath = breadcrumbs.slice(0, index + 1).join('/');
    onNavigate(newPath); 
  };

  const gotohome=()=>{
    localStorage.removeItem('folderid')
    dispatch(
      set_folder({
        name: '',
        folderid: null,
        path:''
      })
    );
  }

  return (
    <div>
      <div>
        {breadcrumbs.length > 0 ? (
          <span className='flex flex-row'>
            <span onClick={() => gotohome()}
              style={{ cursor: 'pointer', textDecoration: '' }}
              >All/</span>
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                <span
                  onClick={() => handleBreadcrumbClick(index)}
                  style={{ cursor: 'pointer', textDecoration: '' }}
                >
                  {crumb}
                </span>
                {index < breadcrumbs.length - 1 && ' / '}
              </span>
            ))}
          </span>
        ) : (
          <span>All</span>
        )}
      </div>
      <ListFolders folders={folders} fetchContents={fetchContents} />
      <ListFiles files={files} fetchContents={fetchContents} />
    </div>
  );
}

export default AllDocuments;
