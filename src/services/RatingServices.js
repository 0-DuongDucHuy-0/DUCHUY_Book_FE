import axios from "axios";
import { axiosJWT } from "./UserServices";

export const getRatingByProduct = async (product_id) => {
    try {
        const res = await axios.get(
            `http://localhost:3001/api/rating/get-rating-by-product/${product_id}`
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};

export const createRating = async (data) => {
    console.log("123", data)
    try {
        const res = await axios.post(
            `http://localhost:3001/api/rating/create-rating`,
            data
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};