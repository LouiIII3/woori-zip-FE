import React from 'react';
import { Range } from 'react-range';
import styles from './RangeSlider.module.css';

export default function RangeSlider({ values, min, max, step, onChange, label, unit }) {
    return (
        <div className={styles.rangeSliderContainer}>
            <label className={styles.rangeLabel}>{label}</label>
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
                            height: '6px',
                            background: 'linear-gradient(to right, #007bff, #007bff)',
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props, index }) => {
                    // key를 props에서 분리
                    const { key, ...otherProps } = props;
                    return (
                        <div
                            key={index} // key를 명시적으로 전달
                            {...otherProps} // 나머지 props를 spread
                            className={styles.rangeThumb}
                            style={{
                                ...props.style,
                                height: '20px',
                                width: '20px',
                                backgroundColor: '#007bff',
                                borderRadius: '50%',
                            }}
                        />
                    );
                }}
            />
            <div className={styles.rangeValues}>
                {values[0] / unit} ~ {values[1] / unit} {unit === 10000 ? '만' : ''}
            </div>
        </div>
    );
}
