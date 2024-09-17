import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  DialogTitle,
  CircularProgress
} from '@mui/material';
import { Delete } from '@mui/icons-material';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ employeeName: '', userName: '' });
  const [isLoading, setIsLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:80/api/empolyee');
      const filteredEmployees = response.data.map(employee => ({
        userName: employee.userName,
        employeeName: employee.employeeName,
      })); 

      console.log(filteredEmployees);
      setEmployees(filteredEmployees);
    } catch (error) {
      console.error('There was an error fetching the employees!', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewEmployee({ employeeName: '', userName: '' });
  };

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = () => {
    setIsLoading(true);
    const data = {
      userName: newEmployee.userName,
      employeeName: newEmployee.employeeName
    }

    const response = axios.post('http://localhost:80/api/addempolyee', data, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
        fetchEmployees(); 
        handleClose();
      })
      .catch(error => {
        console.error('There was an error adding the employee!', error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    if(response.status === 200 ){
      console.log('Employee added successfully!');
      handleClose();
    }else{
      console.error('There was an error adding the employee!');
    }

  };


  const handleSendResetPassword = async (email) => {
    const data = {
      email: email
    }
    const response = await axios.post('http://localhost:80/api/resetPassword', data,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if(response.status === 200){
      console.log('OTP sent successfully!');
    }else{
      console.error('There was an error sending the OTP!');
    }

  };

  const handleDelete = async (email) => {
    const data = {
      email: email
    }
    const response = await axios.post('http://localhost:80/api/deleteempolyee', data,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if(response.status === 200){
      console.log('Employee deleted successfully!');
      fetchEmployees();
    }else{
      console.error('There was an error deleting the employee!');
    }
  }

  return (
    <div style={{display:'flex', flexDirection: 'column', justifyContent:'start'}}>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '20px', maxWidth:'250px' }}>
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
                <TableCell sx={{display:'flex', gap:'10px', alignItems:'center'}}>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleSendResetPassword(employee.userName)}
                  >
                    Send a OTP
                  </Button>
                  <Delete 
                    onClick={() => handleDelete(employee.userName)} 
                    sx={{cursor:'pointer'}}
                  />
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
          <Button onClick={handleClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleAddEmployee} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Employees;