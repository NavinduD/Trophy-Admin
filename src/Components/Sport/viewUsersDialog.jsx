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
  ListItemSecondaryAction,
} from "@mui/material";

const ViewSportsUsersDialog = ({ open, onClose, users, onApprove }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Registered Users for Sport</DialogTitle>
      <DialogContent>
        <List>
          {users.map((user) => (
            <ListItem key={user._id}>
              <ListItemText primary={user.employeeName} secondary={user.username} />
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onApprove(user._id)}
                >
                  Approve
                </Button>
              </ListItemSecondaryAction>
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

export default ViewSportsUsersDialog;
