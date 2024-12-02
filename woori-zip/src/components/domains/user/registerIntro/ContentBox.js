import React from 'react'
import styles from '../onboarding/ContentBox.module.css'
import AgreementPage from '../agreement/AgreementPage'

function ContentBox() {
    return (
        <div className={styles.mainBox}>
            <div className={styles.mainBoxLine}>
                <AgreementPage />
            </div>
        </div>
    )
}

export default ContentBox
