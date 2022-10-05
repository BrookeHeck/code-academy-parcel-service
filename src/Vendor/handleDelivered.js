'use strict';

module.exports = (socket) => (payload) => {
  console.log(payload.message);
  payload.event = 'received';
  payload.message = `${payload.store} received order id: ${payload.orderId}`;
  socket.emit('log', payload);
  socket.emit('complete', payload);
};
