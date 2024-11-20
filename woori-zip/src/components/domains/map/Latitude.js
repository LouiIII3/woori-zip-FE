import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import MapView from './MapView';

export default function Latitude() {
  const [mapState, setMapState] = useState({
    southWestLatitude: 37.51377252451862,
    southWestLongitude: 126.94733579996854,
    northEastLatitude: 37.61902018831534,
    northEastLongitude: 127.00978649788111,
    zoomLevel: 7,
  });

  const handleMapStateChange = (updatedState) => {
    console.log('handleMapStateChange 호출됨:', updatedState); // 확인 로그
    setMapState(updatedState); // 상태 업데이트
  };

  useEffect(() => {
    console.log('Latitude에서 mapState 변경됨:', mapState); // 상태 변경 확인 로그
  }, [mapState]);

  return (
    <div>
    <NavBar mapState={mapState} />
    <MapView
        onMapChange={(state) => {
            console.log('Latitude에서 전달된 onMapChange 호출됨:', state);
            handleMapStateChange(state);
        }}
    />
</div>
  );
}
