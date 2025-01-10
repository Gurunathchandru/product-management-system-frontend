import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import {
  Link,
  redirect,
  useNavigate,
  RedirectFunction,
} from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const BACKEND_URL = process.env.BACKEND_URL;

  const handleLogin = async () => {
    try {
      const payload = { email, password };
      const response = await axios.post(
        `${BACKEND_URL}/api/user/login`,
        payload,
      );
      if (response.data.message) {
        alert(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/product");
      } else {
        alert("Login failed.");
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      if (error?.response?.data?.message) {
        alert(error.response.data.message as any);
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
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
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

export default Login;
