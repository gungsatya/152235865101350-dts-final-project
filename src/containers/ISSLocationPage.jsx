import { Stack, styled, Typography } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import HeaderFooter from "../components/templates/HeaderFooter";

import ISSMarker from "../components/ISSMaker";
import { useGetCurrentISSPositionQuery } from "../services/whereTheISSAPI";

const StyledMapContainer = styled(MapContainer)({
  width: "100%",
  height: "70vh",
});

const zoom = 4;

export default function ISSLocation() {
  const { data } = useGetCurrentISSPositionQuery({}, { pollingInterval: 5000 });

  const currPosition = data ? [data.latitude, data.longitude] : null;
  const currVelocity = data
    ? { value: data.velocity, units: data.units }
    : null;

  return (
    <HeaderFooter>
      <Stack direction="column" spacing={3}>
        <Typography variant="h2" component="h1">
          ISS Location Live Update
        </Typography>
        {currPosition && (
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
            <ISSMarker data={currPosition} velocity={currVelocity} />
          </StyledMapContainer>
        )}
      </Stack>
    </HeaderFooter>
  );
}
