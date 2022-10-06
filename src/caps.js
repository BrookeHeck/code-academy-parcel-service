'use strict';

const server = require('./server');
const logger = require('./logEvents');
const MessageQueue = require('./Messages/MessageQueue');

// this is an object that holds all the queues
// it starts wit only a driver queue
const queues = require('./Messages/queues');

const observables = ['in-transit', 'deliver', 'complete'];

const caps = server.of('/caps');

caps.on('connection', async (socket) => {
  
  socket.on('log', logger);

  socket.on('join', payload => {
    socket.join(payload);
    queues[payload] = new MessageQueue();
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