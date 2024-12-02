import React from 'react';
import { Range } from 'react-range';
import styles from './RangeSlider.module.css';

export default function RangeSlider({ values, min, max, step, onChange, label, unit }) {
    return (
        <div className={styles.rangeSliderContainer}>
            <label className={styles.rangeLabel}>{label}</label>
            <div className={styles.rangeWrapper}>
                <div className={styles.rangeValues}>
                    <span>{values[0] / unit} {unit === 10000 ? '만' : ''}</span>
                    <span>{values[1] / unit} {unit === 10000 ? '만' : ''}</span>
                </div>
                <Range
                    values={values}
                    step={step}
                    min={min}
                    max={max}
                    onChange={onChange}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            className={styles.rangeTrack}
                            style={{
                                ...props.style,
                            }}
                        >
                            <div
                                className={styles.rangeFilledTrack}
                                style={{
                                    left: `${((values[0] - min) / (max - min)) * 100}%`,
                                    right: `${100 - ((values[1] - min) / (max - min)) * 100}%`,
                                }}
                            />
                            {children}
                        </div>
                    )}
                    renderThumb={({ props, index }) => {
                        const { key, ...restProps } = props;
                        return (
                            <div
                                key={key} 
                                {...restProps} 
                                className={styles.rangeThumb}
                            >
                            </div>
                        );
                    }}
                    
                />
            </div>
        </div>
    );
}
