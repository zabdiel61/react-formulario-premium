import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { request } from '../helpers/axios_helper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const defaultTheme = createTheme();

const formatDuiDocumentNumber = (value) => {
  const formattedValue = value.replace(/\D/g, '');
  if (formattedValue.length <= 8) {
    return formattedValue;
  }
  return `${formattedValue.slice(0, 8)}-${formattedValue.slice(8, 9)}`;
};

const isDuiValid = (value) => {
  // Verificar que el valor tenga el formato correcto "06245003-3"
  const regex = /^\d{8}-\d{1}$/;
  return regex.test(value);
};

const formatNitDocumentoNumber = (value) => {
  // Eliminar caracteres no numéricos y guiones existentes
  const formattedValue = value.replace(/[^\d]/g, '');

  // Aplicar el formato deseado sin exceder la longitud máxima
  let result = '';
  for (let i = 0; i < formattedValue.length; i++) {
    if ((i === 4 || i === 10 || i === 13) && i < 14) {
      result += '-';
    }
    if (i < 14) {
      result += formattedValue[i];
    }
  }

  return result;
};

const isNitValid = (value) => {
  console.log(`value: ${value}`);
  // Asegurarse de que 'value' sea una cadena
  if (typeof value !== 'string') {
    return false;
  }

  // Eliminar caracteres no numéricos
  const formattedValue = value.replace(/[^\d]/g, '');

  // Verificar que el valor tenga la longitud correcta (14 caracteres)
  if (formattedValue.length !== 14) {
    return false;
  }

  // Verificar que cada parte tenga el formato correcto
  const regexPart1 = /^\d{4}$/;
  const regexPart2 = /^\d{6}$/;
  const regexPart3 = /^\d{3}$/;
  const regexPart4 = /^\d{1}$/;

  if (
    regexPart1.test(formattedValue.slice(0, 4)) &&
    regexPart2.test(formattedValue.slice(4, 10)) &&
    regexPart3.test(formattedValue.slice(10, 13)) &&
    regexPart4.test(formattedValue.slice(13, 14))
  ) {
    return true;
  }

  return false;
};

const formatPassportDocumentNumber = (value) => {
  let formattedValue = value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
  // Agregar "A" al principio si hay al menos un dígito
  if (formattedValue.length > 0) {
    formattedValue = `A${formattedValue}`;
  }
  // Limitar a 8 dígitos numéricos después de "A"
  if (formattedValue.length > 1) {
    formattedValue = `A${formattedValue.slice(1, 9)}`;
  }
  return formattedValue;
};

const isPassportValid = (value) => {
  // Verificar que el valor comience con "A" seguido de 8 dígitos
  const regex = /^A\d{8}$/;
  return regex.test(value);
};

function RegisterForm({ onRegister, showRegisterForm, userExitsRegister }) {
  const [alertOpen, setalertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [helperMessage, setHelperMessage] = useState('');
  const [severityAlert, setSeverityAlert] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [docValidationFunction, setDocValidationFunction] =
    useState(isDuiValid);

  const [formData, setFormData] = useState({
    tipo: 'CLI',
    estado: 'ACT',
    nombre: '',
    nombreComercial: '',
    direccion: '',
    numDoc: '',
    telefono: '',
    email: '',
    tipoFactura: 'FAC',
    ncr: '',
    jdeNum: '',
    showFields: false,
  });
  const [numDocError, setNumDocError] = useState(false);

  const [departamento, setDepartamento] = useState([]);
  const [selectedDepartamentoId, setSelectedDepartamentoId] = useState(
    departamento.length > 0 ? departamento[0].id : 1
  );
  const [departamentoError, setDepartamentoError] = useState(false);
  const [municipio, setMunicipio] = useState([null]);
  const [municipioError, setMunicipioError] = useState(false);

  const [tipoDocumento, setTipoDocumento] = useState([null]);
  const [tipoDocumentoError, setTipoDocumentoError] = useState(false);

  const [actividadEconomica, setActividadEconomica] = useState([null]);
  const [actividadEconomicaError, setActividadEconomicaError] = useState(false);

  useEffect(() => {
    if (selectedDepartamentoId !== null) {
      getMunicipios();
    }
    getDepartamento();
    getTpDocumentos();
    getActividadEconomica();
  }, [selectedDepartamentoId]);

  const getDepartamento = () => {
    request('GET', `/getDepartamentos`, null)
      .then((response) => {
        setDepartamento(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMunicipios = () => {
    if (selectedDepartamentoId !== null) {
      const departamentoId = selectedDepartamentoId.toString();
      request('GET', `/getMunicipioByDepartamento/${departamentoId}`, null)
        .then((response) => {
          setMunicipio(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getTpDocumentos = () => {
    request('GET', `/getTpDocumentos`, null)
      .then((response) => {
        setTipoDocumento(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getActividadEconomica = () => {
    request('GET', `/getActividadesEconomicas`, null)
      .then((response) => {
        setActividadEconomica(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
      showFields: name === 'tipoFactura' && value === 'CRF',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.municipio === null || formData.municipio === undefined) {
      setMunicipioError(true);
      setSeverityAlert('warning');
      setAlertMessage('Datos de formulario invalidos');
      setalertOpen(true);
      return;
    }

    if (
      formData.tipoDocumento === null ||
      formData.tipoDocumento === undefined
    ) {
      setMunicipioError(false);
      setTipoDocumentoError(true);
      setSeverityAlert('warning');
      setAlertMessage('Datos de formulario invalidos');
      setalertOpen(true);
      return;
    }

    console.log(`en el boton: ${formData.tipoDocumento.label}`);
    if (formData.tipoDocumento.label === 'DUI') {
      console.log('DUI o nada');
      setDocValidationFunction(isDuiValid(formData.numDoc));
    } else if (formData.tipoDocumento.label === 'Otro') {
      console.log('Otro');
      setDocValidationFunction(isNitValid(formData.numDoc));
    }

    console.log('aqui');

    if (
      formData.nombre.trim() === '' ||
      formData.nombreComercial.trim() === '' ||
      departamentoError === true ||
      formData.numDoc.trim() === '' ||
      formData.telefono.trim() === '' ||
      formData.email.trim() === '' ||
      formData.jdeNum.trim() === ''
    ) {
      setSeverityAlert('warning');
      setAlertMessage('Datos de formulario invalidos');
      setalertOpen(true);
      setTipoDocumentoError(false);
      setNumDocError(true);
      setHelperMessage('Ingrese su numero de Documento');
      return;
    } else if (!docValidationFunction) {
      setNumDocError(true);
      setHelperMessage('Formato de Documento invalido');
      setSeverityAlert('error');
      setAlertMessage('DOCUMENTO NO VALIDO, REVISE TIPO DE DOCUMENTO');
      setalertOpen(true);
      return;
    }

    if (
      (formData.actividadEconomica === null ||
        formData.actividadEconomica === undefined) &&
      formData.showFields === true
    ) {
      setActividadEconomicaError(true);
      setTipoDocumentoError(false);
      setalertOpen(true);
      return;
    }

    if (formData.ncr === '' && formData.showFields === true) {
      setalertOpen(true);
      return;
    }

    if (userExitsRegister !== '') {
      console.log(userExitsRegister);
      setNumDocError(true);
      setHelperMessage('Numero de documento existente');
      setSeverityAlert('error');
      setAlertMessage('Numero de documento existente');
      setalertOpen(true);
      return;
    }

    onRegister(formData);
  };

  return (
    <>
      {isLoading ? (
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
            <Stack
              spacing={1}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rounded" width={210} height={100} />
            </Stack>
          </Box>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={defaultTheme}>
          <Grid xs={12}>
            <Box
              sx={{
                my: 1,
                mx: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'red' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Registrese
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2} sx={{ width: 1000 }}>
                  <Grid xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="nombre"
                      label="Nombre"
                      type="text"
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      error={formData.nombre.trim() === ''}
                      helperText={
                        formData.nombre.trim() === '' ? 'Ingrese un nombre' : ''
                      }
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      name="nombreComercial"
                      label="Nombre Comercial"
                      type="text"
                      id="nombreComercial"
                      value={formData.nombreComercial}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nombreComercial: e.target.value,
                        })
                      }
                      error={formData.nombreComercial.trim() === ''}
                      helperText={
                        formData.nombreComercial.trim() === ''
                          ? 'Ingrese un nombre Comercial'
                          : ''
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid xs={4}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={departamento}
                      getOptionLabel={(option) => option.nombre}
                      value={
                        departamento.find(
                          (option) => option.id === selectedDepartamentoId
                        ) || null
                      }
                      onChange={(event, newValue) => {
                        if (newValue === null) {
                          setDepartamentoError(true);
                        } else {
                          setDepartamentoError(false);
                        }
                        setSelectedDepartamentoId(
                          newValue !== null ? newValue.id : null
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Departamento"
                          error={departamentoError}
                          helperText={
                            departamentoError
                              ? 'Seleccione un departamento'
                              : ''
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={4}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={municipio.map((option) => ({
                        label: option.nombre,
                        value: option.id,
                      }))}
                      getOptionValue={(option) => option.value}
                      value={formData.municipio}
                      onChange={(event, newValue) => {
                        setFormData({ ...formData, municipio: newValue });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Municipio"
                          error={municipioError}
                          helperText={
                            municipioError ? 'Seleccione un municipio' : ''
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={4}>
                    <TextField
                      fullWidth
                      name="direccion"
                      label="Dirección"
                      type="text"
                      id="direccion"
                      value={formData.direccion}
                      onChange={(e) =>
                        setFormData({ ...formData, direccion: e.target.value })
                      }
                      error={formData.direccion.trim() === ''}
                      helperText={
                        formData.direccion.trim() === ''
                          ? 'Ingrese su direccion'
                          : ''
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={tipoDocumento.map((option) => ({
                        label: option.nombre,
                        value: option.id,
                      }))}
                      getOptionValue={(option) => option.value}
                      value={formData.tipoDocumento}
                      onChange={(event, newValue) => {
                        formData.numDoc = '';
                        setFormData({ ...formData, tipoDocumento: newValue });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tipo Documento"
                          error={tipoDocumentoError}
                          helperText={
                            tipoDocumentoError
                              ? 'Seleccione un Tipo de Documento'
                              : ''
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={6}>
                    <TextField
                      fullWidth
                      name="numDoc"
                      label="Número de Documento"
                      type="text"
                      id="numDoc"
                      value={formData.numDoc}
                      onChange={(e) => {
                        if (formData.tipoDocumento === undefined) {
                          setFormData({
                            ...formData,
                            numDoc: formatDuiDocumentNumber(e.target.value),
                          });
                        } else if (
                          formData.tipoDocumento.label === 'DUI' ||
                          formData.tipoDocumento.label === ''
                        ) {
                          setFormData({
                            ...formData,
                            numDoc: formatDuiDocumentNumber(e.target.value),
                          });
                        } else if (formData.tipoDocumento.label === 'Otro') {
                          console.log('Otro');
                          setFormData({
                            ...formData,
                            numDoc: formatNitDocumentoNumber(e.target.value),
                          });
                        } else if (
                          formData.tipoDocumento.label === 'Pasaporte'
                        ) {
                          console.log('Otro');
                          setFormData({
                            ...formData,
                            numDoc: formatPassportDocumentNumber(
                              e.target.value
                            ),
                          });
                        }
                      }}
                      error={numDocError}
                      helperText={numDocError ? helperMessage : ''}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid xs={4}>
                    <TextField
                      fullWidth
                      name="telefono"
                      label="Teléfono"
                      type="text"
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) =>
                        setFormData({ ...formData, telefono: e.target.value })
                      }
                      error={formData.telefono.trim() === ''}
                      helperText={
                        formData.telefono.trim() === ''
                          ? 'Ingrese su telefono'
                          : ''
                      }
                    />
                  </Grid>
                  <Grid xs={8}>
                    {' '}
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      error={formData.email.trim() === ''}
                      helperText={
                        formData.email.trim() === ''
                          ? 'Ingrese su correo electronico'
                          : ''
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
                      value={formData.jdeNum}
                      onChange={(e) =>
                        setFormData({ ...formData, jdeNum: e.target.value })
                      }
                      error={formData.jdeNum.trim() === ''}
                      helperText={
                        formData.jdeNum.trim() === ''
                          ? 'Ingrese su numero de JDE'
                          : ''
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
                        value={formData.tipoFactura}
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
                        disablePortal
                        id="combo-box-demo"
                        options={actividadEconomica.map((option) => ({
                          label: option.descripcion,
                          value: option.id,
                        }))}
                        getOptionValue={(option) => option.value}
                        value={formData.actividadEconomica}
                        onChange={(event, newValue) => {
                          setFormData({
                            ...formData,
                            actividadEconomica: newValue,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Actividad"
                            error={actividadEconomicaError}
                            helperText={
                              actividadEconomicaError
                                ? 'Seleccione una actividad Economica'
                                : ''
                            }
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
                        value={formData.ncr}
                        onChange={(e) =>
                          setFormData({ ...formData, ncr: e.target.value })
                        }
                        error={formData.ncr.trim() === ''}
                        helperText={
                          formData.ncr.trim() === '' ? 'Ingrese su NCR' : ''
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
                  Registrarse
                </Button>
              </Box>
            </Box>
          </Grid>
          {alertOpen && (
            <Snackbar
              open={alertOpen}
              autoHideDuration={6000}
              onClose={() => setalertOpen(false)}
            >
              <MuiAlert
                onClose={() => setalertOpen(false)}
                severity={severityAlert}
                sx={{ width: '100%' }}
              >
                {alertMessage}
              </MuiAlert>
            </Snackbar>
          )}
        </ThemeProvider>
      )}
    </>
  );
}

export default RegisterForm;
