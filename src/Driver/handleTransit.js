'use strict';

module.exports = (socket) => (payload) => {
  payload.event = 'in-transit';
  socket.emit('log', payload);
  console.log(`DRIVER: transiting order id: ${payload.orderId}`);
  socket.emit('deliver', payload);
};
