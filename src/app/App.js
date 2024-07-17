import React from 'react';
import { Search } from '../features/search/Search';
import { SideBarNav } from '../features/sideBarNav/SideBarNav';
import { Posts } from '../features/posts/Posts';

function App() {

  
  

  return (
    <main>
      <section> 
        <Search></Search>
        <SideBarNav></SideBarNav>
        <Posts></Posts>

      </section>

    </main>
  );
}

export default App;
