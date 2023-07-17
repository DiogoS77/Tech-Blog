const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.STRING,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
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
    modelName: "comment",
  }
);

module.exports = Comment;

//This code defines a Sequelize model for the Comment table in the database.
//It imports the necessary dependencies: Model and DataTypes from Sequelize, and the database connection sequelize from the ../config/connection file.
//It declares a Comment class that extends Model. This class will represent the comments table in the database.
//The Comment.init() method is used to initialize the model with its attributes and options:
//It defines the columns of the comments table with their respective data types:
//id: An auto-incrementing integer that serves as the primary key for each comment.
//body: A string representing the content of the comment.
//post_id: An integer representing the foreign key to the posts table. It establishes a one-to-many relationship between the comments and posts tables.
//user_id: An integer representing the foreign key to the users table. It establishes a one-to-many relationship between the comments and users tables.
//The references property is used to specify the related model and key for the foreign key columns (post_id and user_id).
//The second argument is an object that configures the model's options:
//sequelize: The database connection instance created with Sequelize.
//freezeTableName: When set to true, the table name will be the same as the model name ('comment'). Otherwise, Sequelize would pluralize the model name to determine the table name.
//underscored: When set to true, the column names will use snake_case (e.g., created_at) instead of the default camelCase.
//modelName: The model name ('comment') explicitly defined for the table.
//The Comment model is exported to be used in other parts of the application, allowing for CRUD (Create, Read, Update, Delete) operations on the comments table in the database using Sequelize methods.
