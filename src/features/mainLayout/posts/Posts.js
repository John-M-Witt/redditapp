import React from 'react';
import styles from './posts.module.css';
import arrowUp from '../../../assets/images/posts/double_arrow_up.jpg'; 
import arrowDown from '../../../assets/images/posts/double_arrow_down.jpg';
import catPic from '../../../mockData/cherry.jpg';

export function Posts () {

    return (
        <div className={styles.postContainer}>
            <div className={styles.postRatings}> 
                <img src={arrowUp} />
                <p>49</p>
                <img src={arrowDown} />
            </div>
            <div className={styles.postDetails}>
                <p>Cherry is almost one year old, here are some of her cute photos (I was gonna put more but that's the max)</p>
                <div className={styles.imageContainer}>
                    <img className={styles.postPic} src={catPic} />
                </div> 
            </div>
        </div>
    )
}
