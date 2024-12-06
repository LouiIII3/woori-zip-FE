import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import MapView from './MapView';

export default function Latitude() {
  const [mapState, setMapState] = useState({
    southWestLatitude: 37.518062917095584,
    southWestLongitude: 126.89557051604238,
    northEastLatitude: 37.614824485991925,
    northEastLongitude: 127.06052789768778,
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
