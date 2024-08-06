import { configureStore } from '@reduxjs/toolkit';
import redditSlice from '../features/RedditPosts/redditSlice';

const store = configureStore({
    reducer: {
        posts: redditSlice
    }
})

export default store;