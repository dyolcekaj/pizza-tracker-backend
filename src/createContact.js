'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const createResponse = require('./common.js').createResponse;

const tableName = process.env.TABLE_NAME;

module.exports = (event, context, callback) => {
	console.log('[createContact]: received event = ', event);
	let item = {
		phoneNumber: event.phoneNumber,
		doc: event
	};

	let params = {
		TableName: tableName,
		Item: item
	};

	let dbPut = (params) => { return dynamo.put(params).promise() };
	dbPut(params).then((data) => {
		console.log(`PUT ITEM SUCCEEDED WITH doc = ${item.doc}`);
		context.done(null, createResponse(200, null));
	}).catch((err) => {
		console.log(`PUT ITEM FAILED FOR doc = ${item.doc}, WITH ERROR: ${err}`);
		context.done(null, createResponse(500, err));
	});
}