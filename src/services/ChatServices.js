import axios from "axios";
import { axiosJWT } from "./UserServices";

export const createChat = async (data) => {
    try {
        const res = await axios.post(
            `http://localhost:3001/api/chat/create-chat`,
            data
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};

export const getAllChats = async () => {
    try {
        const res = await axios.get(`http://localhost:3001/api/chat/get-all`);
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
}

export const getAllChatsByUser = async (user_id) => {
    try {
        const res = await axios.get(`http://localhost:3001/api/chat/get-all-by-user/${user_id}`);
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
}