const router = require("express").Router();
const {User} = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({where: {email: req.body.email}});

    if (!userData) {
      res
        .status(400)
        .json({message: "Incorrect email or password, please try again"});
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({message: "Incorrect email or password, please try again"});
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({user: userData, message: "You are now logged in!"});
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

//This code defines an Express router that handles user-related authentication functionalities, such as user registration, user login, and user logout.
//It imports the necessary dependencies: express and its Router module, as well as the User model.
//It defines three routes for user authentication:
//POST /: This route is for user registration. When a POST request is received, it creates a new user in the database based on the data provided in the request body. It then saves the user ID and sets the logged_in flag to true in the session. Finally, it sends a JSON response with status code 200, containing the user data.
//POST /login: This route is for user login. When a POST request is received, it tries to find a user in the database with the provided email. If the user is found, it checks if the provided password matches the user's hashed password in the database using the checkPassword method. If the password is valid, it saves the user ID and sets the logged_in flag to true in the session. Then, it sends a JSON response with status code 200, containing the user data and a success message. If the email or password is incorrect, it sends a JSON response with status code 400, indicating the error.
//POST /logout: This route is for user logout. When a POST request is received, it checks if the user is logged in (by verifying the logged_in flag in the session). If the user is logged in, it destroys the session, effectively logging the user out. It sends a response with status code 204 (no content) to indicate a successful logout. If the user is not logged in, it sends a response with status code 404 (not found) to indicate that there was no active session to log out from.
//The router exports itself to be used in the main application file.
//In summary, this code provides routes to handle user registration, login, and logout functionalities, and it relies on the User model for database operations and session handling for user authentication.
