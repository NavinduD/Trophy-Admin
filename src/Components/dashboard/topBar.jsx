import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const TopBar = ({ title }) => {
  return (
    <AppBar position="fixed" sx={{ display: 'flex', flexDirection: 'row', zIndex: (theme) => theme.zIndex.drawer + 1, justifyContent: 'center' }}>
      <Toolbar>
        <Typography variant="body" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
