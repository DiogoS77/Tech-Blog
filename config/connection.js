const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;

//This code sets up a database connection using Sequelize, an ORM library for Node.js, to connect to a MySQL database.
//It imports the necessary dependencies: Sequelize and dotenv (for loading environment variables).
//It loads environment variables from a .env file.
//It checks if there's a JAWSDB_URL environment variable (typically used in cloud platforms like Heroku).
//If JAWSDB_URL is present, it connects to the MySQL database using the provided URL.
//If JAWSDB_URL is not present, it connects to the MySQL database locally using the environment variables (DB_NAME, DB_USER, DB_PASSWORD, and default host, dialect, and port).
