import { Box, Container } from "@mui/material";
import Footer from "../common/Footer";
import NavBar from "./../common/NavBar";

export default function HeaderFooter(props) {
  const { children, ...other } = props;
  return (
    <Box
      sx={{
        ...other.sx,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="xl">
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
