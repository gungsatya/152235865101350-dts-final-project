import {
  alpha,
  Box,
  Card,
  CardActionArea,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputBase,
  Pagination,
  Slider,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import HeaderFooter from "../components/templates/HeaderFooter";
import { useGetImageSearchQuery } from "../services/nasaApi";
import Masonry from "@mui/lab/Masonry";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Image from "mui-image";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginLeft: 0,
  marginRight: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

// const WrapperImage = forwardRef((props, ref) => {
//   return <Image {...props} ref={ref} />;
// });

export default function GaleryNasaPage() {
  function yearRangeFn() {
    const min = 1920;
    const max = new Date().getFullYear();

    const step = Math.round((max - min) / 5);
    const steps = [
      min,
      step * 1 + min,
      step * 2 + min,
      step * 3 + min,
      step * 4 + min,
      max,
    ];

    return {
      initialState: [min, max],
      marks: steps.map((val) => ({
        label: <Typography variant="caption">{val}</Typography>,
        value: val,
      })),
    };
  }
  const { initialState: yearRangeInitialState, marks: yearRangeMarks } =
    yearRangeFn();
  const [keyword, setKeyWord] = useState("");
  const [page, setPage] = useState(1);
  const [yearRange, setYearRange] = useState(yearRangeInitialState);
  const [mediaType, setMediaType] = useState({
    image: true,
    video: true,
    audio: false,
  });

  const [skip, setSkip] = useState(false);

  const { data, isLoading } = useGetImageSearchQuery(
    {
      params: {
        q: keyword,
        media_type: Object.keys(mediaType).filter((key) => mediaType[key]),
        year_start: yearRange[0],
        year_end: yearRange[1],
        page: page,
      },
    },
    {
      skip,
    }
  );

  let count_page = data
    ? Math.ceil(data.collection.metadata.total_hits / 100)
    : 0;

  const handleMediaTypeChange = (event) => {
    setMediaType({
      ...mediaType,
      [event.target.name]: event.target.checked,
    });
    setPage(1);
    setSkip(false);
  };

  const {
    image: isImageTypeActive,
    video: isVideoTypeActive,
    audio: isAudioTypeActive,
  } = mediaType;

  const handleYearRangeChange = (event, newValue) => {
    setYearRange(newValue);
    setPage(1);
    setSkip(false);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  function handleOnKeywordChange(event) {
    setKeyWord(event.target.value);
    setSkip(true);
  }

  function searchSubmitHandler(event) {
    event.preventDefault();
    setPage(1);
    setSkip(false);
  }

  function handlePageChange(_, newPageVal) {
    setPage(newPageVal);
    setSkip(false);
    console.log(newPageVal);
  }

  return (
    <>
      <HeaderFooter>
        <Stack direction="column" gap={3}>
          <Typography variant="h2" component="h1">
            Galery Nasa
          </Typography>
          <Grid container spacing={5}>
            <Grid item component={Box} xs={12} md={3}>
              <Stack direction={"column"}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Media Type</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControl component="fieldset" variant="standard">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isAudioTypeActive}
                              onChange={handleMediaTypeChange}
                              name="audio"
                            />
                          }
                          label="Audio"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isImageTypeActive}
                              onChange={handleMediaTypeChange}
                              name="image"
                            />
                          }
                          label="Image"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isVideoTypeActive}
                              onChange={handleMediaTypeChange}
                              name="video"
                            />
                          }
                          label="Video"
                        />
                      </FormGroup>
                    </FormControl>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Year Range</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Slider
                      value={yearRange}
                      onChange={handleYearRangeChange}
                      valueLabelDisplay="auto"
                      min={1920}
                      max={new Date().getFullYear()}
                      marks={yearRangeMarks}
                    />
                  </AccordionDetails>
                </Accordion>
              </Stack>
            </Grid>
            <Grid item component={Box} xs={12} md={9}>
              <Stack direction={"column"} spacing={3}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <form onSubmit={searchSubmitHandler}>
                    <StyledInputBase
                      placeholder="Search for ...... (ex: Mars)"
                      inputProps={{ "aria-label": "search" }}
                      onChange={handleOnKeywordChange}
                      value={keyword}
                    />
                  </form>
                </Search>
                <Divider />
                {isLoading && (
                  <Typography variant="h6">Loading .... </Typography>
                )}
                {data && !isLoading && (
                  <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
                    {data?.collection?.items?.map((item, index) => (
                      <Card key={index}>
                        <CardActionArea>
                          <Tooltip title={item.data[0].title}>
                            <Box>
                              <Image
                                showLoading
                                src={
                                  item.data[0].media_type !== "audio"
                                    ? item.links[0].href
                                    : "/assets/images/play-button.png"
                                }
                                alt={item.data[0].title}
                              />
                            </Box>
                          </Tooltip>
                        </CardActionArea>
                      </Card>
                    ))}
                  </Masonry>
                )}
                <Divider />
                {data && (
                  <Pagination
                    page={page}
                    count={count_page > 100 ? 100 : count_page}
                    onChange={handlePageChange}
                    shape="rounded"
                    variant="outlined"
                    siblingCount={0}
                  />
                )}
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </HeaderFooter>
    </>
  );
}
