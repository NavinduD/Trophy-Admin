import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle
} from '@mui/material';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ employeeName: '', userName: '' });

  useEffect(() => {
    // Fetch employees from your API here
    // For now, we'll use dummy data
    setEmployees([
      { id: 1, employeeName: 'John Doe', userName: 'john@example.com' },
      { id: 2, employeeName: 'Jane Smith', userName: 'jane@example.com' },
    ]);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = () => {
    // Add employee logic here
    // For now, we'll just add it to the local state
    setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }]);
    setNewEmployee({ employeeName: '', userName: '' });
    handleClose();
  };

  const handleSendResetPassword = (employeeId) => {
    // Send reset password logic here
    console.log(`Sending reset password for employee ${employeeId}`);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '20px' }}>
        Add New Employee
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Username (Email)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.employeeName}</TableCell>
                <TableCell>{employee.userName}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleSendResetPassword(employee.id)}
                  >
                    Send Reset Password
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="employeeName"
            label="Employee Name"
            type="text"
            fullWidth
            variant="standard"
            value={newEmployee.employeeName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="userName"
            label="Username (Email)"
            type="email"
            fullWidth
            variant="standard"
            value={newEmployee.userName}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddEmployee}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Employees;