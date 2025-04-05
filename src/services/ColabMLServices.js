import axios from "axios";

const colabApi = "https://fddc-35-196-58-119.ngrok-free.app"

export const search = async (data) => {
    try {
        console.log("check", data)
        const res = await axios.post(
            `${colabApi}/match`,
            data
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};

export const toxicity = async (data) => {
    try {
        console.log("check", data)
        const res = await axios.post(
            `${colabApi}/toxicity`,
            data
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};

export const ask = async (data) => {
    try {
        console.log("check", data)
        const res = await axios.post(
            `${colabApi}/ask`,
            data
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};