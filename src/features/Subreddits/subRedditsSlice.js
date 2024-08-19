import { createSlice } from "@reduxjs/toolkit";
import { getSubreddits } from '../../Api/redditApi'

const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [],
        startGetSubreddits: false,
        getSubredditsSuccess: false,
        getSubredditsFailed: false
    },
    reducers: {
        loadingSubreddits: (state) => {
            state.startGetSubreddits = true;
        },
        loadSubredditsSuccess: (state, action) => {
            state.subreddits = action.payload;
            state.getSubredditsSuccess = true;
        },
        loadSubredditsFailure: (state) => {
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

// Add Redux thunk to get posts from a subreddit
export const fetchSubreddits = () => async (dispatch) => {
    try {
        dispatch(loadingSubreddits());
        const subreddits = await getSubreddits();
        dispatch(loadSubredditsSuccess(subreddits));
    } catch(error) {
        dispatch(loadSubredditsFailure());
    }
}

//Selector
export const selectSubreddits = (state) => state.subreddits.subreddits;

