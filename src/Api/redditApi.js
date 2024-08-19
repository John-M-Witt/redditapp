export const baseUrl = 'https://www.reddit.com';

export const getSubreddits = async () => {
    const response = await fetch(`${baseUrl}/subreddits.json`);
    const json = await response.json();
    return json.data.children.map(subreddit => subreddit.data)
} 

// getSubreddits().then(data => console.log(data)).catch(error => console.log('Error', error));

