'use strict';

module.exports = (socket) => (payload) => {
  payload.event = 'delivered';
  socket.emit('log', payload);
  console.log(`VENDOR: received order id: ${payload.orderId}`);
};
