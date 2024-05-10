const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const {
  readUsers,
  readUserByID,
  createUser,
  updateUser,
  softDeleteUser,
} = require('../actions/userAction');

async function getAllUsers(req, res) {
  try {
    const users = await readUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUserByID(req, res) {
  try {
    const user = await readUserByID(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}

async function createUserHandler(req, res) {
  try {
    const { fullName, cedula, email, password, address} = req.body;

    // Hash de la contraseña
    const hashedPassword = await argon2.hash(password);

    const newUser = await createUser({
      fullName,
      cedula,
      email,
      password: hashedPassword,
      address
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateUserHandler(req, res) {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }
    console.log(token.split(' ')[1]);
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, async (error, decodedToken) => {
      if (error) {
        return res.status(403).json({ message: 'Token de autenticación inválido' });
      }

      console.log(decodedToken);

      const userId = decodedToken.id;

      console.log(userId);
      console.log(req.params.id == userId);
      if (userId !== parseInt(req.params.id)) {
        return res.status(403).json({ message: 'No tienes permiso para actualizar este usuario' });
      }

      const { fullName, cedula, email, password, address } = req.body;

      // Hash de la contraseña
      const hashedPassword = await argon2.hash(password);

      const updatedUser = await updateUser(userId, {
        fullName,
        cedula,
        email,
        password: hashedPassword,
        address
      });

      if (!updatedUser || !updatedUser.active) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json(updatedUser);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
}

async function softDeleteUserHandler(req, res) {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, async (error, decodedToken) => {
      if (error) {
        return res.status(403).json({ message: 'Token de autenticación inválido' });
      }

      const userId = decodedToken.id;

      if (userId !== parseInt(req.params.id)) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar este usuario' });
      }

      const deletedUser = await softDeleteUser(userId);

      if (!deletedUser || !deletedUser.active) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json({ message: 'Usuario eliminado correctamente', user: deletedUser });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {  getUserByID,
  getAllUsers,
  createUserHandler,
  updateUserHandler,
  softDeleteUserHandler, 
};
