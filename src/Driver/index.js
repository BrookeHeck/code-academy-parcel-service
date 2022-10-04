'use strict';

const io = require('socket.io-client');
const handleTransit = require('./handleTransit');

const URI = process.env.URI || 'http://localhost:3002/caps';

const socket = io.connect(URI);

socket.on('pickup', handleTransit(socket));

module.exports = socket;
