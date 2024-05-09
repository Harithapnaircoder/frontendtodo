import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

// Import your background image
import backgroundImage from '../Images/240_F_713384947_2VHJrosuTXjjNrxchEeW52iTesZ19JyK.jpg';

// Create MUI theme
const theme = createTheme();

const SignUp = () => {
  // State variables for form data, errors, and snackbar
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    fullname: false,
    email: false,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Handle input change in form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Remove validation error and red border when typing
    setErrors({ ...errors, [name]: false });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form validation
    const { fullname, email, password } = formData;
    if (!fullname || !email || !password) {
      console.error('All fields are mandatory');
      // Set errors for empty fields
      setErrors({
        fullname: !fullname,
        email: !email,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Signup successful!');
        setSnackbarMessage('Signup successful');
        setOpenSnackbar(true);
        // Clear form fields
        setFormData({
          fullname: '',
          email: '',
          password: '',
        });
        setTimeout(() => {
          setOpenSnackbar(false);
        }, 3000);
      } else {
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className='row'>
      <div className="col-9 col-md-9">
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
                  marginTop: '80px',
                  marginBottom: '20px',
                  maxWidth: '340px',
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
                  Sign Up
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        error={errors.fullname}
                        name="fullname"
                        label="Full Name"
                        type="text"
                        id="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        autoComplete="off"
                        sx={{
                          '& label.Mui-focused': { color: 'black' },
                          '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        error={errors.email}
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="off"
                        sx={{
                          '& label.Mui-focused': { color: 'black' },
                          '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } }
                        }}
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
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="off new-password"
                        sx={{
                          '& label.Mui-focused': { color: 'black' },
                          '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } }
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ margin: '1rem 0', backgroundColor: 'primary' }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <RouterLink to="/" variant="body2" style={{ textAlign: 'center' }}>
                        Already have an account? Sign in
                      </RouterLink>
                    </Grid>
                  </Grid>
                </form>
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
                  sx={{ backgroundColor: 'green' }}
                  message={snackbarMessage}
                />
              </Snackbar>
            </Container>
          </Box>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default SignUp;
