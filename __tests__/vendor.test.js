'use strict';

const events = require('./../index');
const vendor = require('./../src/Vendor');
const logger = require('./../src/logEvents');

const payload = {
  store: 'store',
  orderId: Math.ceil(Math.random() * 100),
  customer: 'customer',
  address: 'address'
}

describe('testing vendor events', () => {
  test('Should log that the vendor has an order ready for pickup', () => {
    jest.spyOn(console, 'log');
    
    events.on('log', logger);
    payload.event = 'pickup';

    events.on('pickup', vendor.pickup);
    events.emit('pickup', payload);

    expect(console.log).toHaveBeenCalledWith(`VENDER: ready for pickup, order id: ${payload.orderId}`);
    expect(console.log).toHaveBeenCalledWith(payload);

  });

  test('Should log that the vendor has received a package', () => {
    jest.spyOn(console, 'log');

    payload.event = 'delivered';

    events.on('deliver', vendor.deliver);
    events.emit('deliver', payload);

    expect(console.log).toHaveBeenCalledWith(`VENDOR: received order id: ${payload.orderId}`);
    expect(console.log).toHaveBeenCalledWith(payload);
    
  });
});