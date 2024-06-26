const User = require("../models/User");

async function readUserByID(userID, active=true) {
  try {
 
    const user = await User.findOne({ cedula: userID, active: active }, { password: 0 });

    if (!user) {
      throw new Error("No existe el usuario");
    }
    
    return user;
  } catch (error) {
    throw new Error("Error al buscar el usuario por ID");
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
    const deletedUser = await User.findOneAndUpdate({cedula: userID}, {active: false});
    console.log(deletedUser);
    return deletedUser;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  readUserByID,
  createUser,
  updateUser,
  softDeleteUser,
};