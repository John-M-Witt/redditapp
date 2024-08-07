export const baseUrl = 'www.reddit.com';

export const getSubredditPosts = async () => {
    const response = await fetch(`${baseUrl}/subreddits.json`);
    const json = await response.json();
    return json.data.children.map(subreddit => subreddit.data)
} 