import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import { AccountCircle, Lock, Email, Person } from '@material-ui/icons';
import axios from 'axios';

const Registration = () => {
  const history = useHistory();

  const [step, setStep] = useState(1); // Track the current step
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handlebackbutton = () => {
    setStep(step - 1);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registrationData = {
        username,
        passwordHash: password,
        email,
        firstname,
        lastname,
        age,
        gender,
        phoneNumber,
        location,
      };

      await axios.post('https://localhost:7102/api/Login/Registration', registrationData);

      setIsRegistered(true);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Registration
      </Typography>
      {isRegistered ? (
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            Thank you for registering!
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            A confirmation email has been sent to your email address.
          </Typography>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <Person />,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Age"
                  fullWidth
                  variant="outlined"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Gender"
                  fullWidth
                  variant="outlined"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Location"
                  fullWidth
                  variant="outlined"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          )}
          {step === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Username"
                  fullWidth
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <AccountCircle />,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <Lock />,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  fullWidth
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <Email />,
                  }}
                />
              </Grid>
            </Grid>
          )}
          <div style={{ marginTop: '20px' }}></div>
          {step === 2 && (
            <>
              <Button type="button" variant="contained" color="primary" onClick={handlebackbutton}>
                Back
              </Button>
              <div style={{ marginTop: '20px' }}></div>
            </>
          )}
          <Button
            type={step === 2 ? 'submit' : 'button'}
            variant="contained"
            color="primary"
            onClick={handleNextStep}
            fullWidth
          >
            {step === 1 ? 'Next' : 'Sign Up'}
          </Button>
        </form>
      )}
      <Typography align="center" gutterBottom>
        Already a Member? <Link to="/login">Log In</Link>     
      </Typography>
    </Container>
  );
};

export default Registration;