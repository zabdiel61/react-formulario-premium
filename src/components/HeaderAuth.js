import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar } from '@mui/material';

const HeaderAuth = ({ onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar
          sx={{
            m: 1,
            bgcolor: 'white',
            width: '50px',
            height: '50px',
          }}
        >
          <img
            src={process.env.PUBLIC_URL + '/premium.png'}
            alt="Logo Premium"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Avatar>
        <Button color="inherit" onClick={onLogout}>
          <ExitToAppIcon />
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAuth;
