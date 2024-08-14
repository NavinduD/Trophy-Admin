import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

const MenuItem = ({ text, icon, open, selected, link }) => {
  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        component={RouterLink}
        to={link}
        selected={selected}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;
