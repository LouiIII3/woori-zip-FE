import { useEffect, useRef } from 'react';
import styles from '../map/mapView.module.css';
import { useSearchParams } from 'next/navigation';

const MapView = ({ filters, locations = [], facilities = [],mapViewData, onMapChange = () => {} }) => {
  const mapRef = useRef(null);
  const isMapLoaded = useRef(false);
  const geocoder = useRef(null);
  const overlays = useRef([]);
  const markers = useRef([]);
  const facilityMarkers = useRef([]);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (!isMapLoaded.current) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            const container = document.getElementById('map');

            // URL 파라미터에서 좌표 값 가져오기
            const southWestLatitude = parseFloat(searchParams.get('southWestLatitude'));
            const southWestLongitude = parseFloat(searchParams.get('southWestLongitude'));
            const northEastLatitude = parseFloat(searchParams.get('northEastLatitude'));
            const northEastLongitude = parseFloat(searchParams.get('northEastLongitude'));

            // 중심 좌표 계산 (URL 파라미터가 없는 경우 기본값 사용)
            let initialLat = 37.5665; // 기본값: 서울
            let initialLng = 126.9780; // 기본값: 서울

            if (
              southWestLatitude &&
              southWestLongitude &&
              northEastLatitude &&
              northEastLongitude
            ) {
              initialLat = (southWestLatitude + northEastLatitude) / 2;
              initialLng = (southWestLongitude + northEastLongitude) / 2;
            }

            const options = {
              center: new window.kakao.maps.LatLng(initialLat, initialLng),
              level: 7,
            };

            mapRef.current = new window.kakao.maps.Map(container, options);

            geocoder.current = new window.kakao.maps.services.Geocoder();

            kakao.maps.event.addListener(mapRef.current, 'idle', handleMapIdle);

            isMapLoaded.current = true;
          });
        } else {
          console.error('Kakao Maps API failed to load.');
        }
      };

      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  const handleMapIdle = async () => {
    if (!mapRef.current) return;
  
    const bounds = mapRef.current.getBounds();
    const zoomLevel = mapRef.current.getLevel();
  
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();
  
    const mapState = {
      southWestLatitude: southWest.getLat(),
      southWestLongitude: southWest.getLng(),
      northEastLatitude: northEast.getLat(),
      northEastLongitude: northEast.getLng(),
      zoomLevel,
    };
  
    if (onMapChange) {
      const mapData = await onMapChange(mapState);
  
      // 지도 상태에 맞는 데이터가 있는지 확인
      if (mapData && mapData.houses) {
        facilityMarkers.current = mapData.houses.map((house) => ({
          lat: house.lat,
          lng: house.lng,
          title: house.title,
        }));
        console.log("Updated Facility Markers:", facilityMarkers.current);
      }
    }
    // 줌 레벨에 따라 다른 데이터 업데이트
    if (zoomLevel >= 1 && zoomLevel <= 5) {
      displayMarkers(locations); // 마커 표시
    } else if (zoomLevel >= 6 && zoomLevel <= 8) {
      updateMarkers(locations, 'dong'); // 동 표시
    } else if (zoomLevel >= 9 && zoomLevel <= 14) {
      updateMarkers(locations, 'gu'); // 구 표시
    }
  };

  const displayMarkers = (places) => {
    if (!mapRef.current) return;
  
    // 기존 마커와 오버레이 제거
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = [];
    overlays.current.forEach((overlay) => overlay.setMap(null));
    overlays.current = [];
  
    // 기존 시설 마커 제거
    facilityMarkers.current.forEach((marker) => marker.setMap(null));
    facilityMarkers.current = [];
  
    places.forEach((place) => {
      const position = new window.kakao.maps.LatLng(place.lat, place.lng); // lat, lng 사용
  
      // **주택 커스텀 오버레이 콘텐츠 정의**
      const overlayContent = document.createElement('div');
      overlayContent.style.cssText = `
        display: flex;
        align-items: center;
        padding: 8px 12px;
        background: #efffe6;
        border-radius: 20px;
        border: 1px solid #d5d5d5;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        font-size: 14px;
        color: #333;
        font-weight: 500;
        cursor: pointer;
      `;
      overlayContent.dataset.houseId = place.houseId;
      overlayContent.innerHTML = `
        <span style="margin-right: 6px;">House ${place.houseId}</span>
        <img src="/icons/icon-marker.svg" alt="icon" style="width: 16px; height: 16px;" />
      `;
  
      // 클릭 이벤트 추가
      overlayContent.addEventListener('click', () => {
        console.log(`Clicked House ID: ${place.houseId}`);
      
        // mapViewData에서 facilities 가져오기
        const facilities = mapViewData?.houses?.find(
          (house) => String(house.houseId) === String(place.houseId)
        )?.facilities;
        
      
        console.log("Facilities for Clicked House:", facilities);
      
        // 기존 시설 마커 제거
        facilityMarkers.current.forEach((marker) => marker.setMap(null));
        facilityMarkers.current = [];
      
        // 관련 시설 마커 지도에 추가
        if (facilities && facilities.length > 0) {
          facilities.forEach((facility) => {
            const facilityPosition = new window.kakao.maps.LatLng(
              facility.latitude,
              facility.longitude
            );
      
            const facilityMarker = new kakao.maps.Marker({
              position: facilityPosition,
              title: `Facility ${facility.facilityId}`, // 마커 툴팁 텍스트
              image: new kakao.maps.MarkerImage(
                '/icons/facility-icon.svg', // 시설 마커 아이콘 경로
                new kakao.maps.Size(30, 30), // 마커 크기
                { offset: new kakao.maps.Point(12, 12) } // 마커 중심점
              ),
            });
      
            console.log(
              `Adding facility marker: ${facility.facilityId}, Position: ${facility.latitude}, ${facility.longitude}`
            );
      
            // 시설 마커를 지도에 추가
            facilityMarker.setMap(mapRef.current);
            facilityMarkers.current.push(facilityMarker);
          });
      
          console.log("Facilities markers added to the map.");
        } else {
          console.log(`No facilities found for House ID: ${place.houseId}`);
        }
      });
      
      
      
  
      const overlay = new kakao.maps.CustomOverlay({
        position,
        content: overlayContent,
        yAnchor: 1.5, // 말풍선 포인터 위치 조정
      });
  
      // 지도에 오버레이 추가
      overlay.setMap(mapRef.current);
      markers.current.push(overlay);
  
      // 초기 시설 마커 표시
      if (place.facilities && place.facilities.length > 0) {
        place.facilities.forEach((facility) => {
          const facilityPosition = new kakao.maps.LatLng(facility.latitude, facility.longitude);
  
          const facilityMarker = new kakao.maps.Marker({
            position: facilityPosition,
            title: `Facility ${facility.facilityId}`,
            image: new kakao.maps.MarkerImage(
              '/icons/facility-icon.png',
              new kakao.maps.Size(24, 24),
              { offset: new kakao.maps.Point(12, 12) }
            ),
          });
  
          facilityMarker.setMap(mapRef.current);
          facilityMarkers.current.push(facilityMarker);
        });
      }
    });
  };
  
  
  const updateMarkers = async (locations, displayMode) => {
    if (!mapRef.current || !geocoder.current) return;

    // 기존 오버레이 제거
    overlays.current.forEach((overlay) => overlay.setMap(null));
    overlays.current = [];
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = [];

    const markerData = await Promise.all(
      locations.map(async (location) => {
        const position = new window.kakao.maps.LatLng(location.lat, location.lng);

        let regionName;
        if (displayMode === 'dong') {
          regionName = await getRegionNameFromCoords(position, 'H'); // 동 이름
        } else if (displayMode === 'gu') {
          regionName = await getRegionNameFromCoords(position, 'B'); // 구 이름
        } else {
          regionName = location.name || '알 수 없음'; // 핀 이름
        }

        return {
          position,
          regionName,
        };
      })
    );

    const groupedData = markerData.reduce((acc, item) => {
      if (!acc[item.regionName]) {
        acc[item.regionName] = { count: 0, position: item.position };
      }
      acc[item.regionName].count += 1;
      return acc;
    }, {});

    Object.keys(groupedData).forEach((regionName) => {
      const { count, position } = groupedData[regionName];

      const overlayContent = `
        <div style="
          display: flex;
          align-items: center;
          padding: 5px 10px;
          background: rgba(0, 123, 255, 0.8);
          color: white;
          border-radius: 20px;
          border: 1px solid #004c80;
          font-size: 14px;
          font-weight: bold;
        ">
          ${regionName} (${count})
        </div>
      `;

      const overlay = new kakao.maps.CustomOverlay({
        position,
        content: overlayContent,
        yAnchor: 0.5,
      });

      overlay.setMap(mapRef.current);
      overlays.current.push(overlay);
    });
  };

  const getRegionNameFromCoords = (coords, regionType) => {
    return new Promise((resolve) => {
      geocoder.current.coord2RegionCode(coords.getLng(), coords.getLat(), (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const region = result.find((r) => r.region_type === regionType);
          resolve(region ? (regionType === 'B' ? region.region_2depth_name : region.region_3depth_name) : '알 수 없음');
        } else {
          resolve('알 수 없음');
        }
      });
    });
  };

  useEffect(() => {
    if (locations.length > 0) {
      handleMapIdle();
    }
  }, [locations, filters]);

  return <div id="map" className={styles.mapContainer} />;
};

export default MapView;
