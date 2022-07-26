import { Stack, styled, Typography } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import HeaderFooter from "../components/templates/HeaderFooter";
import { useState, useEffect } from "react";

import axios from "axios";
import ISSMarker from "../components/ISSMaker";

const StyledMapContainer = styled(MapContainer)({
  width: "100%",
  height: "70vh",
});

const position = [14.6647, 140.0016];
const zoom = 3;

export default function ISSLocation() {
  const [currPosition, setCurrPosition] = useState(position);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get("http://api.open-notify.org/iss-now.json").then((response) => {
        const issPosition = response.data.iss_position;
        setCurrPosition([issPosition.latitude, issPosition.longitude]);
      });
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <HeaderFooter>
      <Stack direction="column" spacing={3}>
        <Typography variant="h2" component="h1">
          ISS Location Live Update
        </Typography>
        <StyledMapContainer
          center={currPosition}
          zoom={zoom}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            //url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
          <ISSMarker data={currPosition ?? position} />
        </StyledMapContainer>
      </Stack>
    </HeaderFooter>
  );
}
