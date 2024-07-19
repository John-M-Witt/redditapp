import { createSlice } from '@reduxjs/toolkit';

export const searchTermReducer = createSlice({
    name:'search',
    initialState: '',
    reducers: {
        setSearchTerm: (state, action) => {
            return action.payload;
        },
        deleteSearchTerm: (state, action) => {
            return '';
        } 
    }
    }
);

export const {setSearchTerm, deleteSearchTerm} = searchTermReducer.actions;

export default searchTermReducer.reducer;