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
import QrCode2Icon from '@mui/icons-material/QrCode2';
import imageCompression from "browser-image-compression";

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    coinCount: "",
    activitiesdetails: "",
    activitydate: "",
    activitytime: "",
    activityvenue: "",
  });
  const [mainImage, setMainImage] = useState(null);
  const [cardImage, setCardImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewMainImage, setPreviewMainImage] = useState(null);
  const [previewCardImage, setPreviewCardImage] = useState(null);

  const handleImageChange = async (e, setPreviewImage, setImageState) => {
    const file = e.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      };
      
      try {
        const compressedFile = await imageCompression(file, options);
        setImageState(compressedFile);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing the image:", error);
      }
    }
  };
  
  const handleMainImageChange = (e) => {
    handleImageChange(e, setPreviewMainImage, setMainImage);
  };
  
  const handleCardImageChange = (e) => {
    handleImageChange(e, setPreviewCardImage, setCardImage);
  };

  // Fetch activities from the backend
  const fetchActivities = async () => {
    try {
      const response = await axios.get("http://localhost:80/api/activities");
      setActivities(response.data);
    } catch (error) {
      console.error("There was an error fetching the activities!", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Handle dialog open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewActivity({
      title: "",
      description: "",
      coinCount: "",
      activitiesdetails: "",
      activitydate: "",
      activitytime: "",
      activityvenue: "",
    });
    setMainImage(null);
    setCardImage(null);
    setPreviewMainImage(null);
    setPreviewCardImage(null);
  };

  // Handle input changes for new activity form
  const handleInputChange = (e) => {
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
  };

  // Add new activity with image uploads
  const handleAddActivity = async () => {
    setIsLoading(true);
    const formData = new FormData();
    Object.keys(newActivity).forEach(key => {
      formData.append(key, newActivity[key]);
    });
    if (mainImage) formData.append("activitiesmainimg", mainImage);
    if (cardImage) formData.append("cardimg", cardImage);

    try {
      const response = await axios.post(
        "http://localhost:80/api/addActivity",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        fetchActivities();
        handleClose();
      } else {
        throw new Error("Failed to add activity");
      }
    } catch (error) {
      console.error("There was an error adding the activity!", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    try {
      const response = await axios.delete(
        `http://localhost:80/api/deleteActivity/${activityId}`
      );

      if (response.status === 200) {
        fetchActivities();
      } else {
        throw new Error("Failed to delete activity");
      }
    } catch (error) {
      console.error("There was an error deleting the activity!", error);
    }
  };

  const handleDownloadQR = async (activityId) => {
    try {
      const response = await axios.get(`http://localhost:80/api/getQRCode/${activityId}`);
      const qrCodeUrl = response.data.qrCodeUrl;
      
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = `QR_${activityId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download QR code", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "start" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{ marginBottom: "20px", maxWidth: "250px" }}
      >
        Add New Activity
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Coin Count</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.title}</TableCell>
                <TableCell>{activity.description}</TableCell>
                <TableCell>{activity.coinCount}</TableCell>
                <TableCell>
                  {activity.activitiesdetails.length > 100 ? (
                    <>
                      {`${activity.activitiesdetails.substring(0, 100)}... `}
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => alert(activity.activitiesdetails)}
                      >
                        see more
                      </span>
                    </>
                  ) : (
                    activity.activitiesdetails
                  )}
                </TableCell>
                <TableCell>
                  {new Date(activity.activitydate).toLocaleDateString()}
                </TableCell>
                <TableCell>{activity.activitytime}</TableCell>
                <TableCell>{activity.activityvenue}</TableCell>
                <TableCell sx={{ width: "200px" }}>
                  <QrCode2Icon
                    onClick={() => handleDownloadQR(activity._id)}
                    sx={{ cursor: "pointer", marginRight: "10px" }}
                  />
                  <Delete
                    onClick={() => handleDeleteActivity(activity._id)}
                    sx={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Activity</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={newActivity.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={newActivity.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="coinCount"
            label="Coin Count"
            type="number"
            fullWidth
            variant="standard"
            value={newActivity.coinCount}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="activitiesdetails"
            label="Details"
            type="text"
            fullWidth
            variant="standard"
            value={newActivity.activitiesdetails}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="activitydate"
            label="Activity Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={newActivity.activitydate}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="activitytime"
            label="Activity Time"
            type="time"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={newActivity.activitytime}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="activityvenue"
            label="Activity Venue"
            type="text"
            fullWidth
            variant="standard"
            value={newActivity.activityvenue}
            onChange={handleInputChange}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", mt: 2 }}>
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
                Upload Banner
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleMainImageChange}
                />
              </Button>
              {previewMainImage && (
                <img
                  src={previewMainImage}
                  alt="Banner Preview"
                  style={{ width: "80px", height: "auto", borderRadius: "4px" }}
                />
              )}
            </Box>
            <Typography variant="caption">Upload Activity Banner</Typography>

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
                Upload Card Image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleCardImageChange}
                />
              </Button>
              {previewCardImage && (
                <img
                  src={previewCardImage}
                  alt="Card Image Preview"
                  style={{ width: "80px", height: "auto", borderRadius: "4px" }}
                />
              )}
            </Box>
            <Typography variant="caption">Upload Card Image</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleAddActivity} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageActivities;