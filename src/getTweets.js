'use strict';

var twitter = require('twitter');
var tClient = new twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const screenName = "pizza-tracker";

module.exports = (event, context, callback) => {
    console.log('[twitter]: getting tweets, event = ', event);

    // 100 is probably more than will ever exist
    let params = {
        screen_name: screenName,
        count: 100
    }

    tClient.get('statuses/user_timeline', 
		params, 
		function(error, tweet, response) {
			if (!error) {
				console.log('checkRecentOrders: tweet successful');
				console.log(tweet);
			}
		}
	);
}