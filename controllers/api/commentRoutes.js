const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log('comment route');
  try {
    const { body, post_id } = req.body;
    const newComment = await Comment.create({ body, post_id });

    console.log('Create a new Comment route');
    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;
