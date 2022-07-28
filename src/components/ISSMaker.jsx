import { useEffect, useState } from "react";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import L from "leaflet";
import { Popup } from "react-leaflet";
import { Typography } from "@mui/material";

const SatelliteIcon = L.icon({
  iconUrl: "/assets/images/ISSIcon.png",
  iconSize: [50, 30],
  iconAnchor: [25, 15],
  popupAnchor: [50, 25],
});

export default function ISSMarker({ data, astronotData }) {
  const [lat, lng] = data;
  const [prevPos, setPrevPos] = useState([lat, lng]);

  const { number, people } = astronotData;

  useEffect(() => {
    if (prevPos[1] !== lng && prevPos[0] !== lat) setPrevPos([lat, lng]);
  }, [lat, lng, prevPos]);

  return (
    <LeafletTrackingMarker
      icon={SatelliteIcon}
      position={[lat, lng]}
      previousPosition={prevPos}
      duration={1000}
      keepAtCenter={true}
    >
      <Popup>
        <Typography variant="caption">{`There are currently ${number} humans in space. They are:`}</Typography>
        <ul>
          {people.map((person, idx) => (
            <Typography component="li" variant="caption" key={idx}>
              {person.name}
            </Typography>
          ))}
        </ul>
      </Popup>
    </LeafletTrackingMarker>
  );
}
