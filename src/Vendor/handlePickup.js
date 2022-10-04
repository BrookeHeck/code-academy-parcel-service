const payload = {
  store: 'store',
  orderId: Math.ceil(Math.random() * 100),
  customer: 'customer',
  address: 'address',
};

module.exports = (socket) => {
  payload.event = 'pickup';
  socket.emit('log', payload);
  console.log(`VENDER: ready for pickup, order id: ${payload.orderId}`);
  socket.emit('pickup', payload);
};