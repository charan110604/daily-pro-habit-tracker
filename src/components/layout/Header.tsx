import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Button
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";

export default function Header() {

  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="sticky" className={styles.appbar} elevation={0}>
      <Toolbar className={styles.toolbar}>

        {/* LEFT SECTION */}
        <Box className={styles.left} onClick={() => navigate("/")}>
          <TrackChangesIcon className={styles.logoIcon} />
          <Typography variant="h6" className={styles.logoText}>
            DailyDash Habit
          </Typography>
        </Box>

        {/* RIGHT SECTION */}
        <Box className={styles.right} display="flex" alignItems="center">

          {/* ROLE */}
          <Typography sx={{ mr: 2, fontWeight: "bold" }}>
            {user?.role?.toUpperCase()}
          </Typography>

          {/* USER BUTTON */}
          {user?.role === "user" && (
            <Button
              variant="contained"
              size="small"
              sx={{ mr: 2 }}
              onClick={() => navigate("/add-habit")}
            >
              Add Habit
            </Button>
          )}

          {/* ADMIN BUTTON */}
          {user?.role === "admin" && (
  <Button
    variant="contained"
    size="small"
    sx={{ mr:2 }}
    onClick={() => navigate("/users")}
  >
    Users
  </Button>
)}

          <IconButton className={styles.iconBtn}>
            <NotificationsNoneIcon />
          </IconButton>

          <IconButton className={styles.iconBtn}>
            <SettingsOutlinedIcon />
          </IconButton>

          <Avatar className={styles.avatar}>
            {user?.email?.charAt(0).toUpperCase()}
          </Avatar>

          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ ml: 2, borderRadius: 2 }}
            onClick={handleLogout}
          >
            Logout
          </Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
}