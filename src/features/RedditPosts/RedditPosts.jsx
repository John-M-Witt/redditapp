import styles from '../RedditPosts/redditPosts.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import arrowUp from '../../assets/images/posts/doubleArrowUp.svg';
import arrowDown from '../../assets/images/posts/doubleArrowDown.svg';
import infoIcon from '../../assets/images/posts/info.svg';
import commentIcon from '../../assets/images/posts/comment.svg';
import { redditPosts, subredditPath, loadPostsFailed, searchTerm, isNewSearch, setNewSearch } from './redditPostsSlice';
import { getSubredditPostsApi, getSearchPostsApi } from'../../Api/redditApi';
import { timeSincePost, numberWithCommas, }  from '../../utilities/utilities';


export function RedditPosts() {
   
    const [tooltipVisible, setTooltipVisible ] = useState(false);

   const dispatch = useDispatch();

    //Required for subreddit link posts
    const selectedSubredditPath = useSelector(subredditPath);
    const errorLoadingPosts = useSelector(loadPostsFailed);

    //Posts data based on search and subreddit links
    const searchPhrase = useSelector(searchTerm);
    const newSearch = useSelector(isNewSearch);
    const posts = useSelector(redditPosts); 
    console.log(posts);

    useEffect(() => {
        dispatch(getSubredditPostsApi(selectedSubredditPath));
        }, [selectedSubredditPath, dispatch]
        );

    useEffect(() => {
        if(newSearch === false) {
            return;
        } 
        dispatch(getSearchPostsApi(searchPhrase));
        dispatch(setNewSearch(false));
        }, [searchPhrase, dispatch])

    const onHoverTooltip = () => setTooltipVisible(true);
    const noHoverTooltip = () => setTooltipVisible(false); 
    
    
    return (
        <div className={styles.postContainer}>
        {(errorLoadingPosts) && 
        
            <div className={styles.post}>
                <p className={styles.errorMessage}>Error loading posts!</p>
                <p className={styles.errorMessage}>Please select another option.</p>
            </div>
            }
        
            <div>
                {posts.map(post => (
                <div className={styles.post}  key={post.id}>
                    <div className={styles.postContent}> 
                        
                        {/* Post Metrics Section*/}
                        <div className={styles.postStatsSection}> 
                            <p id={styles.postStatsHeader}>Post Votes</p>

                            <div className={styles.tooltip}
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
                                        style={{ display: tooltipVisible ? 'inline-block' : 'none'}}> Net votes = positive votes - negative votes 
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
                    
                        {/* Post content section*/}

                        {/* Type of media available determines if image, video or just text is displayed*/}
                        
                        <div className={styles.postContent}>
                            
                            {post.selftext_html !==null && (
                            <div>
                                <p className={styles.postTitle}>{post.title}</p>
                                <div className={styles.textContainer}>
                                    <p>{post.selftext}</p> 
                                </div>
                            </div>
                            )}

                            {post.media !== null && (  
                            <div>
                                <p className={styles.postTitle}>{post.title}</p>
                                <div>
                                    <video 
                                        id={styles.postMedia}
                                        preload="auto"
                                        controls>Your web browser does not support the video type.
                                        <source 
                                            src={post.media?.reddit_video?.fallback_url}
                                            type="video/mp4"
                                        >
                                        </source>
                                        <source
                                            src={post.media?.reddit_video?.scrubber_media_url}
                                            type="video/mpd"
                                        >
                                        </source>
                                    </video>
                                </div>
                            </div>
                                )
                            }

                            {(post.selftext_html === null && post.media === null) && (
                            <div>
                                <p className={styles.postTitle}>{post.title}</p>
                                <div>
                                    <img className={styles.postImage} src={post.url.includes('jpeg')? post.url : null}/>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                
                    {/* Footer at bottom of each post */}

                        <div className={styles.postFooterContainer}>
                        <p>Subreddit: {post.subreddit}</p>
                        <p>Author: {post.author}</p>
                        <p>{timeSincePost(post.created)}</p>
                                <div className={styles.commentContainer}>
                                    <img src={commentIcon} alt="Total post comments" /> 
                                    <p className={styles.totalComments}>{numberWithCommas(post.num_comments)}</p>
                                </div>
                        </div>
                    </div>
                )
            )}
            </div>
            </div>
    );
}
 


