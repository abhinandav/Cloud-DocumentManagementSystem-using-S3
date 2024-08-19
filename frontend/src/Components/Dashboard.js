import React, { useEffect, useState } from 'react';
import DashboardHead from '../pages/DashboardHead';
import Sidebar from '../pages/Sidebar';
import AllDocuments from '../pages/Dashboard Pages/AllDocuments';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { set_folder } from '../redux/FolderSlice';



const Dashboard = () => {
    const [sideOpen, setSideOpen] = useState(true);
    const dispatch = useDispatch();
    const baseURL = 'http://127.0.0.1:8000';
    const token = localStorage.getItem('access');
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [path, setPath] = useState('');
    const folder_details = useSelector(state => state.folderSlice);

    const handleSideBar = () => {
        setSideOpen(!sideOpen);
    };

    useEffect(() => {
        localStorage.setItem('folderid', folder_details.folderid);
        setPath(folder_details.path);
    }, [folder_details.folderid, folder_details.path]);


    const getFolderIdFromPath = async (path) => {
        if (path === '') {
            path = '/'; 
        }
        console.log("Requesting folder ID with path:", path);
    
        try {
            const response = await axios.get(`${baseURL}/folders/get_folder_id/`, {
                params: { path },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log("Server response:", response.data);
            dispatch(
                set_folder({
                    folderid: response.data.folderid,
                    path: path
                })
            );
            return response.data.folderid;
        } catch (error) {
            console.error('Error fetching folder ID:', error.response ? error.response.data : error);
            return null;
        }
    };
    
    

  

    const fetchContents = async (currentPath = '') => {
        try {
            const folderId = await getFolderIdFromPath(currentPath);
            const folderResponse = await axios.get(`${baseURL}/folders/`, {
                params: { parent: folderId },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setFolders(folderResponse.data);

            const fileResponse = await axios.get(`${baseURL}/files/`, {
                params: { parent: folderId },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setFiles(fileResponse.data);
        } catch (error) {
            console.error('Error fetching contents:', error);
        }
    };

    useEffect(() => {
        fetchContents(path);
    }, [path]);

    const handleNavigate = (newPath) => {
        if (newPath === '') {
            newPath = '/'; 
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar sideOpen={sideOpen} setSideOpen={setSideOpen} fetchContents={fetchContents} />
            <div className="flex flex-col flex-1 overflow-y-auto">
                <DashboardHead handleSideBar={handleSideBar} />
                <div className="p-4">
                    <AllDocuments
                        path={path}
                        folders={folders}
                        files={files}
                        onNavigate={handleNavigate}
                        fetchContents={fetchContents}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
