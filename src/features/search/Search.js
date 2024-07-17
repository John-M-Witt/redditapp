import React from 'react';
import redditJrIcon from '../../assets/images/headerIcons/redditJr.jpg'
import searchIcon from '../../assets/images/headerIcons/search.jpg';
import styles from './search.module.css';


export function Search() {
    
    
    return (
        <div id={styles.headerContainer}>
            <div className={styles.titleIconContainer}>
                <img className={styles.appIcon} alt='app icon' src={redditJrIcon}/>
                <h1>Reddit Jr. </h1>
            </div>
            <div className={styles.searchContainer}>
                <form className={styles.searchBox} method="POST"> 
                    {/* FORM REQUIRES ACTION */}
                    <input placeholder="Search" type="text" name="searchTerm">
                    </input>
                </form>
                <img className={styles.searchIcon} src={searchIcon} alt='Search Icon'/>                
            </div>
            
        </div>
    )

}