import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = 'https://www.reddit.com';

export const getSubredditPostsApi = createAsyncThunk('posts/loadSubredditPosts', 
    async (subredditPath) => {
        const response = await fetch(`${baseUrl}${subredditPath}.json`);
        const json = await response.json();
        return json.data.children.map(post => post.data);
    }
);

export const getSubredditsApi = createAsyncThunk('subreddits/getSubreddits', 
    async () => {
        const response = await fetch(`${baseUrl}/subreddits.json`);
        const json = await response.json();
        return json.data.children.map(subreddit => subreddit.data)
}); 

//Create async thunk for retrieving posts based on subreddit address



//Create async thunk for retrieving posts based on search term

