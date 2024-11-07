import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  lat: number;
  lng: number;
  zoom?: number;
  locationDetails?: Array<any>;
};

const containerStyle = {
  width: '100%',
  height: '350px',
};


const Map: React.FC<MapProps> = ({ lat, lng, zoom, locationDetails }) => {
  const yellowCircleIcon = {
    path: "M 0, 0 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
    fillColor: "yellow",
    fillOpacity: 1,
    strokeColor: "white",
    strokeWeight: 2,
    scale: 1.5,
  };

  const orangeCircleIcon = {
    path: "M 0, 0 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
    fillColor: "orange",
    fillOpacity: 1,
    strokeColor: "white",
    strokeWeight: 2,
    scale: 1.5,
  };


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading...</p>;


  return (
    <div className="w-full h-[350px]">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={zoom}
        mapTypeId="hybrid"
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: false,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: window.google.maps.MapTypeControlStyle.DEFAULT,
            position: window.google.maps.ControlPosition.TOP_RIGHT,
          },
        }}
      >
        {locationDetails?.map((locationData: {
          id: React.Key | null | undefined; lat: string; long: string; total_land_size_in_acres: {
            guntas: number; acres: any;
          }; price_per_acre_crore: { crore: number; lakh: any; };
        }, index) => {
          return (
            <Marker
              key={index}
              position={{ lat: parseFloat(locationData.lat), lng: parseFloat(locationData.long) }}
              icon={locationData?.price_per_acre_crore?.crore > 0 ? orangeCircleIcon : yellowCircleIcon}
              title={`${locationData?.total_land_size_in_acres?.acres > 0 ? `${locationData?.total_land_size_in_acres?.acres} Acres` : ''} ${locationData?.total_land_size_in_acres?.guntas > 0 ? `${locationData?.total_land_size_in_acres?.guntas} Guntas` : ''}- ₹ ${locationData?.price_per_acre_crore?.crore > 0 ? `${locationData?.price_per_acre_crore?.crore} crore` : ''} ${locationData?.price_per_acre_crore?.lakh > 0 ? locationData?.price_per_acre_crore?.lakh + ' lakh' : ''} per acre`}
              ria-label={`${locationData?.total_land_size_in_acres?.acres > 0 ? `${locationData?.total_land_size_in_acres?.acres} Acres` : ''} ${locationData?.total_land_size_in_acres?.guntas > 0 ? `${locationData?.total_land_size_in_acres?.guntas} Guntas` : ''}- ₹ ${locationData?.price_per_acre_crore?.crore > 0 ? `${locationData?.price_per_acre_crore?.crore} crore` : ''} ${locationData?.price_per_acre_crore?.lakh > 0 ? locationData?.price_per_acre_crore?.lakh + ' lakh' : ''} per acre`}
            />
          )
        })}
      </GoogleMap>
    </div>
  );
};

export default Map;