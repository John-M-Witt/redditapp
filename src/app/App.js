import React from 'react';
import { Header } from '../features/Header/Header';
import { Subreddits } from '../features/Subreddits/Subreddits';
import { RedditPosts } from '../features/RedditPosts/RedditPosts';

function App() {
 
  return (
    <div>
      <Header />
      <div id="flexContainer">
        <Subreddits />
        <RedditPosts/>
      </div>
    </div>
  );
}

export default App;