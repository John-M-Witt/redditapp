import { createSlice } from "@reduxjs/toolkit";
import { getSubredditPostsApi } from '../../Api/redditApi';


export const redditPostsSlice = 
    createSlice({
        name: 'posts',
        initialState: {
            posts: [],
            selectedSubredditPath: '/r/interestingasfuck', 
            searchTerm: '',
            isLoadingPosts: false,
            failedToLoadPosts: false,
        },
        reducers:{
            setSelectedSubredditPath: (state, action) => {
                state.selectedSubredditPath = action.payload;
            },
            setSearchTerm: (state, action) => {
                state.searchTerm = action.payload;
            },
            deleteSearchTerm: (state) => {
                state.searchTerm = '';
            }},
        extraReducers: (builder) => {
            builder
                .addCase(getSubredditPostsApi.pending, state => {
                    state.isLoadingPosts = true;
                    state.failedToLoadPosts = false;
                })
                .addCase(getSubredditPostsApi.fulfilled, (state, action) => {
                    state.posts = action.payload;
                    state.isLoadingPosts = false;
                    state.failedToLoadPosts = false;    
                })
                .addCase(getSubredditPostsApi.rejected, state => {
                    state.failedToLoadPosts = true;    
                })
        } 
    });

    export default redditPostsSlice.reducer;

    export const {
        setSelectedSubredditPath,
        setSearchTerm,
        deleteSearchTerm,
    } = redditPostsSlice.actions;

// Selectors
export const subredditPosts = state => state.posts.posts;
export const subredditPath = state => state.posts.selectedSubredditPath;
export const searchTerm = state => state.posts.searchTerm;
export const loadPostsFailed = state => state.posts.failedToLoadPosts;


