import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './subreddits.module.css';
import { selectSubreddits, failedToLoadSubreddits } from './subredditsSlice';
import { getSubredditsApi } from '../../Api/redditApi';
import { setSelectedSubredditPath } from '../RedditPosts/redditPostsSlice';

export function Subreddits () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubredditsApi());
        }, [dispatch]
    ); 
    const subredditLoadFailed = useSelector(failedToLoadSubreddits);
    const subreddits = useSelector(selectSubreddits);
    
    const handleSubredditClick = subredditPath => dispatch(setSelectedSubredditPath(subredditPath));

    return (
        subredditLoadFailed ? (
            <div className={`${styles.subredditsContainer} ${styles.subredditsContainerError}`}> 
                <div className={`${styles.subredditContainer} ${styles.subredditContainerError}`}>
                    <p>Error loading Communities!</p>
                </div>
            </div>
        ) : (
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
        )
    )
}