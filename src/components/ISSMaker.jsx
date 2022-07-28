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

export default function ISSMarker({ data, velocity }) {
  const [lat, lng] = data;
  const [prevPos, setPrevPos] = useState([lat, lng]);

  const { value, units } = velocity;

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
        <Typography variant="caption">{`ISS current speed ${value} / ${units} `}</Typography>
      </Popup>
    </LeafletTrackingMarker>
  );
}
