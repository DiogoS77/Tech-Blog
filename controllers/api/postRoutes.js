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

// Get a single post by ID with comments
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });

    if (!postData) {
      res.status(404).json({ Message: 'No Post found with that id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const { title, body } = req.body;
    const user_id = req.session.user_id;
    const newPost = await Post.create({ title, body, user_id });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
