const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {User, Post, Comment};

//This code establishes associations (relationships) between the User, Post, and Comment models using Sequelize.
//It imports the User, Post, and Comment models from their respective files.
//It defines the associations (relationships) between the models using Sequelize's hasMany and belongsTo methods:
//User has many Posts, and Post belongs to one User. This means that each user can have multiple posts, and each post belongs to only one user. The foreign key user_id is used in the Post model to reference the primary key of the User model.
//Post has many Comments, and Comment belongs to one Post. This means that each post can have multiple comments, and each comment belongs to only one post. The foreign key post_id is used in the Comment model to reference the primary key of the Post model.
//User has many Comments, and Comment belongs to one User. This means that each user can have multiple comments, and each comment belongs to only one user. The foreign key user_id is used in the Comment model to reference the primary key of the User model.
//Finally, it exports an object containing the User, Post, and Comment models with their associations defined. This allows other parts of the application to access the models and work with their relationships.
//With these associations in place, Sequelize can automatically generate queries that retrieve related data between the User, Post, and Comment models, making it easier to work with the data in a meaningful way.
//For example, you can easily retrieve all comments for a specific user, all posts for a specific user, or all comments for a specific post.
