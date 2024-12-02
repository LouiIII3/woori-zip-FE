'use client'

import React from 'react'
import styles from './ContentBox.module.css'
import LoginIntro from '../login/LoginIntro'

function ContentBox() {
    return (
        <div className={styles.mainBox}>
            <div className={styles.mainBoxLine}>
                <LoginIntro />
            </div>
        </div>
    )
}

export default ContentBox