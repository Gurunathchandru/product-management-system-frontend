import React from "react";
import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 8px 16px rgba(0.2, 0.2, 0.2, 0.2)",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Product Management System
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "#444", fontSize: "1rem", marginBottom: "30px" }}
          >
            <br />
            <strong>Key Features:</strong>
            <ul style={{ marginTop: "10px", color: "#555", textAlign: "left" }}>
              <li>Login and Register System</li>
              <li>Create, Update, View, and Delete Products</li>
              <li>Search products by name</li>
              <li>Easy-to-use interface with ReactJS and Material UI</li>
            </ul>
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              sx={{
                margin: 1,
                backgroundColor: "#1976d2",
                color: "#fff",
                fontSize: "1rem",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "#155a9c",
                },
              }}
              component={Link}
              to="/login"
            >
              Login
            </Button>

            <Button
              variant="outlined"
              sx={{
                margin: 1,
                borderColor: "#1976d2",
                color: "#1976d2",
                fontSize: "1rem",
                padding: "10px 20px",
                "&:hover": {
                  borderColor: "#155a9c",
                  color: "#155a9c",
                },
              }}
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
