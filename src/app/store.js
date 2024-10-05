import { configureStore } from '@reduxjs/toolkit';
import redditPostsSlice from '../features/RedditPosts/redditPostsSlice';
import SubredditsSlice from '../features/Subreddits/subredditsSlice';

const store = configureStore({
    reducer: {
        subreddits:  SubredditsSlice,
        posts: redditPostsSlice
    }
})

export default store;