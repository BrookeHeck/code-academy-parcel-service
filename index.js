'use strict';

const eventHub = require('./src/eventHub');
const events = require('./src/eventEmitter');

eventHub();

const payload = {
  store: 'store',
  orderId: Math.ceil(Math.random() * 100),
  customer: 'customer',
  address: 'address',
};

events.emit('pickup', payload);
events.emit('in-transit', payload);
events.emit('deliver', payload);

