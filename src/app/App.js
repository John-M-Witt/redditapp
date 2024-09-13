import React from 'react';
import { Header } from '../features/Header/Header';
import { Subreddits } from '../features/Subreddits/Subreddits';
import { RedditPosts } from '../features/RedditPosts/RedditPosts';
import styles from './app.module.css';

function App() {
 
  return (
    <div>
      <Header />
      <div id={styles.flexContainer}>
        <Subreddits className={styles.subreddits}/>
        <RedditPosts className={styles.redditPosts}/>
      </div>
    </div>
  );
}

export default App;