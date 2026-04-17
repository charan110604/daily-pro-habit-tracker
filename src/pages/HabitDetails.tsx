import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HabitCell from "../components/dashboards/HabitCell";
import MoodSelector from "../components/dashboards/MoodSelector";
import { useCalendar } from "../context/CalendarContext";

export default function HabitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch, habits } = useCalendar();

  const decodedDate = id ? decodeURIComponent(id) : "";

  const selectedDay = state.find(
    (d) => d.date === decodedDate
  );

  if (!selectedDay) return null;

  return (
    <Box>
      <Header />

      <Container sx={{ mt: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mb: 2 }}
        >
          Back
        </Button>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" mb={3}>
            {selectedDay.date}
          </Typography>

          {selectedDay.habits.map((checked, i) => (
            <HabitCell
              key={i}
              checked={checked}
              label={habits[i]}
              onClick={() =>
                dispatch({
                  type: "TOGGLE_HABIT",
                  date: selectedDay.date,
                  habitIndex: i
                })
              }
            />
          ))}

          <MoodSelector
            mood={selectedDay.mood}
            setMood={(m) =>
              dispatch({
                type: "SET_MOOD",
                date: selectedDay.date,
                mood: m
              })
            }
          />
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}