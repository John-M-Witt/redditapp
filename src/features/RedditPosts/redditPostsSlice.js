import { createSlice } from "@reduxjs/toolkit";
import { getSubredditPostsApi, getSearchPostsApi } from '../../Api/redditApi'; // add getSearchPosts


export const redditPostsSlice = 
    createSlice({
        name: 'posts',
        initialState: {
            posts: [],
            selectedSubredditPath: '/r/interestingasfuck', 
            searchTerm: '',
            isNewSearch: false,
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
            setNewSearch: (state, action) => {
               state.isNewSearch = action.payload; 
            },
            deleteSearchTerm: (state) => {
                state.searchTerm = '';
            }},
        extraReducers: (builder) => {
            builder
                //Posts based on subreddit links
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
                // Posts based on search term
                .addCase(getSearchPostsApi.pending, state => {
                    state.isLoadingPosts = true;
                    state.failedToLoadPosts = false;
                })
                .addCase(getSearchPostsApi.fulfilled, (state, action) => {
                     state.posts = action.payload;
                     state.failedToLoadPosts = false;
                })
                .addCase(getSearchPostsApi.rejected, state => {
                    state.failedToLoadPosts = true;
                })
        } 
    });

    export default redditPostsSlice.reducer;

    export const {
        setSelectedSubredditPath,
        setSearchTerm,
        setNewSearch,
        deleteSearchTerm,
    } = redditPostsSlice.actions;

// Selectors
export const redditPosts = state => state.posts.posts;
export const subredditPath = state => state.posts.selectedSubredditPath;
export const searchTerm = state => state.posts.searchTerm;
export const loadPostsFailed = state => state.posts.failedToLoadPosts;
export const isNewSearch = state => state.posts.isNewSearch;


