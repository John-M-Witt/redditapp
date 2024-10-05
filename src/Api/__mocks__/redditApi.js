const getSubredditPostsApi = jest.fn(() => {
    return Promise.resolve({
        status: " ",
        data: []
    });
})

export default getSubredditPostsApi;