import React from 'react';
import styles from './sideBarNav.module.css';
import sideBarIcons from '../../assets/importSideBarIcons';


export function SideBarNav () {
       
    return (
        <div className={styles.sideBarNav}>
            <p className={styles.navTitle}>Sub-Reddit</p>
            <br/>
            <div>
                {Object.keys(sideBarIcons).map((key, index) => (
                    <div className={styles.navItems} key={index}>
                    <img className={styles.navIcons} src={sideBarIcons[key].path} alt={sideBarIcons[key].title}/>
                    <p className={styles.navLinks}>{sideBarIcons[key].title}</p>
                    </div>
            ))}
            </div>
        </div>
    )
}