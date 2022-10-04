'use strict';

const io = require('socket.io-client');
const handlePickup = require('./handlePickup');
const handleDelivered = require('./handleDelivered');

const URI = process.env.URI || 'http://localhost:3002/caps';

const socket = io.connect(URI);

handlePickup(socket);

socket.on('deliver', handleDelivered(socket));

module.exports = socket;
