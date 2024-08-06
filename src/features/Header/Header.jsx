import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import redditJrIcon from '../../assets/images/headerIcons/redditJr.jpg'
import searchIcon from '../../assets/images/headerIcons/search.jpg';
import deleteSearchTermIcon from '../../assets/images/headerIcons/deleteSearchTerm.jpg';
import styles from './header.module.css';
import {
    setPosts,
    setSearchTerm,
    deleteSearchTerm,
    getSelectedSubreddit,
    retrievingPosts,
    getPostsSuccess,
    getPostsFailed

} from '../RedditPosts/redditSlice';

export function Header() {
    const [localSearchTerm, setLocalSearchTerm] = useState('');

    const handleSearchTermChange = (e) => {
        setLocalSearchTerm(e.target.value);
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchTerm(localSearchTerm))
    },[localSearchTerm]
    );

    const handleDeleteSearchTerm = () => {
        dispatch(deleteSearchTerm)
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
                        name='localSearchTerm'
                        value={localSearchTerm}
                        onChange={handleSearchTermChange}
                    >
                    </input>
                {localSearchTerm.length > 2 && (
                    <button className={styles.deleteButton}
                        type='button'
                        id="search-delete-button"
                    >
                        <img 
                        src={deleteSearchTermIcon} 
                        onClick={handleDeleteSearchTerm}
                        />    
                    </button> 
                )}
                </form>
                <img src={searchIcon} alt='Search Icon'/>                
            </div>
            
        </header>
    )
}