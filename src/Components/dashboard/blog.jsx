import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { RenderDelta } from 'quill-delta-to-react';


const Blogs = () => {
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:80/api/fetchBlogs'); 
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  const handleReview = (blog) => {
    setSelectedBlog(blog);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.articleId}>
                <TableCell>{blog.title}</TableCell>
                <TableCell sx={{display:'flex', gap:'10px', alignItems:'center'}}>
                  <Button onClick={() => handleReview(blog)}>Review</Button>
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
        <DialogTitle>Blog Details</DialogTitle>
        <DialogContent>
          {selectedBlog && (
            <div>
              <Typography variant="h4">{selectedBlog.title}</Typography>
              <Typography variant="h5">{selectedBlog.subtitle}</Typography>
              <Typography variant="body">{selectedBlog.content}</Typography>
              {/* Use a rich text editor or custom component to display content */}
              {/* <RenderDelta
                content={selectedBlog.content}
                renderEmbed={(embed, children) => {
                  if (embed.type === 'image') {
                    return <img src={embed.value.url} alt={embed.value.alt} />;
                  }
                  return <div>Unknown embed: {JSON.stringify(embed)}</div>;
                }}
              /> */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Accept</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Blogs;
