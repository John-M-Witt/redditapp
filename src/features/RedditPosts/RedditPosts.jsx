import styles from '../RedditPosts/redditPosts.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import arrowUp from '../../assets/images/posts/doubleArrowUp.svg';
import arrowDown from '../../assets/images/posts/doubleArrowDown.svg';
import infoIcon from '../../assets/images/posts/info.svg'
import { subredditPosts, subredditPath, searchTerm, loadPostsFailed } from './redditPostsSlice';
import { getSubredditPostsApi } from'../../Api/redditApi';


export function RedditPosts() {
   const [tooltipVisible, setTooltipVisible ] = useState(false);
   
    const dispatch = useDispatch();

    //Required for subreddit Posts
    const selectedSubredditPath = useSelector(subredditPath);
    const errorLoadingPosts = useSelector(loadPostsFailed);

    //Required for search
    const searchPhrase = useSelector(searchTerm);

    //Adds commas for numbers > 1,000
    function numberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    useEffect(() => {
    dispatch(getSubredditPostsApi(selectedSubredditPath));
    console.log(posts);
    }, [selectedSubredditPath, dispatch]
    );

    const posts = useSelector(subredditPosts);   
    
    const onHoverTooltip = () => setTooltipVisible(true);
    const noHoverTooltip = () => setTooltipVisible(false); 
    
    if(errorLoadingPosts === true) {
        return (
            <div className={styles.post}>
                <p className={styles.errorMessage}>Error loading posts </p>
            </div>
        )
    } else {
        return (
            <div>
                {posts.map((post) => (
                    <div id={styles.postContainer} key={post.id}  > 
                        <div className={styles.postStatsSection}> 
                            <p id={styles.postStatsHeader}>Post Votes</p>

                            <div className={styles.subheaderDefinition}
                                onMouseEnter={onHoverTooltip}
                                onMouseLeave={noHoverTooltip}
                            >
                                <span>Net Votes</span>
                                
                                    <img 
                                        className={styles.infoIcon}
                                        src={infoIcon} 
                                        alt="Info icon"
                                    />    
                                    <span
                                        className={styles.tooltipText}
                                        style={{ display: tooltipVisible ? 'inline-block' : 'none'}}> Net votes = positive - negative votes 
                                    </span>
                            </div>

                            <table>    
                                <tbody>
                                    <tr>
                                        <td><img src={post.upvote_ratio > .50 ? arrowUp : arrowDown} alt={post.upvote_ratio > .50 ? "Up votes exceed down votes" : "Down votes exceed up votes" } /> </td>
                                        {/* The second half of the formula below calculates the number of down votes*/}
                                        <td>{numberWithCommas(post.ups - (Math.round(post.ups / post.upvote_ratio) - post.ups )) }</td> 
                                    </tr>
                                    
                                    <tr>
                                        <td className={styles.percentSign}>%</td>
                                        <td>{post.upvote_ratio*100}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <span>Vote Details</span>
                            
                            <table>
                                <tbody>
                                    <tr>
                                        <td><img src={arrowUp} alt="Number of up votes"/> </td>
                                        <td>{numberWithCommas(post.ups)}</td> 
                                    </tr>
                                    <tr>
                                        <td><img src={arrowDown} alt="Number of down votes"/></td>
                                        <td className={styles.underline}>{numberWithCommas((Math.round(post.ups / post.upvote_ratio) - post.ups ))}</td>
                                    </tr>
                                    <tr>
                                        <td> <img src={post.upvote_ratio > 0.5? arrowUp : arrowDown} alt={post.upvote_ratio > 0.5? "Up votes exceed down votes by": "Down votes exceed up votes by"}  /></td>
                                        <td>{numberWithCommas((post.ups - (Math.round(post.ups / post.upvote_ratio) - post.ups)))}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <span>My Vote</span>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className={styles.detachedArrow}><img src={arrowUp} /> </td>
                                    </tr>
                                    <tr>
                                        <td className={styles.detachedArrow}><img src={arrowDown} /></td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                           
                        {post.media === null?
                        (
                        <div id={styles.postContent}>
                            <p className={styles.postTitle}>{post.title}</p>
                            <div className={styles.imageContainer}>
                                <img className={styles.postImage} src={post.url}/>
                            </div>
                        </div>
                        ):
                        (
                        <div id={styles.postContent}>
                            <p className={styles.postTitle}>{post.title}</p>
                            <div className={styles.videoContainer}>
                                <video 
                                    className={styles.video} 
                                    src={post.media.reddit_video.dash_url} 
                                    controls
                                    >
                                </video>
                            </div>
                        </div>
                        )};
                        <div className={styles.postFooter}>
                            <p>Test</p>
                        </div>
                    </div>
                    ))
                }
            </div>
            )
        }
    }    
                    
     