import React from 'react';
import { Map, Circle, TileLayer, Marker, Popup } from 'react-leaflet';
import styled from 'styled-components';
import L from 'leaflet';

export const protestPoint = new L.Icon({
  iconUrl: '/icons/megaphone.svg',
  iconRetinaUrl: '/icons/megaphone.svg',
  iconAnchor: [20, 38],
  popupAnchor: [0, -35],
  iconSize: [40, 38],
});

export const positionPoint = new L.Icon({
  iconUrl: '/icons/marker.svg',
  iconRetinaUrl: '/icons/marker.svg',
  iconAnchor: [17.5, 40],
  popupAnchor: [0, -35],
  iconSize: [35, 40],
});

const PopupMarker = ({ latlng, displayName }) => (
  <Marker position={latlng} icon={protestPoint}>
    <Popup>{displayName}</Popup>
  </Marker>
);

const MarkersList = ({ markers }) => {
  const items = markers.map(({ id, ...props }) => <PopupMarker key={id} {...props} />);
  return <>{items}</>;
};

// Initial map value, before the user provide their coordinates.
const balfur = [31.7749837, 35.219797];

function AppMap({ protests, coordinates }) {
  return (
    <>
      <MapWrapper center={coordinates.length > 0 ? coordinates : balfur} zoom={15}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordinates.length === 2 && (
          <>
            <Marker position={coordinates} icon={positionPoint}></Marker>
            <MarkersList markers={protests} />
            <Circle radius={1000} center={coordinates} />
          </>
        )}
      </MapWrapper>
    </>
  );
}

const MapWrapper = styled(Map)`
  width: 100%;
  height: 350px;
  grid-row: 1;
  grid-column: 2 / -1;
  z-index: 0;

  @media (min-width: 768px) {
    height: 100%;
  }
`;

export default AppMap;
