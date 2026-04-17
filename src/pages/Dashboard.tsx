import { Box, Container, Typography, Paper } from "@mui/material";

import { useCalendar } from "../context/CalendarContext";
import { useAuth } from "../context/AuthContext";

import { calculateStreak } from "../utils/streak";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LiveCalendar from "../components/dashboards/LiveCalendar";


export default function Dashboard() {

  const { state } = useCalendar();
  const { user } = useAuth();

  const streak = calculateStreak(state);

  return (
    <Box>

      <Header />

      <Container sx={{ mt: 4 }}>

        {/* STREAK ONLY FOR USERS */}

        {user?.role === "user" && (

          <Paper
            sx={{
              p: 3,
              mb: 3,
              textAlign: "center",
              borderRadius: 3
  
            }}>

            <Typography variant="h6">
              Current Streak 🔥
            </Typography>

            <Typography variant="h3" fontWeight="bold">
              {streak} Days
            </Typography>

          </Paper>

        )}

        <LiveCalendar />

      </Container>

      <Footer />

    </Box>
  );
}