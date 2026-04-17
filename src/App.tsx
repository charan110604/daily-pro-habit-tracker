import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { CalendarProvider } from "./context/CalendarContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HabitDetails from "./pages/HabitDetails";
import AddHabit from "./pages/AddHabit";
import UserManagement from "./pages/UserManagement";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./Route/ProtectedRoute";

function AppRoutes() {

  const { user } = useAuth();

  const userKey = user?.email || "guest";

  return (

    <CalendarProvider key={userKey}>

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/habit/:id"
          element={
            <ProtectedRoute>
              <HabitDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-habit"
          element={
            <ProtectedRoute>
              <AddHabit />
            </ProtectedRoute>
          }
        />

        <Route path="/users" element={<UserManagement />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

    </CalendarProvider>

  );
}

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <AppRoutes />

      </BrowserRouter>

    </AuthProvider>

  );
}

export default App;