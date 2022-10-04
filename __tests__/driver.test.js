'use strict';

const events = require('./../src/eventEmitter');
const driver = require('./../src/Driver');
const logger = require('./../src/logEvents');

const payload = {
  store: 'store',
  orderId: Math.ceil(Math.random() * 100),
  customer: 'customer',
  address: 'address',
};

beforeAll(() => {
  events.on('log', logger);
});

describe('testing driver events', () => {
  test('Should log that the driver is transiting the order', () => {
    jest.spyOn(console, 'log');

    events.on('in-transit', driver.inTransit);
    events.emit('in-transit', payload);

    payload.event = 'in-transit';

    expect(console.log).toHaveBeenCalledWith(`DRIVER: transiting order id: ${payload.orderId}`);
    expect(console.log).toHaveBeenCalledWith(payload);

  });

  test('Should log that the driver has delivered the order', () => {
    jest.spyOn(console, 'log');

    events.on('deliver', driver.deliver);
    events.emit('deliver', payload);

    payload.event = 'delivered';

    expect(console.log).toHaveBeenCalledWith(`DRIVER: delivered order id: ${payload.orderId}`);
    expect(console.log).toHaveBeenCalledWith(payload);
    
  });
});
