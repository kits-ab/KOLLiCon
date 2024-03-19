import { useEffect, useState, useRef } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '@/styles/MapBox/MapBox.css';
import { DeleteButton } from '../../styles/RegisterActivity/StyledActivity';
import { Colors } from '../../styles/Common/colors';

const MapBox = ({
  onCoordinatesChange,
  resetLocation,
  storedCoords
}: {
  onCoordinatesChange: (coords: number[]) => void;
  resetLocation: () => void;
  storedCoords: number[];
}) => {
  const [coordinates, setCoordinates] = useState<LngLatLike | null>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoia29raXRvdHNvcyIsImEiOiJjaXk0d3R5bjEwMDJsMnlscWhtOGlydDl3In0.Xfr-Sr_D4JJVK2kVNsm4vA';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: storedCoords?.length !==1 && storedCoords ? [storedCoords[1], storedCoords[0]]: [11.967017, 57.707233] as mapboxgl.LngLatLike,
      // center: [11.967017, 57.707233] as mapboxgl.LngLatLike,
      zoom: 12,
    });
    // Update the type of mapRef.current
    mapRef.current = map;

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (coordinates && mapRef.current) {
      mapRef.current.flyTo({
        center: coordinates,
        essential: true,
        animate: false,
        zoom: 15,
      });
    }
  }, [coordinates]);

  useEffect(() => {
    if (mapRef.current && !geocoderRef.current) {
      // Create the geocoder only if it's not already initialized
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });

      // Store the geocoder instance in the ref
      geocoderRef.current = geocoder;

      // Add the geocoder to a separate container
      const geocoderContainer = document.getElementById('geocoder-container');
      if (geocoderContainer) {
        geocoder.addTo(geocoderContainer);
      }

      // Handle the event when a location is selected
      geocoder.on('result', (event) => {
        const { result } = event;
        const { geometry } = result;
        const { coordinates } = geometry;
        setCoordinates(geometry.coordinates);

        // Switch the coordinates to [long, lat] and send it to activity component
        const switchedCoordinates: number[] = [coordinates[1], coordinates[0]];
        onCoordinatesChange(switchedCoordinates);
      });
    }
  }, []);

  useEffect(() => {
    if (coordinates && mapRef.current) {
      // Cast mapRef.current to mapboxgl.Map
      const map = mapRef.current as unknown as mapboxgl.Map;
      // Set map center
      map.setCenter(coordinates);

      // Create or update marker
      if (!marker) {
        const newMarker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
        setMarker(newMarker);
      } else {
        (marker as mapboxgl.Marker).setLngLat(coordinates);
      }
    }
  }, [coordinates]);

  // Function to clear the search box
  const clearSearchBox = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (geocoderRef.current) {
      (geocoderRef.current as MapboxGeocoder).clear();
      resetLocation();
      // Add a type check to ensure mapRef.current is not a string
      if (mapRef.current && typeof mapRef.current !== 'string') {
        // Cast mapRef.current to mapboxgl.Map
        (mapRef.current as mapboxgl.Map).flyTo({
          // Convert initialCenter to LngLatLike
          center: storedCoords?.length !==1 && storedCoords ? [storedCoords[1], storedCoords[0]]: [11.967017, 57.707233] as mapboxgl.LngLatLike,
          // center: [11.967017, 57.707233] as mapboxgl.LngLatLike,
          essential: true,
          animate: true,
          zoom: 12,
          duration: 1500,
        });
      }
      setCoordinates(null);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '2% 7% 0 7%',
      }}
    >
      <div style={{ border: `1px solid ${Colors.primaryBorder}`, borderRadius: '4px 4px 4px 4px' }}>
        <div style={{ maxWidth: '100%' }} id='geocoder-container' className='geocoder'></div>
        <div id='map' style={{ width: '100%', height: '160px' }}></div>
      </div>

      <DeleteButton
        style={{
          margin: '4% 0 -1% 40%',
          maxWidth: '20%',
        }}
        onClick={clearSearchBox}
      >
        Rensa
      </DeleteButton>
    </div>
  );
};

export default MapBox;
