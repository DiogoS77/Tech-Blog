const express = require("express");
const router = express.Router();
const {Comment} = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  console.log("comment route");
  try {
    const {body, post_id} = req.body;
    const newComment = await Comment.create({
      body,
      post_id,
      user_id: req.session.user_id,
    });

    console.log("Create a new Comment route");
    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;

//This code is an Express router that handles the creation of new comments for a specific post in a web application.
//It imports the necessary dependencies: express, express.Router, the Comment model, and withAuth (a custom middleware for authentication).
//It defines a POST route with the path '/', which means it will be accessed as a relative path from its parent route. It requires the user to be authenticated (withAuth) before allowing access to the route.
//When a POST request is received on this route, it extracts the body and post_id from the request's body.
//It creates a new comment in the database using the Comment model's create method. The new comment's body, post_id, and user_id are set based on the request data and the authenticated user's user_id stored in the session.
//If the comment creation is successful, it sends a JSON response with status code 200, containing the newly created comment.
//If there's an error during comment creation, it logs the error and sends a JSON response with status code 400, containing the error details.
//This code assumes that there's an authentication system implemented, and the req.session.user_id contains the ID of the authenticated user. It also assumes the Comment model is defined and allows for the creation of comments in the database.
