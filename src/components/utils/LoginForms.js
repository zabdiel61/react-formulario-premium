import * as React from 'react';
import classNames from 'classnames';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'login',
      tipo: 'CLI',
      nombre: '',
      nombreComercial: '',
      direccion: '',
      municipio: null,
      activoEconomico: null,
      tipoDocumento: null,
      numDoc: '',
      telefono: '',
      email: '',
      tipoFactura: 'FAC',
      estado: 'ACT',
      ncr: '',
      jdeNum: null,
      onLogin: props.onLogin,
      onRegister: props.onRegister,
      showFields: false,
    };
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === 'tipoFactura') {
      this.setState({ tipoFactura: value, showFields: value === 'CRF' });
    } else {
      this.setState({ [name]: value });
    }
  };

  onSubmitLogin = (e) => {
    this.state.onLogin(e, this.state.numDoc);
  };

  onSubmitRegister = (e) => {
    this.state.onRegister(
      e,
      this.state.tipo,
      this.state.nombre,
      this.state.nombreComercial,
      this.state.direccion,
      this.state.municipio,
      this.state.numDoc,
      this.state.telefono,
      this.state.email,
      this.state.tipoDocumento,
      this.state.tipoFactura,
      this.state.activoEconomico,
      this.state.ncr,
      this.state.jdeNum
    );
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-4">
          <ul
            className="nav nav-pills nav-justified mb-3"
            id="ex1"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className={classNames(
                  'nav-link',
                  this.state.active === 'login' ? 'active' : ''
                )}
                id="tab-login"
                onClick={() => this.setState({ active: 'login' })}
              >
                Ingresa
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={classNames(
                  'nav-link',
                  this.state.active === 'register' ? 'active' : ''
                )}
                id="tab-register"
                onClick={() => this.setState({ active: 'register' })}
              >
                Registrate
              </button>
            </li>
          </ul>

          <div className="tab-content">
            <div
              className={classNames(
                'tab-pane',
                'fade',
                this.state.active === 'login' ? 'show active' : ''
              )}
              id="pills-login"
            >
              <form onSubmit={this.onSubmitLogin}>
                <div className="form-outline mb-4">
                  <select
                    id="tipoDocumento"
                    name="tipoDocumento"
                    className="form-select"
                    onChange={this.onChangeHandler}
                  >
                    <option value="" disabled selected>
                      Tipo de Documento
                    </option>
                    <option value="1">DUI</option>
                    <option value="2">NIT</option>
                  </select>
                  <label className="form-label" htmlFor="selectOption">
                    Selecciona una opción
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="numDoc"
                    name="numDoc"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <label className="form-label" htmlFor="numDoc">
                    Numero de Documento
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Ingresar
                </button>
              </form>
            </div>
            <div
              className={classNames(
                'tab-pane',
                'fade',
                this.state.active === 'register' ? 'show active' : ''
              )}
              id="pills-register"
            >
              <form onSubmit={this.onSubmitRegister}>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <label className="form-label" htmlFor="nombre">
                    Nombre
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="nombreComercial"
                    name="nombreComercial"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <label className="form-label" htmlFor="nombreComercial">
                    Nombre Comercial
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <label className="form-label" htmlFor="direccion">
                    Direccion
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <select
                    id="municipio"
                    name="municipio"
                    className="form-select"
                    onChange={this.onChangeHandler}
                  >
                    <option value="" disabled selected>
                      Municipio
                    </option>
                    <option value="1">AHUACHAPÁN</option>
                    <option value="1">SANTA ANA</option>
                    <option value="1">SONSONATE</option>
                    <option value="1">USULUTÁN</option>
                    <option value="1">LA LIBERTAD</option>
                    <option value="1">CHALATENANGO</option>
                    <option value="1">CUSCATLÁN</option>
                    <option value="1">SAN VICENTE</option>
                    <option value="1">LA PAZ</option>
                    <option value="1">CABANAS</option>
                    <option value="1">SAN MIGUEL</option>
                    <option value="1">MORAZÁN</option>
                    <option value="1">LA UNIÓN</option>
                    <option value="1">CABAÑAS</option>
                  </select>
                  <label className="form-label" htmlFor="selectOption">
                    Selecciona una opción
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <select
                    id="tipoDocumento"
                    name="tipoDocumento"
                    className="form-select"
                    onChange={this.onChangeHandler}
                  >
                    <option value="" disabled selected>
                      Tipo de Documento
                    </option>
                    <option value="1">DUI</option>
                    <option value="2">NIT</option>
                  </select>
                  <label className="form-label" htmlFor="selectOption">
                    Selecciona una opción
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="numDoc"
                    name="numDoc"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <label className="form-label" htmlFor="numDoc">
                    Numero de Documento
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <label className="form-label" htmlFor="telefono">
                    Telefono
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="number"
                    id="jdeNum"
                    name="jdeNum"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <label className="form-label" htmlFor="jdeNum">
                    Numero JDE
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label mb-2">
                    ¿Qué tipo de documento desea?
                  </label>
                  <div>
                    <input
                      type="radio"
                      id="factura"
                      name="tipoFactura"
                      value="FAC"
                      checked={this.state.tipoFactura === 'FAC'}
                      onChange={this.onChangeHandler}
                    />
                    <label className="form-check-label" htmlFor="factura">
                      Factura
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="creditoFiscal"
                      name="tipoFactura"
                      value="CRF"
                      checked={this.state.tipoFactura === 'CRF'}
                      onChange={this.onChangeHandler}
                    />
                    <label className="form-check-label" htmlFor="creditoFiscal">
                      Credito Fiscal
                    </label>
                  </div>
                </div>

                {this.state.showFields && (
                  <>
                    {/* Campo activoEconomico */}
                    <div className="form-outline mb-4">
                      <select
                        id="activoEconomico"
                        name="activoEconomico"
                        className="form-select"
                        onChange={this.onChangeHandler}
                      >
                        <option value="" disabled selected>
                          Selecciona el Activo Económico
                        </option>
                        <option value="1">Activo Económico 1</option>
                        <option value="1">Activo Económico 2</option>
                        {/* Agrega más opciones según sea necesario */}
                      </select>
                      <label className="form-label" htmlFor="activoEconomico">
                        Activo Económico
                      </label>
                    </div>

                    {/* Campo ncr */}
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="ncr"
                        name="ncr"
                        className="form-control"
                        onChange={this.onChangeHandler}
                      />
                      <label className="form-label" htmlFor="ncr">
                        NCR
                      </label>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-3"
                >
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
