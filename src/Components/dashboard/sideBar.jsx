import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, People, History } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItem >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem >
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Employee" />
        </ListItem>
        <ListItem >
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText primary="Coin Redeem History" />
        </ListItem>
        {/* Add more ListItem components as needed */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
