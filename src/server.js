'use strict';

const io = require('socket.io');
const PORT = process.env.PORT || 3002;
const server = io(PORT);

module.exports = server;

