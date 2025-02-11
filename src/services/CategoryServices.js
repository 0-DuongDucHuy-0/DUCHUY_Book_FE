import axios from "axios";
import { axiosJWT } from "./UserServices";

export const getAllCategory = async () => {
    try {
        const res = await axios.get(
            `http://localhost:3001/api/category/get-all-category`,
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};