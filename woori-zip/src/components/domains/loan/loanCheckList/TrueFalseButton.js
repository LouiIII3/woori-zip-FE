"use client";
import React from 'react';
import styles from './TrueFalseButton.module.css';  

const TrueFalseButton = ({ options, name, selectedValue, onChange }) => {
  return (
    <div className={styles.btnContainer}>
      {options.map((option, index) => (
        <div key={`${name}-${index}`} className={styles.formRadioBtn}>
          <input
            id={`${name}-${index}`}
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={(e) => onChange(e.target.value)}
          />
          <label htmlFor={`${name}-${index}`}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TrueFalseButton;
