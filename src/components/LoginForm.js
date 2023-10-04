import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, Link } from '@mui/material';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Premium
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function SignInSide({ onLogin, showRegisterForm }) {
  const [formData, setFormData] = useState({
    tipoDocumento: '',
    numDoc: '',
  });

  const handleChange = (event, value) => {
    setFormData({
      ...formData,
      tipoDocumento: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(formData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Session
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={['DUI', 'NIT']}
                value={formData.tipoDocumento}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField {...params} label="Tipo Documento" />
                )}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="numDoc"
                label="Numero de Documento"
                type="text"
                id="numDoc"
                autoComplete=""
                value={formData.numDoc}
                onChange={(e) =>
                  setFormData({ ...formData, numDoc: e.target.value })
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesion
              </Button>

              <Grid container>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      showRegisterForm();
                    }}
                  >
                    {'No está registrado? Regístrese'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;
