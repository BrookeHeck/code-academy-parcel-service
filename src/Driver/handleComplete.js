'use strict';

module.exports = (socket) => (payload) => {
  socket.emit('log', payload);
  console.log(payload.message);
};
