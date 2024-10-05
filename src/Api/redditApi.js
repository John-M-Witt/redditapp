import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = 'https://www.reddit.com';
const searchPath = '/search.json?q='


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
        // console.log(response);
        const json = await response.json();
        return json.data.children.map(subreddit => subreddit.data);
}); 

// Create async thunk for retrieving posts based on search term

export const getSearchPostsApi = createAsyncThunk('posts/search',
    async (searchTerm) => {
        const response = await fetch(baseUrl+searchPath+searchTerm);
        const json = await response.json();
        // console.log(json);
        return json.data.children.map(redditPost => redditPost.data)
        });
                