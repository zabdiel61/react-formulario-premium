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
  const [userExitsRegister, setUserExitsRegister] = useState('');
  const [componentToShow, setComponentToShow] = useState('login');
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

  const onLogin = (formData) => {
    request('POST', '/login', {
      numDoc: formData.numDoc,
    })
      .then((response) => {
        setAuthHeader(response.data.token);
        setIdCliente(response.data.id);
        setComponentToShow('messages');
      })
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
    const municipioData = {
      id: formData.municipio.value,
    };

    const tipoDocumentoData = {
      id: formData.tipoDocumento.value,
    };

    let actividadEconomicaData = null;
    if (formData.actividadEconomica) {
      actividadEconomicaData = {
        id: formData.actividadEconomica.value,
      };
    }

    request('POST', '/register', {
      tipo: formData.tipo,
      estado: formData.estado,
      nombre: formData.nombre,
      nombreComercial: formData.nombreComercial,
      direccion: formData.direccion,
      municipio: municipioData,
      numDoc: formData.numDoc,
      telefono: formData.telefono,
      email: formData.email,
      tipoDocumento: tipoDocumentoData,
      tipoFactura: formData.tipoFactura,
      actividadEconomica: actividadEconomicaData,
      ncr: formData.ncr,
      jdeNum: formData.jdeNum,
    })
      .then((response) => {
        setAuthHeader(response.data.token);
        setIdCliente(response.data.id);
        setComponentToShow('messages');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setAuthHeader(null);
        } else if (
          error.response.data.message === 'Numero de documento existente'
        ) {
          setUserExitsRegister('Numero de Documento existente');
        } else {
          setAuthHeader(null);
          setComponentToShow('login');
        }
      });
  };

  return (
    <>
      {componentToShow === 'register' && <HeaderRegister onBack={login} />}
      {componentToShow === 'login' && (
        <SignInSide onLogin={onLogin} showRegisterForm={showRegisterForm} />
      )}
      {componentToShow === 'register' && (
        <RegisterForm
          onRegister={onRegister}
          showRegisterForm={showRegisterForm}
          userExitsRegister={userExitsRegister}
        />
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
