import { Stack, styled, Typography } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import HeaderFooter from "../components/templates/HeaderFooter";

import ISSMarker from "../components/ISSMaker";
import {
  useGetAstronotInISSQuery,
  useGetCurrentISSLocationQuery,
} from "../services/openNotifyApi";

const StyledMapContainer = styled(MapContainer)({
  width: "100%",
  height: "70vh",
});

const zoom = 3;

export default function ISSLocation() {
  const { data } = useGetCurrentISSLocationQuery({}, { pollingInterval: 8000 });
  const { data: astronotData } = useGetAstronotInISSQuery({});

  const currPosition = data
    ? [data.iss_position.latitude, data.iss_position.longitude]
    : null;

  return (
    <HeaderFooter>
      <Stack direction="column" spacing={3}>
        <Typography variant="h2" component="h1">
          ISS Location Live Update
        </Typography>
        {currPosition && astronotData && (
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
            <ISSMarker data={currPosition} astronotData={astronotData} />
          </StyledMapContainer>
        )}
      </Stack>
    </HeaderFooter>
  );
}
