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
    setMapState(updatedState);
  };

  useEffect(() => {
  }, [mapState]);

  return (
    <div>
    <NavBar mapState={mapState} />
    <MapView
        onMapChange={(state) => {
            handleMapStateChange(state);
        }}
    />
</div>
  );
}
