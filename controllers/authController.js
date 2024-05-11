const { authenticateUser } = require('../actions/authActions');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const token = await authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function verifyToken(req, res, next) {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (error) => {
      if (error) {
        return res.status(403).json({ message: 'Token de autenticación inválido' });
      }
      req.body.userId = jwt.decode(token.split(' ')[1]).id;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { login , verifyToken};
