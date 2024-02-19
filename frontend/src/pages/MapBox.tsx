import { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '../styles/MapBox.css';

const MapBox = ({ onCoordinatesChange }: { onCoordinatesChange: (coords: number[]) => void }) => {
  const [coordinates, setCoordinates] = useState(null);
  const geocoderRef = useRef(null);
  const mapRef = useRef('');
  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoia29raXRvdHNvcyIsImEiOiJjaXk0d3R5bjEwMDJsMnlscWhtOGlydDl3In0.Xfr-Sr_D4JJVK2kVNsm4vA';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [11.967017, 57.707233],
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
        onCoordinatesChange(coordinates);
      });
    }
  }, []);

  console.log(coordinates);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '0 7% 0 7%',
        border: '1px solid gray',
        borderRadius: '5px',
      }}
    >
      <div style={{ maxWidth: '100%' }} id='geocoder-container' className='geocoder'></div>
      <div id='map' style={{ width: '100%', height: '200px' }}></div>
    </div>
  );
};

export default MapBox;
