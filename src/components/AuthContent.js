import * as React from 'react';
import { request, setAuthHeader } from '../helpers/axios_helper';

export default class AuthContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null, // Inicializa como null
    };
  }

  componentDidMount() {
    request('POST', '/login', {
      numDoc: this.props.numDoc,
    })
      .then((response) => {
        console.log(response.data);
        this.setState({ data: response.data });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setAuthHeader(null);
        } else {
          this.setState({ data: error.response.data });
        }
      });
  }

  render() {
    const { data } = this.state;

    return (
      <div className="row justify-content-md-center">
        <div className="col-4">
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">Informacion del Cliente</h5>
              {data ? (
                <div>
                  <p className="card-text">ID: {data.id}</p>
                  <p className="card-text">Tipo: {data.tipo}</p>
                  <p className="card-text">Nombre: {data.nombre}</p>
                  <p className="card-text">
                    Nombre Comercial: {data.nombreComercial}
                  </p>
                  <p className="card-text">Dirección: {data.direccion}</p>
                  <p className="card-text">
                    Número de Documento: {data.numDoc}
                  </p>
                  {/* Agrega más campos según tus necesidades */}
                </div>
              ) : (
                <p>Cargando datos...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
