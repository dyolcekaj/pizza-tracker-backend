'use strict';

module.exports = (event, context, callback) => {
    console.log('[mockOrder]: returning fake event');

    callback(null, {
        placeholder: 'eventually this will be a fake order'
    })
}