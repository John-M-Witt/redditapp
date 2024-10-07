import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
    name: 'header',
    initialState: {
        communitiesVisible: false,
    },
    reducers: {
        setCommunityVisible: (state, action) => {
            state.communitiesVisible = action.payload;
        }
    }
});

export default headerSlice.reducer;

export const { setCommunityVisible } = headerSlice.actions;

// Selector
export const communitiesVisible = state => state.header.communitiesVisible;
