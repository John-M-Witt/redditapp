import React from "react";
import styles from './subreddits.module.css';
import { selectedSubreddit } from '../RedditPosts/redditSlice';

export function Subreddits () {

    return (
        <div id={styles.sidebarNavContainer}>
            <div className={styles.sidebarNavItems} >
                <p className={styles.title}>Sub-Reddits</p>
            {/* insert map method
                ${header_img}
                ${display_name}
                ${url} - relative URL, such as r/pics/


            */}
                <p>Placeholder Text</p>
            </div>
        </div>
    )
    
    }