'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const createResponse = require('./common.js').createResponse;

const tableName = process.env.TABLE_NAME;

module.exports = function(event, context, callback) {
    let dbGet = (params) => {
        return dynamo.scan(params).promise()
    };

    dbGet({TableName: tableName}).then(function(data) {
        if (!data.Items) {
            callback(null, createResponse(404, "Items not found"));
        }
        console.log(`RETRIEVED ITEM SUCCESSFULLY WITH doc = ${data.Items}`);
        callback(null, createResponse(200, data.Items));
    }).catch((err) => {
        console.log(`GET ITEM FAILED FOR doc = ${data.Item.doc}, WITH ERROR: ${err}`);
        callback(null, createResponse(500, err));
    });
}