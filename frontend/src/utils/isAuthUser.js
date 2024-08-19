import axios from "axios";
import {jwtDecode} from 'jwt-decode';

const baseURL='http://127.0.0.1:8000'
const userid = localStorage.getItem('userid');

const updateToken = async () => {
    const refreshToken = localStorage.getItem('refresh');

    try {
        const res = await axios.post(baseURL + '/token/refresh/', {
            'refresh': refreshToken
        });

        if (res.status === 200) {
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

const fetchisAdmin = async () => {
    const token = localStorage.getItem('access');
    try {
        const res = await axios.get(baseURL + '/user-details/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('issuperuser-isauthadmin', res.data.is_superuser);
        return res.data.is_superuser;
    } catch (error) {
        return false;
    }
};

const isAuthUser = async () => {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
        return { name: null, isAuthenticated: false, isAdmin: false };
    }

    const currentTime = Date.now() / 1000;

    let decoded = jwtDecode(accessToken);

    if (decoded.exp > currentTime) {
        const checkAdmin = await fetchisAdmin();
        return { userid: userid, name: decoded.username, isAuthenticated: true, isAdmin: checkAdmin, isTeacher: false };
    } else {
        const updateSuccess = await updateToken();

        if (updateSuccess) {
            let decoded = jwtDecode(localStorage.getItem("access")); // re-fetch the token
            const checkAdmin = await fetchisAdmin();
            return { userid: userid, name: decoded.username, isAuthenticated: true, isAdmin: checkAdmin, isTeacher: false };
        } else {
            return { name: null, isAuthenticated: false, isAdmin: false };
        }
    }
};

export default isAuthUser;