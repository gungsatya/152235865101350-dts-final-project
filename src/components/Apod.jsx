import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { useGetAPODQuery } from "../services/nasaApi";
import HeroItem from "./HeroItem";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { styled } from "@mui/material";

const StyledSwiper = styled(Swiper)(({ theme }) => ({
  height: "100vh",
  [theme.breakpoints.up("xl")]: {
    height: "80vh",
  },
}));

export default function Apod() {
  const { data: apods } = useGetAPODQuery({ count: 5 });

  return (
    <StyledSwiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      speed={500}
      loop={true}
      touchRatio={1.5}
      navigation
      effect={"flip"}
    >
      {apods?.map((apod, idx) => (
        <SwiperSlide key={idx}>
          <HeroItem item={apod} />
        </SwiperSlide>
      ))}
    </StyledSwiper>
  );
}
