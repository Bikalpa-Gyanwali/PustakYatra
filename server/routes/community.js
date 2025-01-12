const express = require('express');
const router = express.Router();
const CommunityPost = require('../models/CommunityPost');

// Fetch all posts
router.get('/community', async (req, res) => {
  try {
    const posts = await CommunityPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Add a new post
router.post('/community', async (req, res) => {
  const { author, bookName, content } = req.body;
  if (!author || !bookName || !content) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newPost = new CommunityPost({ author, bookName, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});


module.exports = router;
