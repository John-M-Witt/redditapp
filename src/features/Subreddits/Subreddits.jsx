import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './subreddits.module.css';
import { fetchSubreddits, selectSubreddits } from './subredditsSlice';
import { getSelectedSubreddit } from '../RedditPosts/redditSlice';

export function Subreddits () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSubreddits());
        }, [dispatch]
    ); 

    const subreddits = useSelector(selectSubreddits);

    const onClickHandler = (url) => dispatch(getSelectedSubreddit(url));

    return (
        <div id={styles.sidebarNavContainer}>
            <div className={styles.sidebarNavItems} >
                <p className={styles.header}>Sub-Reddits</p>
            <ul>
                {subreddits.map(subreddit => {
                    return <li key={subreddit.id}>
                        <div className={styles.subredditContainer}> 
                            <button onClick ={() => onClickHandler(subreddit.url)}> 
                            <img className={styles.icons} src={subreddit.icon_img === "" ? require(`../../assets/images/subReddits/${subreddit.display_name}.jpg`): subreddit.icon_img} 
                                alt={subreddit.display_name}/>
                            </button>
                            <p className={styles.title} onClick ={() => onClickHandler(subreddit.url)}>{subreddit.display_name}</p>
                        </div>
                    </li>
                 })}
            </ul>
            </div>
        </div>
    )}

   