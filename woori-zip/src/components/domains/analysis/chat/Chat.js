'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styles from './Chat.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chat({ data, activeCategory, onCategoryChange }) {
    if (!data?.items?.length) {
        return <div>데이터가 없습니다.</div>;
    }

    const chartData = {
        labels: data.items.map(item => item.label),
        datasets: [{
            data: data.items.map(item => item.value),
            backgroundColor: data.items.map(item => item.color),
            borderWidth: data.items.map(item => 
                (item.key && item.key === activeCategory) ? 2 : 0
            ),
            borderColor: '#000',
            hoverBorderWidth: 2,
            hoverBorderColor: '#000',
        }]
    };

    const chartOptions = {
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function(context) {
                        const value = context.raw;
                        return `${context.label}: ${value.toLocaleString()}`;
                    }
                }
            },
            legend: {
                display: false
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        onClick: (_, elements) => {
            if (elements[0]) {
                const index = elements[0].index;
                const clickedItem = data.items[index];
                if (clickedItem && clickedItem.key) {
                    onCategoryChange?.(clickedItem.key);
                }
            }
        },
    };

    const midIndex = Math.ceil(data.items.length / 2);
    const firstGroup = data.items.slice(0, midIndex);
    const secondGroup = data.items.slice(midIndex);

    return (
        <div className={styles.chartWrapper}>
            <div className={styles.chartContainer}>
                <Pie data={chartData} options={chartOptions} />
            </div>
            <div className={styles.customLegendWrapper}>
                <div className={styles.customLegend}>
                    {firstGroup.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.legendItem} ${
                                item.key === activeCategory ? styles.selected : ''
                            }`}
                            onClick={() => item.key && onCategoryChange?.(item.key)}
                        >
                            <span
                                className={styles.legendBox}
                                style={{ backgroundColor: item.color }}
                            />
                            <span className={styles.legendText}>
                                {item.label} ({item.value.toLocaleString()})
                            </span>
                        </div>
                    ))}
                </div>
                <div className={styles.customLegend}>
                    {secondGroup.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.legendItem} ${
                                item.key === activeCategory ? styles.selected : ''
                            }`}
                            onClick={() => item.key && onCategoryChange?.(item.key)}
                        >
                            <span
                                className={styles.legendBox}
                                style={{ backgroundColor: item.color }}
                            />
                            <span className={styles.legendText}>
                                {item.label} ({item.value.toLocaleString()})
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}