import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchQuery: '', // Lưu giá trị tìm kiếm
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload; // Cập nhật giá trị tìm kiếm
        },
        clearSearchQuery: (state) => {
            state.searchQuery = ''; // Xóa giá trị tìm kiếm
        },
    },
});

export const { setSearchQuery, clearSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
