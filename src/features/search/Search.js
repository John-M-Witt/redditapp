import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setSearchTerm, deleteSearchTerm} from './searchSlice';
import redditJrIcon from '../../assets/images/headerIcons/redditJr.jpg'
import searchIcon from '../../assets/images/headerIcons/search.jpg';
import deleteSearchTermIcon from '../../assets/images/headerIcons/deleteSearchTerm.jpg';
import styles from './search.module.css';


export function Search() {
    const dispatch = useDispatch();
    const searchTerm = useSelector(state => state.searchTerm);

    const onSearchTermChangeHandler = (e) => {
        const value = e.target.value;
        dispatch(setSearchTerm(value));
    }

    const deleteSearchTermHandler = () => {
        dispatch(deleteSearchTerm());
    }
    
    return (
        <header id={styles.headerContainer}>
            <div className={styles.titleIconContainer}>
                <img className={styles.appIcon} alt='app icon' src={redditJrIcon}/>
                <h1>Reddit Jr. </h1>
            </div>
            <div className={styles.searchContainer}>
                <form className={styles.searchBox}> 
                    <input 
                        placeholder="Search" 
                        type="text" 
                        name="searchTerm"
                        value= {searchTerm}
                        onChange = {onSearchTermChangeHandler}>
                    </input>
                {searchTerm.length > 3 && (
                    <button
                        onClick ={deleteSearchTermHandler}
                        type='button'
                        id="search-delete-button"
                    >
                        <img src={deleteSearchTermIcon} />    
                    </button> 
                )}
                </form>
                <img src={searchIcon} alt='Search Icon'/>                
            </div>
            
        </header>
    )

}