import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const ViewUsersDialog = ({ open, onClose, users }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Registered Users</DialogTitle>
      <DialogContent>
        <List>
          {users.map((user) => (
            <ListItem key={user._id}>
              <ListItemText primary={user.employeeName} secondary={user.userName} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewUsersDialog;
