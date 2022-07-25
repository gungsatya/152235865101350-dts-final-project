import { Box, Button, styled, Typography } from "@mui/material";

const Content = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  height: "100vh",
  marginBottom: theme.spacing(5),
  [theme.breakpoints.up("xl")]: {
    height: "65vh",
  },
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
  padding: "40px 70px",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
}));
const Subtitle = styled(Typography)(({ theme }) => ({
  fontWeight: "300",
}));
const Overview = styled(Typography)(({ theme }) => ({
  maxWidth: "500px",
  marginTop: "30px",
}));

const Detail = styled(Button)(({ theme }) => ({
  marginTop: "30px",
}));

export default function HeroItem() {
  // function goDetailPage() {
  // navigate(`/src/${type}/detail/${id}`);
  // }

  return (
    <Content>
      <Background>
        <BackgroundShadow />
        <BackgroundImage
          sx={{
            backgroundImage: `url(https://apod.nasa.gov/apod/image/2207/FindTheMoon_soltanolkotabi_1500.jpg
)`,
          }}
        />
      </Background>
      <Area>
        <AreaContainer>
          <Title variant="h3">Find the New Moon</Title>
          <Subtitle variant="subtitle1">Astronomy Picture of the Day</Subtitle>
          <Overview variant="body1" align="left" gutterBottom paragraph>
            Can you find the Moon? This usually simple task can be quite
            difficult. Even though the Moon is above your horizon half of the
            time, its phase can be anything from crescent to full. The featured
            image was taken in late May from Sant Martí d'Empúries, Spain, over
            the Mediterranean Sea in the early morning. One reason you can't
            find this moon is because it is very near to its new phase, when
            very little of the half illuminated by the Sun is visible to the
            Earth. Another reason is because this moon is near the horizon and
            so seen through a long path of Earth's atmosphere -- a path which
            dims the already faint crescent. Any crescent moon is only visible
            near the direction the Sun, and so only locatable near sunrise of
            sunset. The Moon runs through all of its phases in a month
            (moon-th), and this month the thinnest sliver of a crescent -- a new
            moon -- will occur in three days.
          </Overview>
          <Typography variant="subtitle2" gutterBottom>
            By Mohamad Soltanolkotabi
          </Typography>
          <Detail variant="outlined">See Detail</Detail>
        </AreaContainer>
      </Area>
    </Content>
  );
}
