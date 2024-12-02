import React from 'react'
import styles from '../onboarding/OnboardingBox.module.css';
import MockupBox from '../onboarding/MockupBox';
import ContentBox from './ContentBox';

function RegeterIntro() {
    return (
        <div>
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
        </div>
    )
}

export default RegeterIntro
