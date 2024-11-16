// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from './api';

const theme = createTheme();

const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [fullname, setfullname] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let data= {
                email:email,
                password:password,
                mobileNo:mobileNo,
                fullname:fullname,
            }
            let response = await registerUser(data)
            console.log(response)
            navigate("/dashboard")
        } catch (error) {
            console.log("error while user registering", error)
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" >
                <Paper elevation={6} style={{ padding: '2rem', marginTop: '7rem' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography component="h1" variant="h5">
                            Register here
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullname"
                                label="Enter Fullname"
                                name="fullname"
                                // autoComplete="fu"
                                autoFocus
                                value={fullname}
                                onChange={(e) => setfullname(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
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
                                required
                                fullWidth
                                name="mobile number"
                                label="mobile number"
                                type="text"
                                id="mobile"
                                autoComplete="mobile-number"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Enter Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                               
                                <Grid item="true">
                                    <Link href="#" style={{ textDecoration: 'none', color: theme.palette.primary.main, }}>
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

export default Register;
