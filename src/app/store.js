import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from '../features/search/searchSlice';

const store = configureStore({
    reducer: {
        searchTerm: searchTermReducer
    }
})

export default store;