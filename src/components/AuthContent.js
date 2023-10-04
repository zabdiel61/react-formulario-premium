import React, { useState, useEffect } from 'react';
import { request, setAuthHeader } from '../helpers/axios_helper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function AuthContent(props) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    request('POST', '/login', {
      numDoc: props.numDoc,
    })
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

  return (
    <div className="row justify-content-md-center">
      <div className="col-4">
        <div className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Informacion del Cliente</h5>

            {isLoading ? (
              <p>Cargando datos...</p>
            ) : (
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
            )}
          </div>
        </div>
      </div>
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
    </div>
  );
}

export default AuthContent;
