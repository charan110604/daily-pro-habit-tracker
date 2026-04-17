import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box>
      <Header />

      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h3" color="error">
          404
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Page Not Found
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate("/")}
        >
          Go Back Home
        </Button>
      </Container>

      <Footer />
    </Box>
  );
}