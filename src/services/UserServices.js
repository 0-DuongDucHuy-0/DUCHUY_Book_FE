import axios from "axios";

export const axiosJWT = axios.create({
    withCredentials: true,
});

export const signInUser = async (data) => {
    try {
        const res = await axios.post(`http://localhost:3001/api/user/sign-in`, data, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error('Error signing in user:', error.response?.data || error.message);
        throw error;
    }
};

export const signUpUser = async (data) => {
    try {
        const res = await axios.post(`http://localhost:3001/api/user/sign-up`, data);
        return res.data;
    } catch (error) {
        console.error('Error signing in user:', error.response?.data || error.message);
        throw error;
    }
};

export const signOutUser = async () => {
    try {
        const res = await axios.post(`http://localhost:3001/api/user/sign-out`);
        return res.data;
    } catch (error) {
        console.error('Error signing in user:', error.response?.data || error.message);
        throw error;
    }
};

// export const updateUser = async (id, data) => {
//     try {
//         const access_token = localStorage.getItem("access_token");
//         if (!access_token) throw new Error("Access token not found");
//         console.log('Updating user', id, data, access_token);
//         const res = await axiosJWT.put(`http://localhost:3001/api/user/update-user/${id}`, data, {
//             headers: {
//                 token: `Bearer ${access_token}`,
//             },
//         });
//         return res.data;
//     } catch (error) {
//         console.error('Error signing in user:', error.response?.data || error.message);
//         throw error;
//     }
// };

export const updateUser = async (id, data) => {
    console.log('Updating user', id, data)
    try {
        const res = await axios.put(`http://localhost:3001/api/user/update-user/${id}`, data);
        return res.data;
    } catch (error) {
        console.error('Error signing in user:', error.response?.data || error.message);
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const res = await axios.post(
            `http://localhost:3001/api/user/refresh-token`,
            null, // body có thể rỗng nếu không cần payload
            {
                withCredentials: true, // Đảm bảo gửi cookie
            }
        );
        console.log("New access token received:", res);
        return res.data;
    } catch (error) {
        console.error("Error refreshing token:", error.response?.data || error.message);
        throw error;
    }
};

export const getDetailUser = async (id) => {
    try {
        // const access_token = localStorage.getItem("access_token");
        console.log('Deatail user', id);
        const res = await axiosJWT.get(`http://localhost:3001/api/user/get-detail-user/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error signing in user:', error.response?.data || error.message);
        throw error;
    }
};

export const changePassword = async (user_id, data) => {
    try {
        const res = await axios.put(`http://localhost:3001/api/user/change-password/${user_id}`, data);
        return res.data;
    } catch (error) {
        console.error('Error signing in user:', error.response?.data || error.message);
        throw error;
    }
};