import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/auth";
import { useForm } from "react-hook-form";
import loginBg from "../assets/login.jpg";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {

    const user = await loginUser(data.email, data.password);

    if (user) {

      /* CURRENT USER */
      localStorage.setItem("currentUser", data.email);

      login(user.email, user.role);

      /* STORE USERS FOR ADMIN PANEL */

      const storedUsers =
        JSON.parse(localStorage.getItem("users") || "[]");

      const userExists =
        storedUsers.find((u: any) => u.email === user.email);

      if (!userExists) {

        storedUsers.push({
          email: user.email,
          role: user.role
        });

        localStorage.setItem(
          "users",
          JSON.stringify(storedUsers)
        );

      }

      navigate("/");

    } else {

      alert("Invalid email or password");

    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}
    >

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.45)"
        }}
      />

      <Container sx={{ position: "relative", zIndex: 2 }}>

        <Paper
          sx={{
            p: 5,
            borderRadius: 4,
            maxWidth: 420,
            mx: "auto",
            backdropFilter: "blur(10px)",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 25px 45px rgba(0,0,0,0.25)"
          }}
        >

          <Typography variant="h4" mb={3} textAlign="center" fontWeight="bold">
            ⚡ DailyDash Login
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email"
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters"
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, borderRadius: 2, fontWeight: "bold" }}
              type="submit"
            >
              LOGIN
            </Button>

          </form>

        </Paper>

      </Container>

    </Box>
  );
}