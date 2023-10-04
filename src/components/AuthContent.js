import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { request, setAuthHeader } from '../helpers/axios_helper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

const defaultTheme = createTheme();

function AuthContent(props) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      showFields: name === 'tipoFactura' && value === 'CRF',
    });
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    request('GET', `/cliente/${props.idCliente}`, null)
      .then((response) => {
        setData(response.data);
        setAlertSeverity('success');
        setAlertMessage('Se cargo la informacion correctamente');
        setAlertOpen(true);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setAuthHeader(null);
        } else {
          setAlertSeverity('error');
          setAlertMessage('Ha ocurrido un error. Intente de nuevo.');
          setAlertOpen(true);
          setData(error.response.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.numDoc]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // onRegister(formData);
  };

  return (
    <>
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : (
        <ThemeProvider theme={defaultTheme}>
          <Box
            sx={{
              my: 4,
              mx: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {`Bienvenido ${data.nombre}`}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid xs={4}>
                  {' '}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="nombre"
                    label="Nombre"
                    type="text"
                    id="nombre"
                    value={data.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                  />
                </Grid>
                <Grid xs={4}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="nombreComercial"
                    label="Nombre Comercial"
                    type="text"
                    id="nombreComercial"
                    value={data.nombreComercial}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nombreComercial: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid xs={4}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="direccion"
                    label="Dirección"
                    type="text"
                    id="direccion"
                    value={data.direccion}
                    onChange={(e) =>
                      setFormData({ ...formData, direccion: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[
                      { label: 'AHUACHAPÁN', value: '1' },
                      { label: 'SANTA ANA', value: '2' },
                      { label: 'SONSONATE', value: '3' },
                      { label: 'USULUTÁN', value: '4' },
                      { label: 'LA LIBERTAD', value: '5' },
                      { label: 'CHALATENANGO', value: '6' },
                      { label: 'CUSCATLÁN', value: '7' },
                      { label: 'SAN VICENTE', value: '8' },
                      { label: 'LA PAZ', value: '9' },
                      { label: 'CABANAS', value: '10' },
                      { label: 'SAN MIGUEL', value: '11' },
                      { label: 'MORAZÁN', value: '12' },
                      { label: 'LA UNIÓN', value: '13' },
                      { label: 'CABAÑAS', value: '14' },
                      // Agrega más opciones según sea necesario
                    ]}
                    getOptionValue={(option) => option.value}
                    value={data.municipio}
                    onChange={(event, newValue) => {
                      setFormData({ ...formData, municipio: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Municipio" />
                    )}
                  />
                </Grid>
                <Grid xs={4}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[
                      { label: 'DUI', value: '1' },
                      { label: 'NIT', value: '2' },
                      // Agrega más opciones según sea necesario
                    ]}
                    getOptionValue={(option) => option.value}
                    value={data.tipoDocumento}
                    onChange={(event, newValue) => {
                      setFormData({ ...formData, tipoDocumento: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Tipo Documento" />
                    )}
                  />
                </Grid>
                <Grid xs={4}>
                  <TextField
                    fullWidth
                    name="numDoc"
                    label="Número de Documento"
                    type="text"
                    id="numDoc"
                    value={data.numDoc}
                    onChange={(e) =>
                      setFormData({ ...formData, numDoc: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="telefono"
                    label="Teléfono"
                    type="text"
                    id="telefono"
                    value={data.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                  />
                </Grid>
                <Grid xs={8}>
                  {' '}
                  <TextField
                    margin="normal"
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <TextField
                    fullWidth
                    name="jdeNum"
                    label="Número JDE"
                    type="number"
                    id="jdeNum"
                    value={data.jdeNum}
                    onChange={(e) =>
                      setFormData({ ...formData, jdeNum: e.target.value })
                    }
                  />
                </Grid>
                <Grid xs={8}>
                  <InputLabel htmlFor="tipoFactura">
                    ¿Qué tipo de documento desea?
                  </InputLabel>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="tipoFactura"
                      name="tipoFactura"
                      value={data.tipoFactura}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="FAC"
                        control={<Radio />}
                        label="Factura"
                      />
                      <FormControlLabel
                        value="CRF"
                        control={<Radio />}
                        label="Crédito Fiscal"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              {formData.showFields && (
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <Autocomplete
                      id="activoEconomico"
                      options={[
                        { label: 'Activo Económico 1', value: '1' },
                        { label: 'Activo Económico 2', value: '1' },
                        // Agrega más opciones según sea necesario
                      ]}
                      getOptionValue={(option) => option.value}
                      value={data.activoEconomico}
                      onChange={(event, newValue) => {
                        setFormData({ ...formData, activoEconomico: newValue });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Activo Económico"
                          InputLabelProps={{ shrink: false }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={6}>
                    <TextField
                      fullWidth
                      id="ncr"
                      name="ncr"
                      label="NCR"
                      type="text"
                      value={data.ncr}
                      onChange={(e) =>
                        setFormData({ ...formData, ncr: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Actualizar Informacion
              </Button>
            </Box>
          </Box>
        </ThemeProvider>
      )}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <MuiAlert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default AuthContent;
