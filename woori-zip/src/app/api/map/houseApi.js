'use server';

import { instance } from "../instance";

// 주택 목록 요청
export const fetchHouseList = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const url = `houses?${params}`;

  console.log("Requesting house list with URL:", url); // 요청 URL 로그

  try {
    const response = await instance(url, {
      method: 'GET',
      credentials: 'include',
    });

    console.log("Request headers:", response.headers); // 응답 헤더 확인
    console.log("House list response:", response.data); // 응답 데이터 로그

    return response.data; // 변경된 부분
  } catch (error) {
    console.error("Error fetching house list:", error);
    throw error;
  }
};

// 특정 주택 상세정보 요청
export const fetchHouseDetails = async (propertyId) => {
  try {
    const response = await instance(`houses/${propertyId}`, {
      method: 'GET',
      credentials: 'include',
    });
    return response.data; // 변경된 부분
  } catch (error) {
    console.error("Error fetching house details:", error);
    throw error;
  }
};

// 북마크 추가 요청
export const addBookmark = async (propertyId) => {
  try {
    const response = await instance(`houses/${propertyId}/bookmark`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.data; // 변경된 부분
  } catch (error) {
    console.error("Error adding bookmark:", error);
    throw error;
  }
};

// 북마크 삭제 요청
export const deleteBookmark = async (propertyId) => {
  try {
    const response = await instance(`houses/${propertyId}/bookmark`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return response.data; // 변경된 부분
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    throw error;
  }
};

// 지도 상태로 주택 목록 요청
export const fetchHousesByMapStateApi = async ({
  mapState,
  houseType,
  rentType,
  depositRange,
  priceRange,
  maintenanceRange,
  categoryState,
}) => {
  const params = new URLSearchParams();

  params.append("level", mapState.zoomLevel || 7);
  params.append("southWestLatitude", mapState.southWestLatitude || 0);
  params.append("southWestLongitude", mapState.southWestLongitude || 0);
  params.append("northEastLatitude", mapState.northEastLatitude || 0);
  params.append("northEastLongitude", mapState.northEastLongitude || 0);

  if (houseType) params.append("houseType", houseType);
  if (rentType !== "모두") params.append("housingExpenses", rentType);
  params.append("minDeposit", depositRange[0]);
  params.append("maxDeposit", depositRange[1]);
  params.append("minMonthlyRentFee", priceRange[0]);
  params.append("maxMonthlyRentFee", priceRange[1]);
  params.append("minMaintenanceFee", maintenanceRange[0]);
  params.append("maxMaintenanceFee", maintenanceRange[1]);

  if (categoryState.category && categoryState.category !== "선택하지 않음") {
    params.append("category", categoryState.category);
    if (categoryState.walkingDistance > 0) {
      params.append("walking", categoryState.walkingDistance);
    }
    if (categoryState.facilityCount > 0) {
      params.append("facilityCount", categoryState.facilityCount);
    }
  }

  const url = `houses?${params.toString()}`;
  console.log(`지도 이동 시 요청 URL: ${url}`);

  try {
    const response = await instance(url, {
      method: 'GET',
      credentials: 'include',
    });
    return response.data; // 변경된 부분
  } catch (error) {
    console.error("지도 이동 API 호출 오류:", error);
    throw error;
  }
};

// 최종 필터로 주택 목록 요청
export const fetchHousesByFinalFilterApi = async ({
  mapState,
  houseType,
  rentType,
  depositRange,
  priceRange,
  maintenanceRange,
  categoryState,
}) => {
  const params = new URLSearchParams();

  params.append("level", mapState.zoomLevel || 7);
  params.append("southWestLatitude", mapState.southWestLatitude || 0);
  params.append("southWestLongitude", mapState.southWestLongitude || 0);
  params.append("northEastLatitude", mapState.northEastLatitude || 0);
  params.append("northEastLongitude", mapState.northEastLongitude || 0);

  if (houseType) params.append("houseType", houseType);
  if (rentType !== "모두") params.append("housingExpenses", rentType);
  params.append("minDeposit", depositRange[0]);
  params.append("maxDeposit", depositRange[1]);
  params.append("minMonthlyRentFee", priceRange[0]);
  params.append("maxMonthlyRentFee", priceRange[1]);
  params.append("minMaintenanceFee", maintenanceRange[0]);
  params.append("maxMaintenanceFee", maintenanceRange[1]);

  if (categoryState.category && categoryState.category !== "선택하지 않음") {
    params.append("category", categoryState.category);
    if (categoryState.walkingDistance > 0) {
      params.append("walking", categoryState.walkingDistance);
    }
    if (categoryState.facilityCount > 0) {
      params.append("facilityCount", categoryState.facilityCount);
    }
  }

  const url = `houses?${params.toString()}`;
  console.log(`최종 요청 URL: ${url}`);

  try {
    const response = await instance(url, {
      method: 'GET',
      credentials: 'include',
    });
    return response.data; // 변경된 부분
  } catch (error) {
    console.error("최종 필터 API 호출 오류:", error);
    throw error;
  }
};
