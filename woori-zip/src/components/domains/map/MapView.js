import { useEffect, useRef } from 'react';
import styles from '../map/mapView.module.css';

const MapView = ({ filters, locations = [], selectedLocation }) => {
  const mapRef = useRef(null); // map 객체를 저장할 ref
  const clustererRef = useRef(null); // clusterer 객체를 저장할 ref
  const circleRef = useRef(null); // 원 객체를 저장할 ref
  const isMapLoaded = useRef(false); // 맵이 로드되었는지 확인하는 변수

  useEffect(() => {
    if (!isMapLoaded.current) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=clusterer`;
      script.async = true;
      document.head.appendChild(script);
  
      script.onload = () => {
        console.log('Kakao Maps script loaded:', window.kakao); // Kakao 객체 확인
        if (window.kakao && window.kakao.maps) {
          console.log('Kakao Maps API loaded:', window.kakao.maps); // Maps 객체 확인
          window.kakao.maps.load(() => {
            const container = document.getElementById('map');
            const options = {
              center: new window.kakao.maps.LatLng(37.5665, 126.9780),
              level: 7,
            };
            mapRef.current = new window.kakao.maps.Map(container, options);
            clustererRef.current = new window.kakao.maps.MarkerClusterer({
              map: mapRef.current,
              averageCenter: true,
              minLevel: 10,
            });
            updateMarkers(locations);
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
  }, [locations]);
  

  // 마커 업데이트 함수
  const updateMarkers = (locations) => {
    if (!mapRef.current || !clustererRef.current) return;

    clustererRef.current.clear();

    const markers = locations.map(location => {
      const position = new window.kakao.maps.LatLng(location.lat, location.lng);
      return new window.kakao.maps.Marker({
        position,
        title: location.name || "No name",
      });
    });

    clustererRef.current.addMarkers(markers);
  };

  // selectedLocation 변경 시 지도 중심 이동 및 반경 2km 원 표시
  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      const newCenter = new window.kakao.maps.LatLng(selectedLocation.lat, selectedLocation.lng);
      mapRef.current.setCenter(newCenter);

      // 기존에 그려진 원이 있으면 제거
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }

      // 2km 반경 원 생성
      circleRef.current = new window.kakao.maps.Circle({
        center: newCenter,
        radius: 2000, // 반경 2km
        strokeWeight: 2, // 선의 두께
        strokeColor: '#004c80', // 선의 색깔
        strokeOpacity: 0.8, // 선의 불투명도
        strokeStyle: 'solid', // 선의 스타일
        fillColor: '#aaddff', // 채우기 색깔
        fillOpacity: 0.4, // 채우기 불투명도
      });

      // 원을 지도에 표시
      circleRef.current.setMap(mapRef.current);
    }
  }, [selectedLocation]); // selectedLocation 변경 시마다 실행

  return <div id="map" className={styles.mapContainer} />;
};

export default MapView;
