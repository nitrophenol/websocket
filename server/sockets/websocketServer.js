const socketIO = require('socket.io');

function setupWebSocketServer(httpServer) {
  const io = socketIO(httpServer, {
    cors: {
      origin: 'http://localhost:3001', // Replace '*' with the specific origin of your frontend
    },
  });

  // WebSocket server setup
  io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle socket events here
    socket.on('joinRoom', (room) => {
      console.log('A user joined room:', room);
      socket.join(room); // Join a room with the given room name
    });
  
    socket.on('bid', (room, bidAmount) => {
      console.log('Bid amount:', bidAmount);
      io.to(room).emit('newBid', bidAmount); // Broadcast the bid to all clients in the room
    });
  
    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
  
}

module.exports = setupWebSocketServer;
