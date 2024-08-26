import { createSlice } from "@reduxjs/toolkit";
import { getSubredditsApi } from '../../Api/redditApi';

const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [],
        isLoadingSubreddits: false,
        failedToLoadSubreddits: false
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(getSubredditsApi.pending, state => {
                state.isLoadingSubreddits = true;
                state.failedToLoadSubreddits = false;
            })
            .addCase(getSubredditsApi.fulfilled, (state, action) => {
                state.subreddits = action.payload;
                state.isLoadingSubreddits = false;
                state.failedToLoadSubreddits = false;
            })
            .addCase(getSubredditsApi.rejected, state => {
                state.failedToLoadSubreddits = true;
            });
    }
});
             

export default subredditsSlice.reducer;

//Selectors
export const selectSubreddits = state => state.subreddits.subreddits;
export const failedToLoadSubreddits = state => state.subreddits.failedToLoadSubreddits;
export const selectedSubreddit = state => state.subreddits.selectedSubreddit;


// Export action creators

export const { setSelectedSubreddit } = subredditsSlice.actions;