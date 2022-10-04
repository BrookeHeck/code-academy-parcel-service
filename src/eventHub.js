'use strict';
const events = require('./eventEmitter');
const Vendor = require('./Vendor');
const Driver = require('./Driver');
const logger = require('./logEvents');

const observables = ['pickup', 'in-transit', 'deliver', 'log'];

module.exports = () => {
  events.on(observables[3], logger);
  events.on(observables[0], Vendor.pickup);
  events.on(observables[1], Driver.inTransit);
  events.on(observables[2], Driver.deliver);
  events.on(observables[2], Vendor.deliver);
};
