import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

const defaultTheme = createTheme();
function RegisterForm({ onRegister }) {
  const [formData, setFormData] = useState({
    tipo: 'CLI',
    nombre: '',
    nombreComercial: '',
    direccion: '',
    municipio: '',
    activoEconomico: '',
    tipoDocumento: '',
    numDoc: '',
    telefono: '',
    email: '',
    tipoFactura: 'FAC',
    estado: 'ACT',
    ncr: '',
    jdeNum: '',
    showFields: false,
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === 'tipoFactura') {
      setFormData({ ...formData, [name]: value, showFields: value === 'CRF' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    onRegister(formData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        ></Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default RegisterForm;
