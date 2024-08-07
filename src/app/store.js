import { configureStore } from '@reduxjs/toolkit';
import redditSlice from '../features/RedditPosts/redditSlice';
import SubredditsSlice from '../features/Subreddits/subredditsSlice';

const store = configureStore({
    reducer: {
        posts: redditSlice,
        sideBarNav:  SubredditsSlice
    }
})

export default store;