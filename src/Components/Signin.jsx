import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Grid from '@mui/material/Grid';

// Import your background image
import backgroundImage from '../Images/240_F_713385971_sS6HoNWWyNShTfBupnKb14ig86oqGN6N.jpg';

// MUI theme
const theme = createTheme();

const Signin = () => {
  const navigate = useNavigate();
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Handle close Snackbar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  // form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Response from backend:", data);
        if (data.status === "success") {
          navigate("/newproject");// Redirect to new project page on successful login
        } else {
          setSnackbarMessage('Invalid email or password. Please try again.');
          setOpenSnackbar(true);
        }
      } else if (response.status === 401) {
        setSnackbarMessage('Invalid email or password. Please try again.');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setSnackbarMessage('Signin failed. Please try again.');
      setOpenSnackbar(true);
    }
  };
  //handle email change 
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  // Handle password change
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: 'cover',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CssBaseline />

        <Box sx={{ textAlign: 'center', width: '100%', marginTop: '2rem' }}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                backgroundColor: 'white',
                p: 3,
                borderRadius: 8,
                border: '2px solid #ccc',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mx: 'auto',
                maxWidth: '320px',
                width: '100%',
                margin: 'auto',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontFamily: 'Times New Roman' }}
              >
                Sign In
              </Typography>

              <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleEmail}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePassword}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ margin: '1rem 0' }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <RouterLink to="/signup" style={{ textAlign: 'center', textDecoration: 'none' }}>
                      Don't have an account? Sign Up
                    </RouterLink>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Container>
        </Box>
      </Box>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          sx={{ backgroundColor: 'red' }}
          message={snackbarMessage}
        />
      </Snackbar>
    </ThemeProvider>
  );
};

export default Signin;
