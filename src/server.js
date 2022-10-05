'use strict';

const io = require('socket.io');
const PORT = process.env.PORT || 3002;
const observables = require('./eventPool');
const server = io(PORT);
const logger = require('./logEvents');

const caps = server.of('/caps');

caps.on('connection', async (socket) => {
  
  socket.on('log', logger);

  socket.on('join', payload => {
    socket.join(`${payload}`);
    console.log(`${socket.id} joined ${payload}`);
  });

  socket.on('pickup', payload => socket.broadcast.emit('pickup', payload));

  observables.forEach(event => {
    socket.on(event, (payload) => socket.to(`${payload.storeId}`).emit(event, payload));
  });

});

module.exports = caps;

