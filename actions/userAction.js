const User = require("../models/User");

async function readUserByID(userID) {
  try {
    console.log(userID);
    const user = await User.findOne({cedula: userID});
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
    console.log(userID);
    console.log(userData);
    const updatedUser = await User.findOneAndUpdate({cedula: userID}, userData, { new: true });
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
    const deletedUser = await User.updateOne({cedula: userID}, {active: false});
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