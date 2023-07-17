const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;

//This code is an Express router that acts as a central hub to organize and manage different routes related to users, posts, and comments in a web application.
//It imports the necessary dependencies: express and its Router module.
//It imports three other sets of routes from separate files: userRoutes, postRoutes, and commentRoutes. These files contain the specific routes related to users, posts, and comments, respectively.
//The router uses the use method to mount the imported routes on specific sub-paths:
///users: It mounts the userRoutes on the /users path. This means all routes defined in userRoutes will be accessible under the /users URL.
///posts: It mounts the postRoutes on the /posts path. All routes defined in postRoutes will be accessible under the /posts URL.
///comments: It mounts the commentRoutes on the /comments path. All routes defined in commentRoutes will be accessible under the /comments URL.
//The router then exports itself to be used in the main application file.
//In summary, this code acts as a middleware router that groups related routes for users, posts, and comments, making it easier to manage and organize the routes in a larger Express application.
//The actual route handling logic is defined in the separate userRoutes, postRoutes, and commentRoutes files.
