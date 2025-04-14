// src/components/GoogleMapContainer.jsx
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '1rem',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
};

const center = {
  lat: 18.5204, // Pune latitude (example)
  lng: 73.8567, // Pune longitude (example)
};

const GoogleMapContainer = () => {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY_HERE">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapContainer;
