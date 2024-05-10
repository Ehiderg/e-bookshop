const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
const loginRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
//const orderRoutes = require('./routes/orderRoutes');
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/login', loginRoutes);
//app.use('/orders', orderRoutes);

// MongoDB Connection
const uri = process.env.DATABASE_URL;

// Opciones del cliente
const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

async function connectToDatabase() {
  try {
    // Conectar a la base de datos
    await mongoose.connect(uri, clientOptions);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
