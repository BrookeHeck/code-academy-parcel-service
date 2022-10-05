'use strict';

const io = require('socket.io');
const MessageQueue = require('./MessageQueue');
const PORT = process.env.PORT || 3002;

const server = io(PORT);
const messages = server.of('/messages');
const outGoing = new MessageQueue();

messages.on('connection', (socket) => {
  socket.on('join', payload => {
    console.log('Room registered: ', payload.storeId);
    socket.join(payload.storeId);
  });

  socket.on('message', (payload) => {
    outGoing.add(payload.storeId, payload.body);
    socket.to(payload.storeId).emit('message', payload);
  });

  socket.on('get-messages', payload => {
    outGoing.get(payload.storeId).forEach(message => {
      socket.emit('message', message);
    });
  });

  socket.on('received', payload => {
    const receipt = outGoing.read(payload.storeId, payload.body.message);
    socket.to(payload.storeId).emit('received', receipt);
  });
});