'use strict';

const getContacts = require('./src/getContacts.js');
const createContact = require('./src/createContact.js');
const checkRecentOrders = require('./src/checkRecentOrders.js');
const getTweets = require('./src/getTweets.js');

exports.getContacts = getContacts;
exports.createContact = createContact;
exports.checkRecentOrders = checkRecentOrders;
exports.getTweets = getTweets;