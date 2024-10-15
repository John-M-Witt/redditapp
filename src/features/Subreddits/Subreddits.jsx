import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './subreddits.module.css';
import { selectSubreddits, failedToLoadSubreddits } from './subredditsSlice';
import { getSubredditsApi } from '../../Api/redditApi';
import { setSelectedSubredditPath } from '../RedditPosts/redditPostsSlice';
import { communitiesVisible } from '../Header/headerSlice';

export function Subreddits () {
    //mediaQuery.matches returns True if browser viewport is greater than 768px  
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const [ isSmallWindow, setIsSmallWindow ] = useState(mediaQuery.matches);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubredditsApi());
        }, [dispatch]); 

    useEffect(() => {
        const windowHandler = event => setIsSmallWindow(event.matches);
        mediaQuery.addEventListener('change', windowHandler);
        // console.log(`MediaQuery: ${mediaQuery.matches}`);  
        // console.log(`Display Communities: ${displayCommunities}`)
  
        return () => mediaQuery.removeEventListener('change', windowHandler);
    }, [mediaQuery]);

    const subredditLoadFailed = useSelector(failedToLoadSubreddits);
    const subreddits = useSelector(selectSubreddits);
    const displayCommunities = useSelector(communitiesVisible);
    const handleSubredditClick = subredditPath => dispatch(setSelectedSubredditPath(subredditPath));
    
    
    return (
        subredditLoadFailed ? (
            <div className={`${styles.subredditsContainer} ${styles.subredditsContainerError}`}> 
                <div className={`${styles.subredditContainer} ${styles.subredditContainerError}`}>
                    <p>Error loading Communities!</p>
                </div>
            </div>
        ) : (
        
        (!(isSmallWindow) || displayCommunities) && (
        <div className={styles.subredditsContainer}>
            <div className={styles.sidebarNavItems} > 
                <p className={styles.header}>Reddit Communities</p>
                <ul>
                {subreddits.map(subreddit => {
                    return <li key={subreddit.id}>
                        <div className={styles.subredditContainer}> {/*Flex box*/}
 
                            {/*Flex item*/}
                            <button> 
                                <img 
                                    className={styles.icons} 
                                    src={subreddit.icon_img === "" ? require(`../../assets/images/subReddits/${subreddit.display_name}.jpg`): subreddit.icon_img} 
                                    alt={subreddit.display_name}
                                    onClick = {() => handleSubredditClick(subreddit.url)}
                                />
                            </button>

                            {/*Flex item*/}
                            <p 
                                className={styles.title}
                                onClick = {() => handleSubredditClick(subreddit.url)}
                            >{subreddit.display_name}</p> 
                        </div>
                    </li>
                })}
                </ul>
            </div>
        </div>
        ))
    )}