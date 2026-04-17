import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Avatar,
  Chip,
  Box
} from "@mui/material";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function UserManagement() {

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const deleteUser = (email:string) => {

    const updated = users.filter((u:any)=>u.email !== email);

    localStorage.setItem("users", JSON.stringify(updated));

    window.location.reload();
  };

  return (
    <>
      <Header />

      <Container sx={{ mt:5 }}>

        <Paper sx={{ p:4 }}>

          <Typography variant="h5" mb={3}>
            User Management
          </Typography>

          <Table>

            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {users.map((user:any)=>(
                <TableRow key={user.email}>

                  <TableCell>

                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar>
                        {user.email.charAt(0).toUpperCase()}
                      </Avatar>
                      {user.email}
                    </Box>

                  </TableCell>

                  <TableCell>

                    <Chip
                      label={user.role}
                      color={user.role === "admin" ? "primary" : "success"}
                    />

                  </TableCell>

                  <TableCell>

                    {user.role !== "admin" && (

                      <Button
                        color="error"
                        variant="contained"
                        size="small"
                        onClick={()=>deleteUser(user.email)}
                      >
                        Delete
                      </Button>

                    )}

                  </TableCell>

                </TableRow>
              ))}

            </TableBody>

          </Table>

        </Paper>

      </Container>

      <Footer />
    </>
  );
}