import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Delete } from '@mui/icons-material';

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

  const convertDeltaToHtml = (delta) => {
    if (!delta || !Array.isArray(delta.ops)) return '';
    
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
    console.log(converter.convert());
    return converter.convert();
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
                    onClick={() => handleDelete(blog.articleId)} 
                    sx={{cursor:'pointer'}}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Blog Details</DialogTitle>
        <DialogContent>
          {selectedBlog && (
            <div>
              <Typography variant="h4">{selectedBlog.title}</Typography>
              <Typography variant="h5">{selectedBlog.subtitle}</Typography>
              <div 
                dangerouslySetInnerHTML={{ __html: convertDeltaToHtml(selectedBlog.content) }}
              />
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