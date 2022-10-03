'use strict';

const events = require('./../index');
const logEvents = require('./logEvents');

function inTransit(payload) {
  payload.event = 'in-transit';
  events.emit('log', payload);
  console.log(`DRIVER: transiting order id: ${payload.orderId}`);
}

function deliver(payload) {
  payload.event = 'delivered';
  events.emit('log', payload);
  console.log(`DRIVER: delivered order id: ${payload.orderId}`);
}

module.exports = {
  inTransit:inTransit,
  deliver:deliver
}
