"use client";

import React, { useState } from "react";
import styles from "./RegisterWrapper.module.css"
import RegisterPage from "./RegisterPage";

export default function RegisterIntro() {

    return (
        <div className={styles.wrapper}>
            <div className={styles.scrollContainer}>
                <RegisterPage />
            </div>
        </div>
    );
}
