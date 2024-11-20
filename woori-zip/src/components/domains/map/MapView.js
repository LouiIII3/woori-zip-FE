import { useEffect, useRef } from 'react';
import styles from '../map/mapView.module.css';

const MapView = ({ filters, locations = [], selectedLocation, onMapChange = () => {} }) => {
  const mapRef = useRef(null); // Map 객체를 저장할 ref
  const clustererRef = useRef(null); // Clusterer 객체를 저장할 ref
  const circleRef = useRef(null); // 원 객체를 저장할 ref
  const isMapLoaded = useRef(false); // 맵이 로드되었는지 확인하는 변수

  useEffect(() => {
    if (!isMapLoaded.current) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=clusterer`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
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
              minLevel: 6,
            });

            mapRef.current.addListener('idle', handleMapIdle);
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

  const handleMapIdle = () => {
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

    console.log('지도 상태 업데이트:', mapState);

    if (onMapChange) {
      onMapChange(mapState);
    }
  };

  const updateMarkers = (locations) => {
    if (!mapRef.current || !clustererRef.current) return;

    clustererRef.current.clear();

    const markers = locations.map((location) => {
      const position = new window.kakao.maps.LatLng(location.lat, location.lng);
      return new window.kakao.maps.Marker({
        position,
        title: location.name || 'No name',
      });
    });

    clustererRef.current.addMarkers(markers);
  };

  useEffect(() => {
    if (locations.length > 0) {
      updateMarkers(locations);
    }
  }, [locations]);

  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      const newCenter = new window.kakao.maps.LatLng(selectedLocation.lat, selectedLocation.lng);
      mapRef.current.setCenter(newCenter);

      if (circleRef.current) {
        circleRef.current.setMap(null);
      }

      circleRef.current = new window.kakao.maps.Circle({
        center: newCenter,
        radius: 2000,
        strokeWeight: 2,
        strokeColor: '#004c80',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        fillColor: '#aaddff',
        fillOpacity: 0.4,
      });

      circleRef.current.setMap(mapRef.current);
    }
  }, [selectedLocation]);

  return <div id="map" className={styles.mapContainer} />;
};

export default MapView;
