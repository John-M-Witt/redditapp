import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import redditJrIcon from '../../assets/images/headerIcons/redditJr.jpg'
import searchIcon from '../../assets/images/headerIcons/search.jpg';
import deleteSearchTermIcon from '../../assets/images/headerIcons/deleteSearchTerm.jpg';
import styles from './header.module.css';
import { setSearchTerm, deleteSearchTerm } from '../RedditPosts/redditSlice';

export function Header() {
    const [localSearchTerm, setLocalSearchTerm] = useState('');

    const dispatch = useDispatch();

    const handleSearchTermChange = (e) => {
        setLocalSearchTerm(e.target.value);
    }
    
    useEffect(() => {
        dispatch(setSearchTerm(localSearchTerm))
    },[localSearchTerm, dispatch]
    );

    const handleDeleteSearchTerm = () => {
        setLocalSearchTerm('');
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
                        name='localSearchTerm'
                        value={localSearchTerm}
                        onChange={handleSearchTermChange}
                    >
                    </input>
                {localSearchTerm.length > 2 && (
                    <button className={styles.deleteButton}
                        type='button'
                        id="search-delete-button"
                        onClick={handleDeleteSearchTerm}
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