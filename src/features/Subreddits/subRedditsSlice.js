import { createSlice } from "@reduxjs/toolkit";

const subredditsSlice = createSlice({
    name: 'Subreddits',
    initialState: {
        startGetSubreddits: false,
        getSubredditsSuccess: false,
        getSubredditsFailed: false
    },
    reducers: {
        loadingSubreddits: (state, payload) => {
            state.startGetSubreddits = true;
        },
        loadSubredditsSuccess: (state, payload) => {
            state.getSubredditsSuccess = true;
        },
        loadSubredditsFailure: (state, payload) => {
            state.getSubredditsFailed = true;
        }
    }
})

export default subredditsSlice.reducer;

export const{
    loadingSubreddits,
    loadSubredditsSuccess,
    loadSubredditsFailure
} = subredditsSlice.actions;