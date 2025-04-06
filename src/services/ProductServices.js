import axios from "axios";
import { axiosJWT } from "./UserServices";

export const getAllProducts = async () => {
    try {
        const res = await axios.get(
            `http://localhost:3001/api/product/get-all-products`,
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};

export const getDetailProduct = async (data) => {
    try {
        const { product_id } = data
        const res = await axios.get(
            `http://localhost:3001/api/product/get-detail-product/${product_id}`,
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};

export const getAllImageById = async (id) => {
    try {
        const res = await axios.get(
            `http://localhost:3001/api/productImage/get-all-img-by-id/${id}`,
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};

export const createProduct = async (data) => {
    try {
        const res = await axios.post(
            `http://localhost:3001/api/product/create-product`,
            data
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};

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


