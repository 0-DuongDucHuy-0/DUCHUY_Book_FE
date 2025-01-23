import axios from "axios";
import { axiosJWT } from "./UserServices";

export const createOrder = async (user_id, data) => {
    try {
        const res = await axios.post(
            `http://localhost:3001/api/order/create-order/${user_id}`,
            data
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};

export const createTransaction = async (data) => {
    try {
        const res = await axios.post(
            `http://localhost:3001/api/transaction/create-transaction`,
            data
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};