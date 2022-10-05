'use strict';

module.exports = (socket) => (payload) => {
  console.log(payload.message);
  socket.emit('join', payload.storeId);
  setTimeout(() => {
    payload.event = 'in-transit';
    payload.message = `DRIVER: Order id ${payload.orderId} is in-transit`;
    socket.emit('log', payload);
    socket.emit('in-transit', payload);
  }, 3000);

  setTimeout(() => {
    payload.event = 'deliver';
    payload.message = `DRIVER: Order id ${payload.orderId} has been delivered`;
    socket.emit('log', payload);
    socket.emit('deliver', payload);
  }, 6000);
};
