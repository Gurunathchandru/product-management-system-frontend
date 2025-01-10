import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const BACKEND_URL = process.env.BACKEND_URL;

  const handleRegister = async () => {
    try {
      const payload = { name, email, password, phone };
      const response = await axios.post(
        `${BACKEND_URL}/api/user/register`,
        payload,
      );
      if (response.data.message) {
        alert(response.data.message);
        navigate("/login");
      } else {
        alert("Registration failed.");
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      if (error?.response?.data?.message) {
        let error_message = error.response.data?.errors?.length
          ? (error.response.data.message as any) +
            ": " +
            error.response.data.errors.join(",")
          : error.response.data.message;
        alert(error_message);
        if (error_message == "user exist, please login") {
          navigate("/login");
        }
      } else {
        alert("An error occurred. Please try again");
      }
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Register</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
            <Button
              fullWidth
              style={{ background: "black", color: "white" }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                navigate("/");
              }}
            >
              Go To HomePage
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
