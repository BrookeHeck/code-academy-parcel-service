'use strict';

const server = require('./sender');
const logger = require('./logEvents');

const observables = ['in-transit', 'deliver', 'complete'];

const caps = server.of('/caps');

caps.on('connection', async (socket) => {
  
  socket.on('log', logger);

  socket.on('join', payload => {
    socket.join(payload);
    console.log(`${socket.id} joined ${payload}`);
  });

  socket.on('pickup', payload => {
    socket.broadcast.emit('pickup', payload);
  });

  observables.forEach(event => {
    socket.on(event, (payload) => socket.to(`${payload.storeId}`).emit(event, payload));
  });

});

module.exports = caps;