'use server';

import { instance } from "../instance";

let lastRequestParams = null; // 마지막 요청 조건 저장
let lastResponseData = null; // 마지막 응답 데이터 저장

// 주택 목록 요청
export const fetchHouseList = async (filters) => {
  // houseType이 없는 경우 요청 차단
  if (!filters.houseType) {
    console.warn("경고: houseType이 없습니다. 요청이 중단되었습니다.");
    return null; // 요청 중단
  }

  const params = new URLSearchParams(filters).toString();
  const url = `houses?${params}`;

  // 중복 요청 방지
  if (lastRequestParams === url && lastResponseData) {
    console.log("중복 요청 방지: 이전 데이터를 반환합니다.");
    return lastResponseData;
  }

  console.log("요청 중: 주택 목록 URL:", url);

  try {
    const response = await instance(url, {
      method: 'GET',
      credentials: 'include',
    });

    console.log("응답 헤더:", response.headers);
    console.log("주택 목록 응답 데이터:", response.data);

    // 요청 조건 및 결과 저장
    lastRequestParams = url;
    lastResponseData = response.data;

    return response.data;
  } catch (error) {
    console.error("오류 발생: 주택 목록 요청 중 문제가 발생했습니다:", error);
    throw error;
  }
};



// 지도 상태로 주택 목록 요청
export const fetchHousesByMapStateApi = async (args) => {
  const url = buildHousesUrl(args);

  // 중복 요청 방지
  if (lastRequestParams === url && lastResponseData) {
    console.log("중복 요청 방지: 이전 데이터 반환");
    return lastResponseData;
  }

  console.log(`지도 이동 시 요청 URL: ${url}`);

  try {
    const response = await instance(url, {
      method: 'GET',
      credentials: 'include',
    });

    // 요청 조건 및 결과 저장
    lastRequestParams = url;
    lastResponseData = response.data;

    return response.data;
  } catch (error) {
    console.error("지도 이동 API 호출 오류:", error);
    throw error;
  }
};

// 최종 필터로 주택 목록 요청
export const fetchHousesByFinalFilterApi = async (args) => {
  const url = buildHousesUrl(args);

  // 중복 요청 방지
  if (lastRequestParams === url && lastResponseData) {
    console.log("중복 요청 방지: 이전 데이터 반환");
    return lastResponseData;
  }

  console.log(`최종 요청 URL: ${url}`);

  try {
    const response = await instance(url, {
      method: 'GET',
      credentials: 'include',
    });

    // 요청 조건 및 결과 저장
    lastRequestParams = url;
    lastResponseData = response.data;

    return response.data;
  } catch (error) {
    console.error("최종 필터 API 호출 오류:", error);
    throw error;
  }
};

// 공통 URL 빌더 함수
const buildHousesUrl = ({
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

  return `houses?${params.toString()}`;
};
