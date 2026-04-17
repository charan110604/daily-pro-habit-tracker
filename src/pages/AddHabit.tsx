import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
import { useCalendar } from "../context/CalendarContext";


import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

interface FormData {
  name: string;
}

export default function AddHabit() {

  const { dispatch, habits } = useCalendar();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {

    const name = data.name.trim();

    if (!name) return;

    if (habits.includes(name)) {
      alert("Habit already exists");
      return;
    }

    dispatch({
      type: "ADD_HABIT",
      name
    });

    reset();
  };

  const deleteHabit = (index: number) => {

    dispatch({
      type: "DELETE_HABIT",
      habitIndex: index
    });

  };

  return (
    <Box>

      <Header />

      <Container sx={{ mt: 5 }}>

        <Paper sx={{ p: 4 }}>

          <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mb: 2 }}
        >
          Back
        </Button>

          <Typography variant="h5" mb={3}>
            Manage Habits
          </Typography>

          {/* ADD HABIT FORM */}

          <form onSubmit={handleSubmit(onSubmit)}>

            <TextField
              fullWidth
              label="Habit Name"
              margin="normal"
              {...register("name", {
                required: "Habit name is required",
                minLength: {
                  value: 2,
                  message: "Habit name must be at least 2 characters"
                }
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Add Habit
            </Button>

          </form>

          {/* EXISTING HABITS */}

          <Typography variant="h6" mt={4} mb={2}>
            Existing Habits
          </Typography>

          {habits.length === 0 && (
            <Alert severity="info">
              No habits added yet
            </Alert>
          )}

          <List>

            {habits.map((habit, index) => (

              <ListItem
                key={habit}
                secondaryAction={

                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => deleteHabit(index)}
                  >
                    <DeleteIcon />
                  </IconButton>

                }
              >

                <ListItemText primary={habit} />

              </ListItem>

            ))}

          </List>

        </Paper>

      </Container>

      <Footer />

    </Box>
  );
}