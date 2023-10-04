import React, { useState } from 'react';
import { request, setAuthHeader } from '../helpers/axios_helper';
import SignInSide from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthContent from './AuthContent';
import HeaderAuth from './HeaderAuth';
import HeaderRegister from './HeaderRegister';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function AppContent() {
  const [userNotFoundAlertOpen, setUserNotFoundAlertOpen] = useState(false);
  const [componentToShow, setComponentToShow] = useState('login');
  const [numDoc, setNumDoc] = useState(null);
  const [idCliente, setIdCliente] = useState(null);

  const login = () => {
    setComponentToShow('login');
  };

  const logout = () => {
    setComponentToShow('login');
    setAuthHeader(null);
  };

  const showRegisterForm = () => {
    setComponentToShow('register');
  };

  const handleAuthResponse = (response) => {
    if (response.data.token) {
      setAuthHeader(response.data.token);
      setNumDoc(response.data.numDoc);
      setIdCliente(response.data.id);
      setComponentToShow('messages');
    } else {
      setAuthHeader(null);
      setComponentToShow('login');
    }
  };

  const onLogin = (formData) => {
    request('POST', '/login', {
      numDoc: formData.numDoc,
    })
      .then(handleAuthResponse)
      .catch((error) => {
        if (error.response.status === 401) {
          setAuthHeader(null);
        } else if (
          error.response.data.message === 'Numero de Documento desconocido'
        ) {
          setUserNotFoundAlertOpen(true);
        } else {
          setAuthHeader(null);
          setComponentToShow('login');
        }
      });
  };

  const onRegister = (formData) => {
    request('POST', '/register', {
      tipo: formData.tipo,
      nombre: formData.nombre,
      nombreComercial: formData.nombreComercial,
      direccion: formData.direccion,
      municipio: formData.municipio.value,
      numDoc: formData.numDoc,
      telefono: formData.telefono,
      email: formData.email,
      tipoDocumento: formData.tipoDocumento.value,
      tipoFactura: formData.tipoFactura,
      activoEconomico: formData.activoEconomico.value,
      ncr: formData.ncr,
      jdeNum: formData.jdeNum,
    })
      .then(handleAuthResponse)
      .catch(handleAuthResponse);
  };

  return (
    <>
      {componentToShow === 'register' && <HeaderRegister onBack={login} />}
      {componentToShow === 'login' && (
        <SignInSide onLogin={onLogin} showRegisterForm={showRegisterForm} />
      )}
      {componentToShow === 'register' && (
        <RegisterForm onRegister={onRegister} />
      )}
      {componentToShow === 'messages' && <HeaderAuth onLogout={logout} />}
      {componentToShow === 'messages' && <AuthContent idCliente={idCliente} />}
      {userNotFoundAlertOpen && (
        <Snackbar
          open={userNotFoundAlertOpen}
          autoHideDuration={6000}
          onClose={() => setUserNotFoundAlertOpen(false)}
        >
          <MuiAlert
            onClose={() => setUserNotFoundAlertOpen(false)}
            severity="error"
            sx={{ width: '100%' }}
          >
            El usuario no existe.
          </MuiAlert>
        </Snackbar>
      )}
    </>
  );
}

export default AppContent;
