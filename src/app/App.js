import React from 'react';
import { Search } from '../features/search/Search';
import { MainLayout } from '../features/mainLayout/MainLayout';

function App() {
  

  return (
    <main>
      <section> 
        <Search></Search>
        <MainLayout></MainLayout>
      </section>

    </main>
  );
}

export default App;
