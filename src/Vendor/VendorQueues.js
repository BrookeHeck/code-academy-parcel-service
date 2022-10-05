'use strict';

const MessageQueue = require('../Messages/MessageQueue');

class VendorQueues {
  constructor() {
    this.queues = {};
  }

  addQueue(storeId) {
    try {
      const newQueue = new MessageQueue();
      this.queues[storeId] = newQueue;
    } catch(e) {
      console.log(e);
    }
  }

  removeQueue(storeId) {
    try {
      delete this.queues[storeId];
      return `Delete Queue for client ${storeId}`;
    } catch(e) {
      console.log(e);
    }
  }
}

module.exports = VendorQueues;