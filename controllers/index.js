const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;

//This code is an Express router that acts as a central hub to organize and manage different routes in a web application.
//It imports the necessary dependencies: express and its Router module.
//It imports two sets of routes from separate files: apiRoutes and homeRoutes.
//The router uses the use method to mount the imported routes on specific sub-paths:
// /: It mounts the homeRoutes on the root path. This means all routes defined in homeRoutes will be accessible from the root URL.
// /api: It mounts the apiRoutes on the /api path. All routes defined in apiRoutes will be accessible under the /api URL.
//The router then exports itself to be used in the main application file.
//In summary, this code acts as a middleware router that groups and organizes different sets of routes: one set for general application pages (accessible from the root URL), and another set for API-related routes (accessible under the /api URL).
//The actual route handling logic is defined in the separate homeRoutes and apiRoutes files.
