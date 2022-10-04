'use strict';

module.exports = (socket) => (payload) => {
  payload.event = 'complete';
  socket.emit('log', payload);
  console.log(`DRIVER: Transaction complete order id: ${payload.orderId}`);
};