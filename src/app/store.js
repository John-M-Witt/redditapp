import { configureStore } from '@reduxjs/toolkit';
import redditPostsSlice from '../features/RedditPosts/redditPostsSlice';
import SubredditsSlice from '../features/Subreddits/subredditsSlice';
import headerSlice from '../features/Header/headerSlice';

const store = configureStore({
    reducer: {
        subreddits:  SubredditsSlice,
        posts: redditPostsSlice,
        header: headerSlice
    }
})

export default store;