'use strict';

const events = require('./../index');
const driver = require('./../src/Driver');
const logger = require('./../src/logEvents');

const payload = {
  store: 'store',
  orderId: Math.ceil(Math.random() * 100),
  customer: 'customer',
  address: 'address',
};

describe('testing driver events', () => {
  test('Should log that the driver is transiting the order', () => {
    jest.spyOn(console, 'log');
    
    events.on('log', logger);
    payload.event = 'in-transit';

    events.on('in-transit', driver.inTransit);
    events.emit('in-transit', payload);

    expect(console.log).toHaveBeenCalledWith(`DRIVER: transiting order id: ${payload.orderId}`);
    expect(console.log).toHaveBeenCalledWith(payload);

  });

  test('Should log that the driver has delivered the order', () => {
    jest.spyOn(console, 'log');

    payload.event = 'delivered';

    events.on('deliver', driver.deliver);
    events.emit('deliver', payload);

    expect(console.log).toHaveBeenCalledWith(`DRIVER: delivered order id: ${payload.orderId}`);
    expect(console.log).toHaveBeenCalledWith(payload);
    
  });
});
