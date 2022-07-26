import { Stack, styled, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import HeaderFooter from "../components/templates/HeaderFooter";

const StyledMapContainer = styled(MapContainer)({
  width: "100%",
  height: "100vh",
});

const SatelliteIcon = L.icon({
  iconUrl: "/assets/images/ISSIcon.png",
  iconSize: [50, 30],
  iconAnchor: [25, 15],
  popupAnchor: [50, 25],
});
const position = [14.6647, 140.0016];

export default function ISSLocation() {
  return (
    <HeaderFooter>
      <Stack direction="column" spacing={3}>
        <Typography variant="h2" component="h1">
          ISS Location Live Update
        </Typography>
        <StyledMapContainer center={position} zoom={5} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
          <Marker position={position} icon={SatelliteIcon}>
            <Popup>ISS Location</Popup>
          </Marker>
        </StyledMapContainer>
      </Stack>
    </HeaderFooter>
  );
}
