import React, { useState, useContext } from "react";
import axios from "axios";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { AuthContext } from './AuthContext';
import { useHistory } from 'react-router-dom'; // Import the useHistory hook

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const history = useHistory(); // Get access to the history object

  const handleLogin = () => {
    axios.post("https://localhost:7102/api/Login/Getlogin", { email: username, password: password })
      .then((response) => {
        const login = response.data === true;
        if (login) {
          localStorage.setItem('isLoggedIn', 'true');
          setIsLoggedIn(true);
          setErrorMessage(""); // Clear any error messages when login is successful
          history.push('/'); // Redirect to the login page or another route
        } else {
          setErrorMessage("Invalid username or password."); // Set error message when login is unsuccessful
        }
      })
      .catch((error) => {
        setErrorMessage("An error occurred. Please try again later."); // Set error message when API call fails
      });
  };


  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
            type="password"
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
