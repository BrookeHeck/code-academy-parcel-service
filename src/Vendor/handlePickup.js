const orderDetails = {
  store: 'store',
  orderId: Math.ceil(Math.random() * 100),
  customer: 'customer',
  address: 'address',
  event: '',
  message: '',
};

module.exports = (socket) => {
  orderDetails.event = 'pickup';
  orderDetails.message = `${orderDetails.store} has an order ready for pickup, order id: ${orderDetails.orderId}`;
  socket.emit('log', orderDetails);
  socket.emit('pickup', orderDetails);
};