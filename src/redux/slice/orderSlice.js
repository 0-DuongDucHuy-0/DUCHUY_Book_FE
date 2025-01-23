import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [], // Danh sách các sản phẩm trong đơn hàng
    note: "",
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addProductToOrder: (state, action) => {
            const { productId, name, price, quantity, avatar } = action.payload;
            const existingProduct = state.orders.find((product) => product.productId === productId);
            if (existingProduct) {
                existingProduct.quantity += quantity; // Tăng số lượng nếu sản phẩm đã tồn tại
            } else {
                state.orders.push({ productId, name, price, quantity, avatar }); // Thêm sản phẩm mới vào danh sách
            }
        },
        removeProductFromOrder: (state, action) => {
            const productId = action.payload;
            state.orders = state.orders.filter((product) => product.productId !== productId); // Xóa sản phẩm khỏi danh sách
        },
        updateProductQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingProduct = state.orders.find((product) => product.productId === productId);
            if (existingProduct) {
                existingProduct.quantity = quantity; // Cập nhật số lượng sản phẩm
            }
        },
        clearOrder: (state) => {
            state.orders = []; // Xóa toàn bộ đơn hàng
        },
        clearOrderById: (state, action) => {
            const productId = action.payload;
            state.orders = state.orders.filter((product) => product.productId !== productId); // Xóa sản phẩm theo productId
        },
        updateNote: (state, action) => {
            state.note = action.payload; // Cập nhật ghi chú đơn hàng
        },
    },
});

export const {
    addProductToOrder,
    removeProductFromOrder,
    updateProductQuantity,
    clearOrder,
    clearOrderById,
    updateNote
} = orderSlice.actions;

export default orderSlice.reducer;
