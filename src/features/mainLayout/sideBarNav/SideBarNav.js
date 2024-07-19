import React from 'react';
import styles from './sidebarNav.module.css';
import sidebarIcons from './importSidebarIcons';


export function SidebarNav () {
       
    return (
        <div className={styles.sidebarNav}>
            <p className={styles.navTitle}>Sub-Reddits</p>
            <br/>
            <div>
                {Object.keys(sidebarIcons).map((key, index) => (
                    <div className={styles.navItems} key={index}>
                        <img className={styles.navIcons} src={sidebarIcons[key].path} alt={sidebarIcons[key].title}/>
                        <p className={styles.navLinks}>{sidebarIcons[key].title}</p>
                    </div>
            ))}
            </div>
        </div>
    )
}