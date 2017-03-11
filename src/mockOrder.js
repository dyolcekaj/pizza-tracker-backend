'use strict';

module.exports = (event, context, callback) => {
    console.log('[mockOrder]: returning fake event');

    callback(null, {
        OrderStatuses: "Hopefully force a tweet"
    })
}