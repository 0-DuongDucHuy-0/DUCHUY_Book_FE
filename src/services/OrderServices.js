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

export const GetAllTransactionsByUser = async (data) => {
    console.log("check12", data);
    try {
        const res = await axios.post(
            `http://localhost:3001/api/transaction/get-all-transactions-by-user`,
            data
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};

export const getAllOrders = async () => {
    try {
        const res = await axios.get(`http://localhost:3001/api/order/get-all-orders`);
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};