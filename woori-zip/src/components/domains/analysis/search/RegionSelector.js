'use client';

import styles from './RegionSelector.module.css';

export default function RegionSelector({
    selectedData,
    districtData = {},
    onDistrictChange,
    onDongSelect
}) {
    return (
        <div className={styles.container}>
            <div className={styles.locationSection}>
                <h4 className={styles.locationTitle}>지역 선택</h4>
                <div className={styles.locationSelector}>
                    <select
                        value={selectedData.district}
                        onChange={(e) => onDistrictChange(e.target.value)}
                        className={styles.districtSelect}
                    >
                        <option value="">구 선택</option>
                        {Object.keys(districtData).map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>

                    {selectedData.district && (
                        <div className={styles.dongButtons}>
                            {districtData[selectedData.district.toLowerCase()]?.map((dong) => (
                                <button
                                    key={dong.읍면동명}
                                    className={`${styles.dongButton} ${
                                        selectedData.dong === dong.읍면동명 ? styles.selected : ''
                                    }`}
                                    onClick={() => onDongSelect(dong.읍면동명)}
                                >
                                    {dong.읍면동명}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}