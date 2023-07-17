const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;

//This code defines a Sequelize model for the Post table in the database.
//It imports the necessary dependencies: Model and DataTypes from Sequelize, and the database connection sequelize from the ../config/connection file.
//It declares a Post class that extends Model. This class will represent the posts table in the database.
//The Post.init() method is used to initialize the model with its attributes and options:
//It defines the columns of the posts table with their respective data types:
//id: An auto-incrementing integer that serves as the primary key for each post.
//title: A string representing the title of the post. It cannot be null.
//body: A string representing the content of the post.
//user_id: An integer representing the foreign key to the users table. It establishes a one-to-many relationship between the posts and users tables.
//The references property is used to specify the related model and key for the foreign key column user_id.
//The second argument is an object that configures the model's options:
//sequelize: The database connection instance created with Sequelize.
//freezeTableName: When set to true, the table name will be the same as the model name ('post'). Otherwise, Sequelize would pluralize the model name to determine the table name.
//underscored: When set to true, the column names will use snake_case (e.g., created_at) instead of the default camelCase.
//modelName: The model name ('post') explicitly defined for the table.
//The Post model is exported to be used in other parts of the application, allowing for CRUD (Create, Read, Update, Delete) operations on the posts table in the database using Sequelize methods. It also establishes a relationship with the User model based on the user_id foreign key, enabling queries that retrieve posts and their associated users.
