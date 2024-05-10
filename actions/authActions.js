const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const User = require('../models/User');

async function authenticateUser(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isValidPassword = await argon2.verify(user.password, password);

  if (!isValidPassword) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign({ id: user.cedula }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
}

module.exports = { authenticateUser };
