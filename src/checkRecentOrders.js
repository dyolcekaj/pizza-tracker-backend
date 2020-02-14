'use strict';

const pizzapi = require('dominos');
const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

var twitter = require('twitter');
var tClient = new twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const tableName = process.env.TABLE_NAME;

module.exports = (event, context, callback) => {
    console.log('[checkRecentOrders]: checking orders, event = ', event);

    let dbGet = (params) => {
        return dynamo.scan(params).promise()
    };

    dbGet({ TableName: tableName }).then(function(data) {
        if (!data.Items) {
            console.log('[checkRecentOrders]: No data received from contact table');
            callback(null, {});
        }

        if (data.Items.Count <= 0) {
            console.log('[checkRecentOrders]: No contacts in the database');
        }
    
        console.log(`RETRIEVED ITEM SUCCESSFULLY WITH doc = ${data.Items}`);
        for (let i = 0; i < data.Items.length; i++) {
            trackTheirPizza(data.Items[i]);
        }
        callback(null, {});
    }).catch((err) => {
        console.log(`GET ITEM FAILED FOR doc = ${data.Item.doc}, WITH ERROR: ${err}`);
        callback(null, err);
    });
}

function trackTheirPizza(contact) {
    pizzapi.Track.byPhone(
        contact.phoneNumber,
        (pizzaInfo) => {
            if (pizzaInfo.orders && pizzaInfo.orders.length > 0
                    && pizzaInfo.orders[0].OrderStatus
                    && pizzaInfo.orders[0].OrderStatus.length > 0
                    && pizzaInfo.orders[0].OrderStatus[0].OrderID
                    && pizzaInfo.orders[0].OrderStatus[0].OrderID.length > 0
                    && pizzaInfo.orders[0].OrderStatus[0].OrderID[0]
                    && !pizzaInfo.orders[0].OrderStatus[0].DeliveryTime[0]) {
            	console.log('[checkRecentOrders]: found order ', JSON.stringify(pizzaInfo.orders[0]));
            	sendTweet(contact.doc, pizzaInfo);
            }
        }
    );
};

function sendTweet(contact, pizzaInfo) {
	tClient.post('statuses/update', 
		{status: 'I know what you ordered '.concat(contact.firstName).concat(' @').concat(contact.twitterHandle)}, 
		(error, tweet, response) => {
			if (!error) {
				console.log('checkRecentOrders: tweet successful');
				console.log(tweet);
			} else {
                console.log('we bombed: ${err}');
            }
		}
	);
};
