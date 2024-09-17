import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RedeemIcon from '@mui/icons-material/Redeem';
import ArticleIcon from '@mui/icons-material/Article';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const AdminIntro = () => {
  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Admin Dashboard
        </Typography>
        <Typography variant="body1" paragraph>
          This dashboard provides tools to manage various aspects of the system. Here's a quick overview of the available sections:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" secondary="Overview of key metrics and statistics" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" secondary="Manage employee information and accounts" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <RedeemIcon />
            </ListItemIcon>
            <ListItemText primary="Coin Redeem History" secondary="View and manage coin redemption records" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Blogs" secondary="Review and accept blog posts" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Roles" secondary="Manage admin user roles and permissions" />
          </ListItem>
        </List>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Use the sidebar navigation to access these different sections. If you need any assistance, please contact the system administrator.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AdminIntro;