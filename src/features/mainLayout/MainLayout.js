import React from 'react';
import styles from './mainLayout.module.css';
import { Posts } from './posts/Posts';
import { SidebarNav } from './sidebarNav/SidebarNav';

export function MainLayout (){

return (
    <div className={styles.layoutContainer} >
        <SidebarNav></SidebarNav>
        <Posts></Posts>
    </div>

)


}