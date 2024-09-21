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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import imageCompression from "browser-image-compression";
import ViewSportsUsersDialog from "../Sport/viewUsersDialog.jsx";

const sports = [
  { name: "Cricket", image: "assets/Sport/Cricket.png" },
  { name: "Badminton", image: "assets/Sport/Badminton.png" },
  { name: "Table Tennis", image: "assets/Sport/TableTennis.png" },
  { name: "Chess", image: "assets/Sport/Chess.png" },
  { name: "Athletics", image: "assets/Sport/athletics.png" },
];

const ManageSports = () => {
  const [sportsData, setSportsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newSport, setNewSport] = useState({
    sporttitle: "",
    sportdescription: "",
    sportcoinCount: "",
    sportdetails: "",
    type: "",
  });
  const [mainImage, setMainImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewMainImage, setPreviewMainImage] = useState(null);

  const [viewUsersOpen, setViewUsersOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUnapprovedUsers = async (sportId) => {
    try {
      const response = await axios.get(
        `http://localhost:80/api/unapprovedUsers/${sportId}`
      );
      setUsers(response.data);
      setViewUsersOpen(true);
    } catch (error) {
      console.error("Error fetching unapproved users", error);
    }
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Compress the image before setting it
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setMainImage(compressedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewMainImage(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const fetchSports = async () => {
    try {
      const response = await axios.get("http://localhost:80/api/sports");
      setSportsData(response.data);
    } catch (error) {
      console.error("There was an error fetching the sports!", error);
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewSport({
      sporttitle: "",
      sportdescription: "",
      sportcoinCount: "",
      sportdetails: "",
      type: "",
    });
    setMainImage(null);
    setPreviewMainImage(null);
  };

  const handleInputChange = (e) => {
    setNewSport({ ...newSport, [e.target.name]: e.target.value });
  };

  const handleAddSport = async () => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("sporttitle", newSport.sporttitle);
    formData.append("sportdescription", newSport.sportdescription);
    formData.append("sportcoinCount", newSport.sportcoinCount);
    formData.append("sportdetails", newSport.sportdetails);
    formData.append("type", newSport.type);

    // Append the main image file
    if (mainImage) {
      formData.append("sportmainimg", mainImage);
    }

    // Append sport image URL if it exists
    const sportImage = sports.find((s) => s.name === newSport.sport)?.image;
    if (sportImage) {
      formData.append("sportimageUrl", sportImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:80/api/addSport",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        fetchSports();
        handleClose();
      } else {
        throw new Error("Failed to add sport");
      }
    } catch (error) {
      console.error("There was an error adding the sport!", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSport = async (sportId) => {
    try {
      const response = await axios.delete(
        `http://localhost:80/api/deleteSport/${sportId}`
      );

      if (response.status === 200) {
        fetchSports();
      } else {
        throw new Error("Failed to delete sport");
      }
    } catch (error) {
      console.error("There was an error deleting the sport!", error);
    }
  };

  const handleApproveUser = async (userId) => {
    try {
      await axios.post(`http://localhost:80/api/approveUser/${userId}`);
    } catch (error) {
      console.error("Error approving user", error);
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
        Add New Sport
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Coin Count</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sportsData.map((sport) => (
              <TableRow key={sport._id}>
                <TableCell>{sport.sporttitle}</TableCell>
                <TableCell>{sport.sportdescription}</TableCell>
                <TableCell>{sport.sportcoinCount}</TableCell>
                <TableCell>
                  {sport.sportdetails.length > 100 ? (
                    <>
                      {`${sport.sportdetails.substring(0, 100)}... `}
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => alert(sport.sportdetails)}
                      >
                        see more
                      </span>
                    </>
                  ) : (
                    sport.sportdetails
                  )}
                </TableCell>
                <TableCell>{sport.type}</TableCell>
                <TableCell
                  sx={{
                    width: "200px",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => fetchUnapprovedUsers(sport._id)}
                  >
                    View Users
                  </Button>
                  <Delete
                    onClick={() => handleDeleteSport(sport._id)}
                    sx={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Sport</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="sporttitle"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={newSport.sporttitle}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="sportdescription"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={newSport.sportdescription}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="sportcoinCount"
            label="Coin Count"
            type="number"
            fullWidth
            variant="standard"
            value={newSport.sportcoinCount}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="sportdetails"
            label="Details"
            type="text"
            fullWidth
            variant="standard"
            value={newSport.sportdetails}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              name="type"
              value={newSport.type}
              onChange={handleInputChange}
            >
              <MenuItem value="club">Club</MenuItem>
              <MenuItem value="tournament">Tournament</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="sport-label">Sport</InputLabel>
            <Select
              labelId="sport-label"
              name="sport"
              value={newSport.sport}
              onChange={handleInputChange}
            >
              {sports.map((sport) => (
                <MenuItem key={sport.name} value={sport.name}>
                  {sport.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
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
                onChange={handleMainImageChange}
              />
            </Button>
            {previewMainImage && (
              <img
                src={previewMainImage}
                alt="Main Image Preview"
                style={{
                  width: "80px",
                  height: "auto",
                  borderRadius: "4px",
                  marginLeft: "10px",
                }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleAddSport} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
      <ViewSportsUsersDialog
        open={viewUsersOpen}
        onClose={() => setViewUsersOpen(false)}
        users={users}
        onApprove={handleApproveUser}
      />
    </div>
  );
};

export default ManageSports;
