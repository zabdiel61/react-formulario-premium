import React, { useState } from 'react';
import { request, setAuthHeader } from '../helpers/axios_helper';
import SignInSide from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthContent from './AuthContent';

function AppContent() {
  const [componentToShow, setComponentToShow] = useState('login');
  const [numDoc, setNumDoc] = useState(null);

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
        setNumDoc(response.data.numDoc);
        setComponentToShow('messages');
      })
      .catch((error) => {
        setAuthHeader(null);
        setComponentToShow('welcome');
      });
  };

  const onRegister = (
    event,
    tipo,
    nombre,
    nombreComercial,
    direccion,
    municipio,
    numDoc,
    telefono,
    email,
    tipoDocumento,
    tipoFactura,
    activoEconomico,
    ncr,
    jdeNum
  ) => {
    event.preventDefault();
    request('POST', '/register', {
      tipo: tipo,
      nombre: nombre,
      nombreComercial: nombreComercial,
      direccion: direccion,
      municipio: municipio,
      numDoc: numDoc,
      telefono: telefono,
      email: email,
      tipoDocumento: tipoDocumento,
      tipoFactura: tipoFactura,
      activoEconomico: activoEconomico,
      ncr: ncr,
      jdeNum: jdeNum,
    })
      .then((response) => {
        setAuthHeader(response.data.token);
        setNumDoc(response.data.numDoc);
        setComponentToShow('messages');
      })
      .catch((error) => {
        setAuthHeader(null);
        setComponentToShow('welcome');
      });
  };

  return (
    <>
      {componentToShow === 'login' && (
        <SignInSide onLogin={onLogin} showRegisterForm={showRegisterForm} />
      )}
      {componentToShow === 'register' && (
        <RegisterForm onRegister={onRegister} />
      )}
      {componentToShow === 'messages' && <AuthContent numDoc={numDoc} />}
    </>
  );
}

export default AppContent;
