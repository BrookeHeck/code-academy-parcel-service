'use strict';

const io = require('socket.io');
const PORT = process.env.PORT || 3002;
const observables = require('./eventPool');
const server = io(PORT);
const logger = require('./logEvents');

const caps = server.of('/caps');

caps.on('connection', (socket) => {
  
  socket.on('log', logger);

  // socket.on('pickup', (payload) => {
  //   payload.room = `${payload.store}:${payload.orderId}`;
  //   socket.join(`${payload.room}`);
  //   console.log(`Socket ${payload.room}`);
  // });

  // socket.on('deliver', (payload) => {
  //   socket.join(`${payload.room}`);
  //   console.log(`Socket ${socket.id} joined room ${payload.room}`);
  // });

  observables.forEach(event => {
    socket.on(event, (payload) => socket.broadcast.emit(event, payload));
  });

});

module.exports = caps;

