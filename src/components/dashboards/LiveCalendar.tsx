import {
  Grid,
  Paper,
  Typography,
  Box,
  IconButton
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useNavigate } from "react-router-dom";
import { useCalendar } from "../../context/CalendarContext";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function LiveCalendar() {

  const {
    state,
    currentDate,
    setCurrentDate,
    loading,
    error
  } = useCalendar();

  const navigate = useNavigate();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));

  const nextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  const daysArray: (number | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) daysArray.push(null);
  for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);

  const today = new Date();

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <IconButton onClick={prevMonth}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <Typography variant="h5">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </Typography>

        <IconButton onClick={nextMonth}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Grid container columns={7}>
        {weekDays.map((day) => (
          <Grid key={day} size={1}>
            <Typography align="center" fontWeight="bold">
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid container columns={7} spacing={1}>
        {daysArray.map((day, index) => {
          const fullDate =
            day !== null
              ? new Date(year, month, day).toDateString()
              : "";

          const dayData = state.find(
            (d) => d.date === fullDate
          );

          const allCompleted =
            dayData && dayData.habits.every(Boolean);

          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <Grid key={index} size={1}>
              <Paper
                onClick={() =>
                  day &&
                  navigate(`/habit/${encodeURIComponent(fullDate)}`)
                }
                sx={{
                  minHeight: 90,
                  p: 1,
                  cursor: "pointer",
                  bgcolor: isToday
                    ? "primary.light"
                    : allCompleted
                    ? "success.light"
                    : "background.paper"
                }}
              >
                <Typography>{day || ""}</Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}