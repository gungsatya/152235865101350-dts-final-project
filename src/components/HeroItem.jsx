import { Box, Button, Modal, styled, Typography } from "@mui/material";
import Image from "mui-image";
import { useState } from "react";

const Content = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  width: "100%",
  height: "100%",
}));

const Background = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}));

const BackgroundShadow = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  background: "#000",
  width: "35%",
  zIndex: 2,
  "&:before": {
    content: '""',
    position: "absolute",
    zIndex: 10,
    backgroundImage: "linear-gradient(to right,#000,transparent)",
    top: 0,
    bottom: 0,
    left: "100%",
    width: "350px",
  },
}));

const BackgroundImage = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  width: "65%",
  height: "100%",
  backgroundPosition: "center 15%",
  backgroundSize: "cover",
  zIndex: 1,
}));

const Area = styled(Box)(({ theme }) => ({
  left: 0,
  right: 0,
  height: "100%",
  zIndex: 3,
  overflowY: "hidden",
}));
const AreaContainer = styled(Box)(({ theme }) => ({
  padding: "0 70px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  height: "100%",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  maxWidth: "35%",
}));
const Subtitle = styled(Typography)(({ theme }) => ({
  fontWeight: "300",
  maxWidth: "35%",
}));
const Overview = styled(Typography)(({ theme }) => ({
  maxWidth: "35%",
  marginTop: "30px",
}));

const Detail = styled(Button)(({ theme }) => ({
  marginTop: "30px",
  maxWidth: "fit-content",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function HeroItem({ item }) {
  const { title, explanation, url, copyright, media_type } = item;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Content>
        <Background>
          <BackgroundShadow />
          {media_type === "image" && (
            <BackgroundImage
              sx={{
                backgroundImage: `url(${url})`,
              }}
            />
          )}
          {media_type === "video" && (
            <BackgroundImage
              height="100%"
              width="100%"
              component="iframe"
              frameborder="0"
              src={`${url}&autoplay=1&controls=0&showinfo=0&autohide=1`}
            />
          )}
        </Background>
        <Area>
          <AreaContainer>
            <Title variant="h4">{title}</Title>
            <Subtitle variant="subtitle2">
              Astronomy Picture of the Day
            </Subtitle>
            <Overview variant="body2" align="left" gutterBottom paragraph>
              {explanation}
            </Overview>
            {copyright && (
              <Typography variant="subtitle2" gutterBottom>
                By {copyright}
              </Typography>
            )}
            <Detail variant="outlined" onClick={handleOpen}>
              See Detail
            </Detail>
          </AreaContainer>
        </Area>
      </Content>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={title}
        aria-describedby="Astronomy Picture of the Day"
      >
        <Box sx={style}>
          {media_type === "image" && (
            <Image src={url} sx={{ maxHeight: "75vh" }} />
          )}
          {media_type === "video" && (
            <Box
              component="iframe"
              alt="Youtube Video"
              src={url}
              sx={{ height: "75vh", width: "80vw" }}
            />
          )}
        </Box>
      </Modal>
    </>
  );
}
