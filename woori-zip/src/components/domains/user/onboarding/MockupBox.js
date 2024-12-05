import React from 'react'
import styles from './MockupBox.module.css'


function MockupBox() {
  return (
    <img
      src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/onboarding/onboarding.gif"
      className={styles.mainBox}
    />
  )
}

export default MockupBox
