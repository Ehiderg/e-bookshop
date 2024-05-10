const {
    readUsers,
    readUserByID,
    createUser,
    updateUser,
    softDeleteUser,
  } = require("../actions/userAction");
  
  async function getUserByID(req, res) {
    try {
      const user = await readUserByID(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async function getAllUsers(req, res) {
    try {
      const users = await readUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async function createUserHandler(req, res) {
    try {
      const newUser = await createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  async function updateUserHandler(req, res) {
    try {
      const updatedUser = await updateUser(req.params.id, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  async function softDeleteUserHandler(req, res) {
    try {
      const deletedUser = await softDeleteUser(req.params.id);
      res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  module.exports = {
    getUserByID,
    getAllUsers,
    createUserHandler,
    updateUserHandler,
    softDeleteUserHandler,
  };
  