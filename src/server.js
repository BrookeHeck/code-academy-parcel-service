'use strict';

const io = require('socket.io');
const PORT = process.env.PORT || 3002;
const observables = require('./eventPool');
const server = io(PORT);
const logger = require('./logEvents');

const caps = server.of('/caps');

caps.on('connection', async (socket) => {
  
  socket.on('log', logger);

  socket.on('pickup', payload => {
    socket.join(`${payload.store}`);
    console.log(`${socket.id}`);
  });

  socket.on('in-transit', payload => {
    socket.join(`${payload.store}`);
    console.log(`${socket.id}`);
  });

  observables.forEach(event => {
    socket.on(event, (payload) => socket.broadcast.emit(event, payload));
  });

});

module.exports = caps;

