import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthUser from './isAuthUser';


function UserPrivateRoute({ children }) {
  
  const [isAuthenticated, setIsAuthenticated] = useState({
    is_authenticated: false,
    is_admin: false,
    is_tecaher:false
  });

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await isAuthUser();
      setIsAuthenticated({
        'is_authenticated' : authInfo.isAuthenticated,
        'is_admin' : authInfo.isAdmin,  
      });
        setLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (!isAuthenticated.is_authenticated) {
    return <Navigate to="/login" />;
  }

  
  if ((isAuthenticated.is_admin || isAuthenticated.is_staff)) {
    return <Navigate to="/login" />;
  }

  return children;
}


export default UserPrivateRoute;