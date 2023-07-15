const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts with comments
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: Comment }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const { title, body } = req.body;
    const postData = await Post.update(
      { title, body },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
