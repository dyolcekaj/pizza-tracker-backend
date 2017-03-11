'use strict';

exports.createResponse = (statusCode, body) => {
	return {
		statusCode: statusCode,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	};
};