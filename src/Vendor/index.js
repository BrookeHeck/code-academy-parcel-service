'use strict';

const io = require('socket.io-client');
const handlePickup = require('./handlePickup');
const handleDelivered = require('./handleDelivered');
const handleTransit = require('./handleTransit.js');

const URI = process.env.URI || 'http://localhost:3002/caps';

const socket = io.connect(URI);

handlePickup(socket);

socket.on('in-transit', handleTransit);
socket.on('deliver', handleDelivered(socket));

module.exports = socket;
