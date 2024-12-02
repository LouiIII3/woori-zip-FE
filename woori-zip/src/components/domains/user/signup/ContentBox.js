import React from 'react'
import styles from '../onboarding/ContentBox.module.css'
import RegisterPage from '../register/RegisterPage'

function ContentBox() {
    return (
        <div className={styles.mainBox}>
            <div className={styles.mainBoxLine}>
                <RegisterPage />
            </div>
        </div>
    )
}

export default ContentBox
