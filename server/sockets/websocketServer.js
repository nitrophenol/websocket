const socketIO = require('socket.io');
const express = require('express');
const mongoose = require('mongoose');
const Auction = require('../models/Auction');
const Bid = require('../models/Bid');
const Transaction = require('../models/Transaction');


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
      console.log('Room:', room);

      if (bidAmount < 0) {
        return;
      }

      if (bidAmount<= Auction.highestBid) {
        return;
      }

      const newBid = new Bid({
        amount: bidAmount,
        auction: room,
      });

      newBid.save((err, bid) => {
        if (err) {
          console.log(err);
        } else {
          Auction.findById(room, (err, auction) => {
            if (err) {
              console.log(err);
            } else {
              auction.bids.push(bid);
              auction.highestBid = bid;
              auction.save((err, auction) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('Auction updated');
                }
              });
            }
          });
        }
      }
      );

      io.to(room).emit('newBid', bidAmount); // Broadcast the bid to all clients in the room
    });

    socket.on('transaction', (room, buyer, seller) => {
      console.log('Room:', room);
      console.log('Buyer:', buyer);
      console.log('Seller:', seller);

      Auction.findById(room, (err, auction) => {
        if (err) {
          console.log(err);
        } else {
          const newTransaction = new Transaction({
            auction: auction,
            buyer: buyer,
            seller: seller,
          });

          newTransaction.save((err, transaction) => {
            if (err) {
              console.log(err);
            } else {
              auction.finalTransaction = transaction;
              auction.save((err, auction) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('Auction updated');
                }
              });
            }
          });
        }
      });

      io.to(room).emit('newTransaction', buyer, seller); // Broadcast the transaction to all clients in the room
    }
    );

    socket.on('leaveRoom', (room) => {
      console.log('A user left room:', room);
      socket.leave(room); // Leave the room
    }
    );

  
    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
  
}

module.exports = setupWebSocketServer;
