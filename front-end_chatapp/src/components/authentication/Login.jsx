// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container, Grid, Paper, InputAdornment, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from "./api.js"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { setUser } from '../store/slices/authSlice.js';
import { useDispatch } from 'react-redux';

const theme = createTheme();

const Login = () => {

  const navigate = useNavigate()
  const dispatch= useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {
      email,
      password,
    }
    const response = await loginUser(data)
    dispatch(setUser(response?.data?.user))
    localStorage.setItem("authUser", JSON.stringify(response?.data?.user))
    console.log('Login with:', { email, password }, response);
    navigate("/dashboard")
  };


  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <Paper elevation={6} style={{ padding: '2rem', marginTop: '10rem' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
              LMS Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                // required
                fullWidth
                id="email"
                label="Enter Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Enter Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={(event) => event.preventDefault()} // Prevents focus loss
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs mb={1} mt={1}>
                  <Link href="#" style={{ textDecoration: 'none', color: theme.palette.primary.main, }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={"/register"} style={{ textDecoration: 'none', color: theme.palette.primary.main, }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
