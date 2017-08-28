'use strict';

const uuid = require('uuid');
const _ = require('underscore')._;
const AWS = require('aws-sdk');  
const dynamo = new AWS.DynamoDB.DocumentClient();

const TableName = 'Listings';

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.imageResize = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Resized your image'
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.tacosAndScientology = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hail Hydra!'
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.createListing = (event, context, callback) => {
    const data = event.body;
	//onst userID = event.path.id;
	


	if(!_.has(data, 'name')) {
		console.error("No name in POST request to /createListing");
		callback(new Error("No name in POST request to /createListing"));
		return;
	}
	if(!_.has(data, 'location')) {
		console.error("No location in POST request to Listings");
		callback(new Error("No location in POST request to Listings"));
		return;
	}	
	
	//const listingID = event.body.listingID;

	const params = {
		TableName: TableName,
		Item: {
			merchantID: uuid.v4(),
			Name: data.name,
			Location: data.location,
		}
	}
  
	dynamo.put(params, (error) => {
		if(error) {
			console.error(error);
			callback(new Error("Error in creating Listing: " + error));
			return;
		}
		
		const response = {
			statusCode: 200,
			body: JSON.stringify(params.Item)
		};
		
		callback(null, response);
	});



  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

