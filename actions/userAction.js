const User = require("../models/User");

async function readUserByID(userID) {
  try {
    const user = await User.findById(userID);
    if (!user || !user.active) {
      throw new Error("No existe el usuario");
    }
    return user;
  } catch (error) {
    throw new Error("Error al buscar el usuario por ID");
  }
}

async function readUsers() {
  try {
    const users = await User.find();
    if (!users) {
      throw new Error("No se encontraron usuarios");
    }
    return users;
  } catch (error) {
    throw new Error("Error al buscar usuarios");
  }
}

async function createUser(userData) {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw new Error("Error al crear el usuario");
  }
}

async function updateUser(userID, userData) {
  try {
    const updatedUser = await User.findByIdAndUpdate(userID, userData, { new: true });
    if (!updatedUser || !updatedUser.active) {
      throw new Error("No se pudo actualizar el usuario");
    }
    return updatedUser;
  } catch (error) {
    throw new Error("Error al actualizar el usuario");
  }
}

async function softDeleteUser(userID) {
  try {
    const deletedUser = await User.findByIdAndUpdate(userID, { active: false }, { new: true });
    if (!deletedUser || !deletedUser.active) {
      throw new Error("No se pudo eliminar el usuario");
    }
    return deletedUser;
  } catch (error) {
    throw new Error("Error al eliminar el usuario");
  }
}

module.exports = {
  readUsers,
  readUserByID,
  createUser,
  updateUser,
  softDeleteUser,
};
