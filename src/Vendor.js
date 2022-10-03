'use strict';

const events = require('./../index');
console.log(events.emit);

function pickup(payload) {
  payload.event = 'pickup'
  events.emit('log', payload);
  console.log(`VENDER: ready for pickup, order id: ${payload.orderId}`);
}

function deliver(payload) {
  payload.event = 'delivered';
  events.emit('log', payload);
  console.log(`VENDOR: received order id: ${payload.orderId}`);
}

module.exports = {
  pickup:pickup,
  deliver:deliver
}