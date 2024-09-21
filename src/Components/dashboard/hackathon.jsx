import React, { useState, useEffect } from "react";
import axios from "axios";
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
  CircularProgress,
  Box,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import imageCompression from "browser-image-compression"; // Import the compression library

const ManageHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [open, setOpen] = useState(false);
  const [newHackathon, setNewHackathon] = useState({
    hacktitle: "",
    hackdescription: "",
    hackcoinCount: "",
    hackathondetails: "",
  });
  const [hackImage, setHackImage] = useState(null);
  const [hackMainImage, setHackMainImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewHackImage, setPreviewHackImage] = useState(null);
  const [previewHackMainImage, setPreviewHackMainImage] = useState(null);

  const handleImageChange = async (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setImage(compressedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };
  
  const handleHackImageChange = (e) => {
    handleImageChange(e, setHackImage, setPreviewHackImage);
  };
  
  const handleHackMainImageChange = (e) => {
    handleImageChange(e, setHackMainImage, setPreviewHackMainImage);
  };
  

  const fetchHackathons = async () => {
    try {
      const response = await axios.get("http://localhost:80/api/Hackathons");
      setHackathons(response.data);
    } catch (error) {
      console.error("There was an error fetching the hackathons!", error);
    }
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewHackathon({
      hacktitle: "",
      hackdescription: "",
      hackcoinCount: "",
      hackathondetails: "",
    });
    setHackImage(null);
    setHackMainImage(null);
    setPreviewHackImage(null);
    setPreviewHackMainImage(null); 
  };

  const handleInputChange = (e) => {
    setNewHackathon({ ...newHackathon, [e.target.name]: e.target.value });
  };

  const handleAddHackathon = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("hacktitle", newHackathon.hacktitle);
    formData.append("hackdescription", newHackathon.hackdescription);
    formData.append("hackcoinCount", newHackathon.hackcoinCount);
    formData.append("hackathondetails", newHackathon.hackathondetails);
    formData.append("hackimage", hackImage);
    formData.append("hackmainimage", hackMainImage);

    try {
      const response = await axios.post(
        "http://localhost:80/api/addHackathon",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        fetchHackathons();
        handleClose();
      } else {
        throw new Error("Failed to add hackathon");
      }
    } catch (error) {
      console.error("There was an error adding the hackathon!", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHackathon = async (hackathonId) => {
    try {
      const response = await axios.delete(
        `http://localhost:80/api/deleteHackathon/${hackathonId}`
      );

      if (response.status === 200) {
        fetchHackathons();
      } else {
        throw new Error("Failed to delete hackathon");
      }
    } catch (error) {
      console.error("There was an error deleting the hackathon!", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{ marginBottom: "20px", maxWidth: "250px" }}
      >
        Add New Hackathon
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Coin Count</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hackathons.map((hackathon) => (
              <TableRow key={hackathon._id}>
                <TableCell>{hackathon.hacktitle}</TableCell>
                <TableCell>{hackathon.hackdescription}</TableCell>
                <TableCell>{hackathon.hackcoinCount}</TableCell>
                <TableCell>
                  {hackathon.hackathondetails.length > 100 ? (
                    <>
                      {`${hackathon.hackathondetails.substring(0, 100)}... `}
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => alert(hackathon.hackathondetails)}
                      >
                        see more
                      </span>
                    </>
                  ) : (
                    hackathon.hackathondetails
                  )}
                </TableCell>
                <TableCell>
                  <Delete
                    onClick={() => handleDeleteHackathon(hackathon._id)}
                    sx={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Hackathon</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="hacktitle"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={newHackathon.hacktitle}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="hackdescription"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={newHackathon.hackdescription}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="hackcoinCount"
            label="Coin Count"
            type="number"
            fullWidth
            variant="standard"
            value={newHackathon.hackcoinCount}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="hackathondetails"
            label="Details"
            type="text"
            fullWidth
            variant="standard"
            value={newHackathon.hackathondetails}
            onChange={handleInputChange}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              mt: 2,
            }}
          >
            {/* Hackathon Image Upload */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  padding: "5px 15px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                Upload Hackathon Image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleHackImageChange}
                />
              </Button>
              {previewHackImage && (
                <img
                  src={previewHackImage}
                  alt="Hackathon Image Preview"
                  style={{ width: "80px", height: "auto", borderRadius: "4px" }}
                />
              )}
            </Box>
            <Typography variant="caption">Upload Hackathon Image</Typography>

            {/* Hackathon Main Image Upload */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  padding: "5px 15px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                Upload Main Image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleHackMainImageChange}
                />
              </Button>
              {previewHackMainImage && (
                <img
                  src={previewHackMainImage}
                  alt="Hackathon Main Image Preview"
                  style={{ width: "80px", height: "auto", borderRadius: "4px" }}
                />
              )}
            </Box>
            <Typography variant="caption">Upload Hackathon Main Image</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleAddHackathon} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageHackathons;
