import { createSlice } from "@reduxjs/toolkit";

const redditSlice = 
    createSlice({
        name: 'posts',
        initialState: {
            posts: [],
            searchTerm: '',
            isLoading: false,
            isError: false,
            selectedSubreddit: '/r/interestingasfuck'
        },
        reducers:{
            setPosts: (state, action) => {
                state.posts = action.payload;
            },
            setSearchTerm: (state, action) => {
                state.searchTerm = action.payload;
            },
            deleteSearchTerm: (state) => {
                state.searchTerm = '';
            },
            getSelectedSubreddit: (state, action) => {
                state.selectedSubreddit = action.payload;
            }, 
            retrievingPosts: (state, action) => {
                state.isLoading = true;
                state.isError = false;
            },
            getPostsSuccess: (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.posts = action.payload;
            },
            getPostsFailed: (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }
        }
    });

    export default redditSlice.reducer;

    export const {
        setPosts,
        setSearchTerm,
        deleteSearchTerm,
        getSelectedSubreddit,
        retrievingPosts,
        getPostsSuccess,
        getPostsFailed
    } = redditSlice.actions;

// Add Redux thunk to get posts from a subreddit


