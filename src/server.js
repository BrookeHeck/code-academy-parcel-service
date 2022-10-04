'use strict';

const io = require('socket.io');
const PORT = process.env.PORT || 3002;
const observables = require('./eventPool');
const server = io(PORT);
const logger = require('./logEvents');

const caps = server.of('/caps');

caps.on('connection', (socket) => {
  
  socket.on('log', logger);

  observables.forEach(event => {
    socket.on(event, (payload) => socket.broadcast.emit(event, payload));
  });

  // socket.on(observables[0], (payload) => socket.broadcast.emit(observables[0], payload));
  // socket.on(observables[1],(payload) => socket.broadcast.emit(observables[1], payload));
  // socket.on(observables[2], (payload) => socket.broadcast.emit(observables[2], payload));

});

module.exports = caps;

