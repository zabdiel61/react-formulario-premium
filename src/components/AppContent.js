import * as React from 'react';

import { request, setAuthHeader } from '../helpers/axios_helper';

import Buttons from './Buttons';
import AuthContent from './AuthContent';
import WelcomeContent from './WelcomeContent';
import LoginForm from './LoginForms';

export default class AppContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentToShow: 'welcome',
    };
  }

  login = () => {
    this.setState({ componentToShow: 'login' });
  };

  logout = () => {
    this.setState({ componentToShow: 'welcome' });
    setAuthHeader(null);
  };

  onLogin = (e, numDoc) => {
    e.preventDefault();
    request('POST', '/login', {
      numDoc: numDoc,
    })
      .then((response) => {
        setAuthHeader(response.data.token);
        this.setState({ componentToShow: 'messages' });
      })
      .catch((error) => {
        setAuthHeader(null);
        this.setState({ componentToShow: 'welcome' });
      });
  };

  onRegister = (
    event,
    tipo,
    nombre,
    nombreComercial,
    direccion,
    municipio,
    numDoc
  ) => {
    event.preventDefault();
    request('POST', '/register', {
      tipo: tipo,
      nombre: nombre,
      nombreComercial: nombreComercial,
      direccion: direccion,
      municipio: municipio,
      numDoc: numDoc,
    })
      .then((response) => {
        setAuthHeader(response.data.token);
        this.setState({ componentToShow: 'messages' });
      })
      .catch((error) => {
        setAuthHeader(null);
        this.setState({ componentToShow: 'welcome' });
      });
  };

  render() {
    return (
      <>
        <Buttons login={this.login} logout={this.logout} />

        {this.state.componentToShow === 'welcome' && <WelcomeContent />}
        {this.state.componentToShow === 'login' && (
          <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />
        )}
        {this.state.componentToShow === 'messages' && <AuthContent />}
      </>
    );
  }
}
