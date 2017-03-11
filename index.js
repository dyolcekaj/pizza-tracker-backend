'use strict';

const getContacts = require('./src/getContacts.js');
const createContact = require('./src/createContact.js');
const checkRecentOrders = require('./src/checkRecentOrders.js');

exports.getContacts = getContacts;
exports.createContact = createContact;
exports.checkRecentOrders = checkRecentOrders;