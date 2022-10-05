const Chance = require('chance');
const chance = new Chance();

const orderDetails = {
  storeId: chance.guid(),
  orderId: chance.guid(),
  customer: chance.name(),
  address: chance.address(),
  event: '',
  message: '',
};

module.exports = (socket) => {
  orderDetails.event = 'pickup';
  orderDetails.message = `${orderDetails.customer.toUpperCase()} has order ready for pickup at ${orderDetails.address} `;
  socket.emit('join', orderDetails.storeId);
  socket.emit('log', orderDetails);
  socket.emit('pickup', orderDetails);
};