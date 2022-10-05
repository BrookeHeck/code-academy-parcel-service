'use strict';

const io = require('socket.io-client');
const handlePickup = require('./handlePickup');
const handleComplete = require('./handleComplete');

const URI = process.env.URI || 'http://localhost:3002/caps';

const socket = io.connect(URI);

socket.on('pickup', handlePickup(socket));
socket.on('complete', handleComplete(socket));

module.exports = socket;
