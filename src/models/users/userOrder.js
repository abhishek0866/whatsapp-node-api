const { User } = require("./schema");

// Function to create a user
const createUser = async (userData) => {
  try {
    const createdUser = await User.create(userData);
    return createdUser.toJSON();
  } catch (error) {
    console.log(error.message);
  }
};


const getUserById = async (userId) => {
  try {
    const user = await User.findOne({ where: { user_id: userId } });
    return user.toJSON();
  } catch (error) {
    console.log("Error at getUserById --> ", error);
    throw error;
  }
};


module.exports = {
  createUser,
  getUserById
};

