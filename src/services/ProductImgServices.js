import axios from "axios";
import { axiosJWT } from "./UserServices";

export const createProductImg = async (data) => {
    try {
        const res = await axios.post(
            `http://localhost:3001/api/productImage/upload-img`,
            data
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};