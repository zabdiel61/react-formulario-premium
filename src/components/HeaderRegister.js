import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar } from '@mui/material';

const HeaderRegister = ({ onBack }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={onBack}
        >
          <ArrowBackIcon />
        </IconButton>

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
      </Toolbar>
    </AppBar>
  );
};

export default HeaderRegister;
