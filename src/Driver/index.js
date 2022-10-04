'use strict';

const io = require('socket.io-client');
const handleTransit = require('./handleTransit');
const handleComplete = require('./handleComplete');

const URI = process.env.URI || 'http://localhost:3002/caps';

const socket = io.connect(URI);

socket.on('pickup', handleTransit(socket));
socket.on('complete', handleComplete(socket));

module.exports = socket;
