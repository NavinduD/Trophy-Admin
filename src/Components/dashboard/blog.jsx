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
        console.error('Error fetching blogs:', error);
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

  const handleDelete = async (articleId) => {
    try {
      const response = await axios.delete(`http://localhost:80/api/deleteBlog/${articleId}`);
      if (response.status === 200) {
        setBlogs(blogs.filter(blog => blog.articleId !== articleId));
        console.log('Blog deleted successfully');
      } else {
        console.warn('Unexpected status code:', response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error deleting blog:', error.response.data.message);
      } else {
        console.error('Error deleting blog:', error.message);
      }
    }
  };
  
  const handleAccept = async (articleId) => {
    try {
      const response = await axios.post(`http://localhost:80/api/acceptBlog/${articleId}`);
      if (response.status === 200) {
        setBlogs(blogs.filter(blog => blog.articleId !== articleId));
        setOpen(false);
        console.log('Blog accepted successfully');
      } else {
        console.warn('Unexpected status code:', response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error accepting blog:', error.response.data.message);
      } else {
        console.error('Error accepting blog:', error.message);
      }
    }
  };
  

  const convertContentToHtml = (content) => {
    const parsedContent = JSON.parse(content);
    console.log(parsedContent);
    const converter = new QuillDeltaToHtmlConverter(parsedContent, {inlineStyles: true, customCssClasses: true});
    const html = converter.convert();
    console.log(html);
    return html;
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
              <img 
                src={selectedBlog.imageUrl} 
                alt={selectedBlog.title} 
                style={{ 
                  width: '100%',
                  height: '400px', 
                  objectFit: 'cover',
                  borderRadius: '20px', 
                  marginBottom: '20px'
                }} 
              />
              <Typography variant="h3">{selectedBlog.title}</Typography>
              <Typography variant="h5">{selectedBlog.subtitle}</Typography>
              <div 
                dangerouslySetInnerHTML={{ __html: convertContentToHtml(selectedBlog.content) }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <button onClick={() => handleAccept(selectedBlog.articleId)}>Accept</button>
          <button onClick={handleClose}>Close</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Blogs;