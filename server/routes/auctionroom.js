const socketio = require('socket.io');

module.exports = function(server) {
    const io = socketio(server);

    io.on('connection', (socket) => {
        console.log('New WebSocket connection');

        // Join a room
        socket.on('join', ({ auctionId }) => {
            socket.join(auctionId);
            console.log(`Socket ${socket.id} joined room ${auctionId}`);
        });

        // Listen for bids
        socket.on('bid', ({ auctionId, bid }) => {
            // Broadcast the bid to all clients in the room except the sender
            socket.to(auctionId).emit('bid', bid);
            console.log(`Bid ${bid} sent to room ${auctionId}`);
        });

        // Leave a room
        socket.on('leave', ({ auctionId }) => {
            socket.leave(auctionId);
            console.log(`Socket ${socket.id} left room ${auctionId}`);
        });

        // Disconnect
        socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });
    });
};
