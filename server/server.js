const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // For enabling CORS
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://admin:admin123@cluster0.utgbm9n.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// WebSocket Communication
io.on('connection', (socket) => {
  console.log('A user connected via WebSocket');
  // You can handle WebSocket events here
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const authMiddleware = require('./middlewares/auth');

// Define your API routes
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const userRoutes = require('./routes/user');

app.use('/api/auth', authRoutes);

app.use(authMiddleware); // All routes defined after this will be protected

app.use('/api/item', itemRoutes);
app.use('/api/user', userRoutes);




// Start the Express server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const setupWebSocketServer = require('./sockets/websocketServer');

setupWebSocketServer(server);