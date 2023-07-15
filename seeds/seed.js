const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const posts = await Promise.all(
      postData.map(async (project) => {
        const newPost = await Post.create({
          ...project,
          user_id: users[Math.floor(Math.random() * users.length)].id,
        });
        return newPost;
      })
    );

    await Promise.all(
      commentData.map(async (comment) => {
        await Comment.create({
          ...comment,
          user_id: users[Math.floor(Math.random() * users.length)].id,
          post_id: posts[Math.floor(Math.random() * posts.length)].id,
        });
      })
    );

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();
