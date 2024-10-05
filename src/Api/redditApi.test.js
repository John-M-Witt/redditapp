import { configureStore } from '@reduxjs/toolkit';
import redditPostsSlice from '../features/RedditPosts/redditPostsSlice.js'
import { getSubredditPostsApi } from './redditApi.js';

global.fetch = jest.fn();


describe('fetch subreddit posts', () => {
    //Create mock store to dispatch API action
    let store;
    let dispatch;
    let state;
    
    beforeEach(() => {
        store = configureStore({
            reducer: {
                posts: redditPostsSlice,
            },
        });
        dispatch = store.dispatch;
        state = store.getState();
    });

    it('fetches post data with correct properties', async () => {
        //arrange
        const subredditPath = '/r/interestingasfuck';
        
        const expectedProperties = {
            id: '2z45x62',
            author: 'relaxlu',
            title: 'Post title',
            ups: 10,
            upvote_ratio: 0.85,
            created: 1727180615,
            num_comments: 1409
            };

        //Mock the API call
        fetch.mockResolvedValueOnce({
            json: async () => ({
                data: {
                    children: [
                        { data: expectedProperties }
                    ]
                }    
            })
        });

        //actual
        const result = await dispatch(getSubredditPostsApi(subredditPath));
        const data = result.payload; 
            
        //assert 
        expect(state.posts.isLoadingPosts).toBe(false); //after fulfilled
        expect(data[0]).toHaveProperty('id');
        expect(data[0]).toHaveProperty('author');
        expect(data[0]).toHaveProperty('title');
        expect(data[0]).toHaveProperty('ups');
        expect(data[0]).toHaveProperty('upvote_ratio');
        expect(data[0]).toHaveProperty('created');
        expect(data[0]).toHaveProperty('num_comments');
    });
})
