import React, { useState, useEffect } from 'react';
import { request, setAuthHeader } from '../helpers/axios_helper';

function AuthContent(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(props.numDoc);
    request('POST', '/login', {
      numDoc: props.numDoc,
    })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setAuthHeader(null);
        } else {
          setData(error.response.data);
        }
      });
  }, [props.numDoc]);

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
                <p className="card-text">Número de Documento: {data.numDoc}</p>
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

export default AuthContent;
