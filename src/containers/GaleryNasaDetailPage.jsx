import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import HeaderFooter from "./../components/templates/HeaderFooter";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetImageAssetByIDQuery } from "../services/nasaApi";

function getFileExtension(filename) {
  var ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
}

export default function GaleryNasaDetailPage() {
  const navigate = useNavigate();
  const [skip, setSkip] = useState(true);
  const detail = useSelector((state) => state.galeryNasa.itemDetail);
  const { data: assets } = useGetImageAssetByIDQuery(
    { nasa_id: detail.data[0].nasa_id },
    { skip }
  );

  useEffect(() => {
    if (detail !== null) setSkip(false);
  }, [detail, navigate]);

  return (
    <HeaderFooter>
      <Container maxWidth="xl">
        {detail && (
          <Card
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
              },
            }}
          >
            <CardHeader
              title={detail.data[0].title}
              subheader={new Date(
                detail.data[0].date_created
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            {detail.data[0].media_type === "image" && (
              <Image
                sx={{
                  height: { xs: "75vh", md: "50vh" },
                  objectFit: "contain",
                }}
                src={detail.links[0].href}
                showLoading
                alt={`${detail.data[0].title} Image`}
              />
            )}
            {detail.data[0].media_type === "video" && assets && (
              <CardMedia
                component={"video"}
                sx={{
                  height: { xs: "75vh", md: "50vh" },
                  objectFit: "contain",
                }}
                src={
                  [...assets.collection.items].find(
                    (item) => getFileExtension(item.href) === "mp4"
                  ).href
                }
                alt={`${detail.data[0].title} Video`}
                autoPlay
                controls
              />
            )}
            {detail.data[0].media_type === "audio" && assets && (
              <CardMedia
                component={"audio"}
                sx={{
                  height: { xs: "100px" },
                  padding: "0 50px",
                }}
                src={
                  [...assets.collection.items].find(
                    (item) =>
                      getFileExtension(item.href) === "wav" ||
                      getFileExtension(item.href) === "mp3"
                  ).href
                }
                alt={`${detail.data[0].title} Audio`}
                autoPlay
                controls
              />
            )}
            <CardContent
              sx={{ padding: { xs: "30px", sm: "50px", xl: "50px 80px" } }}
            >
              <Stack direction="column" spacing={4}>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Overview
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {detail.data[0].description}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Keyword
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {detail.data[0].keywords.join(", ")}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Container>
    </HeaderFooter>
  );
}
