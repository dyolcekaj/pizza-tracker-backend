const entry = require('./index'); 

entry.checkRecentOrders({}, {}, () => {

});

entry.getContacts({}, {}, () => {

});

entry.createContact({
    body: {
        phoneNumber: 4029177320,
        firstName: 'Jake',
        lastName: 'Cloyd',
        twitterHandler: 'pinkcloyd1610'
    }
}, {}, () => {

});

entry.getTweets({}, {}, () => {
    
})