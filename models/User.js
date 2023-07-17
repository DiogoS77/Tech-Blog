const {Model, DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;

//This code defines a Sequelize model for the User table in the database. It also includes custom methods and hooks for password hashing.
//It imports the necessary dependencies: Model and DataTypes from Sequelize, bcrypt for password hashing, and the database connection sequelize from the ../config/connection file.
//It declares a User class that extends Model. This class will represent the users table in the database.
//The User.init() method is used to initialize the model with its attributes and options:
//It defines the columns of the users table with their respective data types:
//id: An auto-incrementing integer that serves as the primary key for each user.
//name: A string representing the name of the user. It cannot be null.
//email: A string representing the email of the user. It cannot be null, must be unique, and must be a valid email format.
//password: A string representing the hashed password of the user. It cannot be null and must have a minimum length of 8 characters.
//The second argument is an object that configures the model's options:
//hooks: It contains two hooks (beforeCreate and beforeUpdate) that use bcrypt to hash the user's password before creating or updating a user in the database.
//sequelize: The database connection instance created with Sequelize.
//timestamps: When set to false, Sequelize won't automatically create createdAt and updatedAt fields in the table.
//freezeTableName: When set to true, the table name will be the same as the model name ('user'). Otherwise, Sequelize would pluralize the model name to determine the table name.
//underscored: When set to true, the column names will use snake_case (e.g., created_at) instead of the default camelCase.
//modelName: The model name ('user') explicitly defined for the table.
//The User model includes a custom method checkPassword(loginPw) that compares a provided password with the hashed password of the user. This method uses bcrypt.compareSync() to compare the passwords.
//The User model is exported to be used in other parts of the application, allowing for CRUD (Create, Read, Update, Delete) operations on the users table in the database using Sequelize methods. It also provides a convenient method checkPassword() for password verification during the login process.
//The hooks defined in the model ensure that the user's password is automatically hashed before being stored in the data
