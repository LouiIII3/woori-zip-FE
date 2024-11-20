export const generateApiUrl = (mapState, categoryState, depositRange, priceRange, maintenanceRange, rentType, selectedCategory) => {
    // 필수 값과 선택적 추가 값을 포함하는 객체 생성
    console.log("selectedCategory:", categoryState.category);
    console.log("rentType:", rentType);
    const params = new URLSearchParams(
        Object.fromEntries(
            Object.entries({
                level: mapState.zoomLevel || undefined, // 지도 줌 레벨
                southWestLatitude: mapState.southWestLatitude || undefined, // 남서 위도
                southWestLongitude: mapState.southWestLongitude || undefined, // 남서 경도
                northEastLatitude: mapState.northEastLatitude || undefined, // 북동 위도
                northEastLongitude: mapState.northEastLongitude || undefined, // 북동 경도
                category: categoryState.category !== "" ? categoryState.category : undefined, // 카테고리
                walking: categoryState.walkingDistance || undefined, // 도보 거리
                facilityCount: categoryState.facilityCount || undefined, // 시설 수
                houseType: selectedCategory, // 주택 유형
                housingExpenses: rentType !== "" ? rentType : undefined,
                minDeposit: depositRange[0] || undefined, // 최소 보증금
                maxDeposit: depositRange[1] || undefined, // 최대 보증금
                minMonthlyRentFee: priceRange[0] || undefined, // 최소 월세
                maxMonthlyRentFee: priceRange[1] || undefined, // 최대 월세
                minMaintenanceFee: maintenanceRange[0] || undefined, // 최소 관리비
                maxMaintenanceFee: maintenanceRange[1] || undefined, // 최대 관리비
            }).filter(([_, value]) => value !== undefined) // undefined 값 제거
        )
    );

    // URL 생성
    return `http://localhost:8080/api/v1/houses?${params.toString()}`;
};
