import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const HeaderAuth = ({ onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Logo
        </Typography>
        <Button color="inherit" onClick={onLogout}>
          <ExitToAppIcon />
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAuth;
