import React from 'react'
import MockupBox from './MockupBox'
import ContentBox from './ContentBox'
import styles from './OnboardingBox.module.css'

function OnboardingBox() {
    return (
        <div className={styles.mainBox}>
            <div className={styles.warpper}>
                <div className={styles.leftBox}>
                    <MockupBox />
                </div>
                <div className={styles.rightBox}>
                    <ContentBox />
                </div>
            </div>
        </div>
    )
}

export default OnboardingBox
