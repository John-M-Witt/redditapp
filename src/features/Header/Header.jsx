import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import redditJrIcon from '../../assets/images/headerIcons/redditJr.jpg'
import searchIconBlack from '../../assets/images/headerIcons/searchIconBlack.svg';
import searchIconGreen from '../../assets/images/headerIcons/searchIconGreen.svg';
import deleteSearchTermIcon from '../../assets/images/headerIcons/deleteSearchTerm.svg';
import styles from './header.module.css';
import { setNewSearch, setSearchTerm, deleteSearchTerm } from '../RedditPosts/redditPostsSlice';
import { formatSearchPhrase } from '../../utilities/utilities';

export function Header() {
    const [localSearchTerm, setLocalSearchTerm] = useState('');

    const dispatch = useDispatch();
    const localSearchTermLength = localSearchTerm.length; 

    const handleSearchTermChange = (e) => {
        setLocalSearchTerm(e.target.value);
    }
    
    const handleSearchEnter = e => {
        if(e.key === 'Enter') {
            e.preventDefault();
            // console.log(e);
            dispatch(setNewSearch(true));
            const formattedSearchPhrase = formatSearchPhrase(localSearchTerm);
            dispatch(setSearchTerm(formattedSearchPhrase));
            setLocalSearchTerm('');
        }
    } 

const handleSearchIconClick = (e) => {
    if(localSearchTerm.length > 1){
        e.preventDefault();
        dispatch(setNewSearch(true));
        const formattedSearchPhrase = formatSearchPhrase(localSearchTerm);
        dispatch(setSearchTerm(formattedSearchPhrase));
        setLocalSearchTerm('');
    }
}

    const handleDeleteSearchTerm = () => {
        setLocalSearchTerm('');
        dispatch(deleteSearchTerm());
    }

    return (
        <header id={styles.headerContainer}> {/* Flex box */}
            <div className={styles.titleIconContainer}> {/* Flex item & Flex box */}
                <img className={styles.appIcon} alt='Subreddit icon' src={redditJrIcon}/>
                <h1>Reddit Jr.</h1>
            </div>
            <div className={styles.searchContainer}> {/* Flex item & Flex box */}
                <form className={styles.searchBox} onSubmit={(e) => e.preventDefault()}> {/* Flex item & Flex box */}
                    <input 
                        placeholder="Search" 
                        type="text" 
                        name='localSearchTerm'
                        value={localSearchTerm}
                        onChange={handleSearchTermChange}
                        onKeyDown={handleSearchEnter}
                    />
                {localSearchTerm.length > 2 && (
                    <button 
                        className={styles.deleteButton}
                        type='button'
                        id="search-delete-button"
                        onClick={handleDeleteSearchTerm}
                    >
                        <img src={deleteSearchTermIcon} />    
                    </button> 
                )}
                </form>
                    <button>
                        <img 
                        className={styles.searchIcon} 
                        src={localSearchTermLength < 1? searchIconBlack: searchIconGreen} 
                        alt='Search Icon'
                        onClick={handleSearchIconClick}
                        />
                    </button>     
            </div>
            
        </header>
    )
}