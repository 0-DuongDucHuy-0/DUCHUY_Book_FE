import axios from "axios";

export const UpLoadImg = async (file) => {
    try {
        const formData = new FormData();
        formData.append("image", file); // "image" phải khớp với tên field trong `upload.single('image')`

        const res = await axios.post(
            `http://localhost:3001/api/upload/upload-img`,
            formData,
        );
        return res.data;
    } catch (error) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }
};
